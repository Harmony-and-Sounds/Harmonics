
import importlib

import tensorflow as tf

from tensorflow.contrib.signal import stft, inverse_stft, hann_window


from ..utils.tensor import pad_and_partition, pad_and_reshape

def get_model_function(model_type):

    relative_path_to_module = '.'.join(model_type.split('.')[:-1])
    model_name = model_type.split('.')[-1]
    main_module = '.'.join((__name__, 'functions'))
    path_to_module = f'{main_module}.{relative_path_to_module}'
    module = importlib.import_module(path_to_module)
    model_function = getattr(module, model_name)
    return model_function


class EstimatorSpecBuilder(object):

    DEFAULT_MODEL = 'unet.unet'

    L1_MASK = 'L1_mask'
    WEIGHTED_L1_MASK = 'weighted_L1_mask'

    ADADELTA = 'Adadelta'
    SGD = 'SGD'

    WINDOW_COMPENSATION_FACTOR = 2./3.
    EPSILON = 1e-10

    def __init__(self, features, params):

        self._features = features
        self._params = params
        # Get instrument name.
        self._mix_name = params['mix_name']
        self._instruments = params['instrument_list']
        # Get STFT/signals parameters
        self._n_channels = params['n_channels']
        self._T = params['T']
        self._F = params['F']
        self._frame_length = params['frame_length']
        self._frame_step = params['frame_step']

    def _build_output_dict(self):

        input_tensor = self._features[f'{self._mix_name}_spectrogram']
        model = self._params.get('model', None)
        if model is not None:
            model_type = model.get('type', self.DEFAULT_MODEL)
        else:
            model_type = self.DEFAULT_MODEL
        try:
            apply_model = get_model_function(model_type)
        except ModuleNotFoundError:
            raise ValueError(f'No model function {model_type} found')
        return apply_model(
            input_tensor,
            self._instruments,
            self._params['model']['params'])

    def _build_loss(self, output_dict, labels):

        loss_type = self._params.get('loss_type', self.L1_MASK)
        if loss_type == self.L1_MASK:
            losses = {
                name: tf.reduce_mean(tf.abs(output - labels[name]))
                for name, output in output_dict.items()
            }
        elif loss_type == self.WEIGHTED_L1_MASK:
            losses = {
                name: tf.reduce_mean(
                    tf.reduce_mean(
                        labels[name],
                        axis=[1, 2, 3],
                        keep_dims=True) *
                    tf.abs(output - labels[name]))
                for name, output in output_dict.items()
            }
        else:
            raise ValueError(f"Unkwnown loss type: {loss_type}")
        loss = tf.reduce_sum(list(losses.values()))
        metrics = {k: tf.compat.v1.metrics.mean(v) for k, v in losses.items()}
        metrics['absolute_difference'] = tf.compat.v1.metrics.mean(loss)
        return loss, metrics

    def _build_optimizer(self):

        name = self._params.get('optimizer')
        if name == self.ADADELTA:
            return tf.compat.v1.train.AdadeltaOptimizer()
        rate = self._params['learning_rate']
        if name == self.SGD:
            return tf.compat.v1.train.GradientDescentOptimizer(rate)
        return tf.compat.v1.train.AdamOptimizer(rate)

    def _build_stft_feature(self):

        stft_feature = tf.transpose(
            stft(
                tf.transpose(self._features['waveform']),
                self._frame_length,
                self._frame_step,
                window_fn=lambda frame_length, dtype: (
                    hann_window(frame_length, periodic=True, dtype=dtype)),
                pad_end=True),
            perm=[1, 2, 0])
        self._features[f'{self._mix_name}_stft'] = stft_feature
        self._features[f'{self._mix_name}_spectrogram'] = tf.abs(
            pad_and_partition(stft_feature, self._T))[:, :, :self._F, :]

    def _inverse_stft(self, stft):

        inversed = inverse_stft(
            tf.transpose(stft, perm=[2, 0, 1]),
            self._frame_length,
            self._frame_step,
            window_fn=lambda frame_length, dtype: (
                hann_window(frame_length, periodic=True, dtype=dtype))
        ) * self.WINDOW_COMPENSATION_FACTOR
        reshaped = tf.transpose(inversed)
        return reshaped[:tf.shape(self._features['waveform'])[0], :]

    def _build_mwf_output_waveform(self, output_dict):

        import norbert
        x = self._features[f'{self._mix_name}_stft']
        v = tf.stack(
            [
                pad_and_reshape(
                    output_dict[f'{instrument}_spectrogram'],
                    self._frame_length,
                    self._F)[:tf.shape(x)[0], ...]
                for instrument in self._instruments
            ],
            axis=3)
        input_args = [v, x]
        stft_function = tf.py_function(
            lambda v, x: norbert.wiener(v.numpy(), x.numpy()),
            input_args,
            tf.complex64),
        return {
            instrument: self._inverse_stft(stft_function[0][:, :, :, k])
            for k, instrument in enumerate(self._instruments)
        }

    def _extend_mask(self, mask):

        extension = self._params['mask_extension']
        if extension == "average":
            extension_row = tf.reduce_mean(mask, axis=2, keepdims=True)
        elif extension == "zeros":
            mask_shape = tf.shape(mask)
            extension_row = tf.zeros((
                mask_shape[0],
                mask_shape[1],
                1,
                mask_shape[-1]))
        else:
            raise ValueError(f'Invalid mask_extension parameter {extension}')
        n_extra_row = (self._frame_length) // 2 + 1 - self._F
        extension = tf.tile(extension_row, [1, 1, n_extra_row, 1])
        return tf.concat([mask, extension], axis=2)

    def _build_manual_output_waveform(self, output_dict):
        separation_exponent = self._params['separation_exponent']
        output_sum = tf.reduce_sum(
            [e ** separation_exponent for e in output_dict.values()],
            axis=0
        ) + self.EPSILON
        output_waveform = {}
        for instrument in self._instruments:
            output = output_dict[f'{instrument}_spectrogram']
            # Compute mask with the model.
            instrument_mask = (
                output ** separation_exponent
                + (self.EPSILON / len(output_dict))) / output_sum
            # Extend mask;
            instrument_mask = self._extend_mask(instrument_mask)
            # Stack back mask.
            old_shape = tf.shape(instrument_mask)
            new_shape = tf.concat(
                [[old_shape[0] * old_shape[1]], old_shape[2:]],
                axis=0)
            instrument_mask = tf.reshape(instrument_mask, new_shape)
            # Remove padded part (for mask having the same size as STFT);
            stft_feature = self._features[f'{self._mix_name}_stft']
            instrument_mask = instrument_mask[
                :tf.shape(stft_feature)[0], ...]
            # Compute masked STFT and normalize it.
            output_waveform[instrument] = self._inverse_stft(
                tf.cast(instrument_mask, dtype=tf.complex64) * stft_feature)
        return output_waveform

    def _build_output_waveform(self, output_dict):
        if self._params.get('MWF', False):
            output_waveform = self._build_mwf_output_waveform(output_dict)
        else:
            output_waveform = self._build_manual_output_waveform(output_dict)
        if 'audio_id' in self._features:
            output_waveform['audio_id'] = self._features['audio_id']
        return output_waveform

    def build_predict_model(self):

        self._build_stft_feature()
        output_dict = self._build_output_dict()
        output_waveform = self._build_output_waveform(output_dict)
        return tf.estimator.EstimatorSpec(
            tf.estimator.ModeKeys.PREDICT,
            predictions=output_waveform)


def model_fn(features, labels, mode, params, config):

    builder = EstimatorSpecBuilder(features, params)
    if mode == tf.estimator.ModeKeys.PREDICT:
        return builder.build_predict_model()
