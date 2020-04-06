#!/usr/bin/env python
# coding: utf8

""" AudioAdapter class defintion. """

import subprocess

from abc import ABC, abstractmethod
from importlib import import_module
from os.path import exists

import numpy as np
import tensorflow as tf

from tensorflow.contrib.signal import stft, hann_window


from .. import HarmonicsError
from ..utils.logging import get_logger


class AudioAdapter(ABC):

    DEFAULT = None

    @abstractmethod
    def load(
            self, audio_descriptor, offset, duration,sample_rate, dtype=np.float32):
        pass

    def load_tf_waveform(self, audio_descriptor, offset=0.0, duration=1800., sample_rate=44100,

            dtype=b'float32', waveform_name='waveform'):

        offset = tf.cast(offset, tf.float64)
        duration = tf.cast(duration, tf.float64)


        def safe_load(path, offset, duration, sample_rate, dtype):
            logger = get_logger()
            logger.info(
                f'Loading audio {path} from {offset} to {offset + duration}')
            try:
                (data, _) = self.load(
                    path.numpy(),
                    offset.numpy(),
                    duration.numpy(),
                    sample_rate.numpy(),
                    dtype=dtype.numpy())
                logger.info('Audio data loaded successfully')
                return (data, False)
            except Exception as e:
                logger.exception(
                    'An error occurs while loading audio',
                    exc_info=e)
            return (np.float32(-1.0), True)


        results = tf.py_function(
            safe_load,
            [audio_descriptor, offset, duration, sample_rate, dtype],
            (tf.float32, tf.bool)),
        waveform, error = results[0]
        return {
            waveform_name: waveform,
            f'{waveform_name}_error': error
        }

    @abstractmethod
    def save(self, path, data, sample_rate, codec=None, bitrate=None):
        pass


def get_default_audio_adapter():

    if AudioAdapter.DEFAULT is None:
        from .ffmpeg import FFMPEGProcessAudioAdapter
        AudioAdapter.DEFAULT = FFMPEGProcessAudioAdapter()
    return AudioAdapter.DEFAULT


def get_audio_adapter(descriptor):

    if descriptor is None:
        return get_default_audio_adapter()
    module_path = descriptor.split('.')
    adapter_class_name = module_path[-1]
    module_path = '.'.join(module_path[:-1])
    adapter_module = import_module(module_path)
    adapter_class = getattr(adapter_module, adapter_class_name)
    if not isinstance(adapter_class, AudioAdapter):
        raise HarmonicsError(
            f'{adapter_class_name} is not a valid AudioAdapter class')
    return adapter_class()
