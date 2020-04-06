
import numpy as np
import tensorflow as tf


from ..utils.tensor import from_float32_to_uint8, from_uint8_to_float32


def to_n_channels(waveform, n_channels):

    return tf.cond(
        tf.shape(waveform)[1] >= n_channels,
        true_fn=lambda: waveform[:, :n_channels],
        false_fn=lambda: tf.tile(waveform, [1, n_channels])[:, :n_channels]
    )


def to_stereo(waveform):

    if waveform.shape[1] == 1:
        return np.repeat(waveform, 2, axis=-1)
    if waveform.shape[1] > 2:
        return waveform[:, :2]
    return waveform


def gain_to_db(tensor, espilon=10e-10):

    return 20. / np.log(10) * tf.math.log(tf.maximum(tensor, espilon))


def db_to_gain(tensor):

    return tf.pow(10., (tensor / 20.))


def spectrogram_to_db_uint(spectrogram, db_range=100., **kwargs):

    db_spectrogram = gain_to_db(spectrogram)
    max_db_spectrogram = tf.reduce_max(db_spectrogram)
    db_spectrogram = tf.maximum(db_spectrogram, max_db_spectrogram - db_range)
    return from_float32_to_uint8(db_spectrogram, **kwargs)


def db_uint_spectrogram_to_gain(db_uint_spectrogram, min_db, max_db):

    db_spectrogram = from_uint8_to_float32(db_uint_spectrogram, min_db, max_db)
    return db_to_gain(db_spectrogram)
