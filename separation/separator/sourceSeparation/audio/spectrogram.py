
import numpy as np
import tensorflow as tf

from tensorflow.contrib.signal import stft, hann_window

def compute_spectrogram_tf( waveform, frame_length=2048, frame_step=512, spec_exponent=1., window_exponent=1.):

    stft_tensor = tf.transpose(
        stft(
            tf.transpose(waveform),
            frame_length,
            frame_step,
            window_fn=lambda f, dtype: hann_window(
                f,
                periodic=True,
                dtype=waveform.dtype) ** window_exponent),
        perm=[1, 2, 0])
    return np.abs(stft_tensor) ** spec_exponent


def time_stretch( spectrogram,  factor=1.0,   method=tf.image.ResizeMethod.BILINEAR):

    T = tf.shape(spectrogram)[0]
    T_ts = tf.cast(tf.cast(T, tf.float32) * factor, tf.int32)[0]
    F = tf.shape(spectrogram)[1]
    ts_spec = tf.image.resize_images(
        spectrogram,
        [T_ts, F],
        method=method,
        align_corners=True)
    return tf.image.resize_image_with_crop_or_pad(ts_spec, T, F)


def random_time_stretch(spectrogram, factor_min=0.9, factor_max=1.1, **kwargs):

    factor = tf.random_uniform(
        shape=(1,),
        seed=0) * (factor_max - factor_min) + factor_min
    return time_stretch(spectrogram, factor=factor, **kwargs)


def pitch_shift( spectrogram,  semitone_shift=0.0,    method=tf.image.ResizeMethod.BILINEAR):

    factor = 2 ** (semitone_shift / 12.)
    T = tf.shape(spectrogram)[0]
    F = tf.shape(spectrogram)[1]
    F_ps = tf.cast(tf.cast(F, tf.float32) * factor, tf.int32)[0]
    ps_spec = tf.image.resize_images(
        spectrogram,
        [T, F_ps],
        method=method,
        align_corners=True)
    paddings = [[0, 0], [0, tf.maximum(0, F - F_ps)], [0, 0]]
    return tf.pad(ps_spec[:, :F, :], paddings, 'CONSTANT')


def random_pitch_shift(spectrogram, shift_min=-1., shift_max=1., **kwargs):

    semitone_shift = tf.random_uniform(
        shape=(1,),
        seed=0) * (shift_max - shift_min) + shift_min
    return pitch_shift(spectrogram, semitone_shift=semitone_shift, **kwargs)
