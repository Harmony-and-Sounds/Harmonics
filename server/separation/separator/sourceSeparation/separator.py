
import os

from multiprocessing import Pool

from os.path import basename, join, splitext

from . import HarmonicsError
from .audio.ffmpeg import AudioAdapter
from .audio.convertor import to_stereo
from .utils.configuration import load_configuration
from .utils.estimator import create_estimator, to_predictor


class Separator(object):

    def __init__(self, params_descriptor, MWF=False, multiprocess=True):

        self._params = load_configuration(params_descriptor)
        self._sample_rate = self._params['sample_rate']
        self._MWF = MWF
        self._predictor = None
        self._pool = Pool() if multiprocess else None
        self._tasks = []

    def _get_predictor(self):

        if self._predictor is None:
            estimator = create_estimator(self._params, self._MWF)
            self._predictor = to_predictor(estimator)
        return self._predictor

    def join(self, timeout=200):

        while len(self._tasks) > 0:
            task = self._tasks.pop()
            task.get()
            task.wait(timeout=timeout)

    def separate(self, waveform):

        if not waveform.shape[-1] == 2:
            waveform = to_stereo(waveform)
        predictor = self._get_predictor()
        prediction = predictor({
            'waveform': waveform,
            'audio_id': ''})
        prediction.pop('audio_id')
        return prediction

    def separate_to_file(
            self, audio_descriptor, destination, chunkNumber,
            audio_adapter=AudioAdapter(),
            offset=0, duration=600., codec='wav', bitrate='128k',
            filename_format='{instrument}{chunkNumber}.{codec}',
            synchronous=True):

        waveform, _ = audio_adapter.load(
            audio_descriptor,
            offset=offset,
            duration=duration,
            sample_rate=self._sample_rate)
        sources = self.separate(waveform)

        generated = []
        for instrument, data in sources.items():
            path = join(destination, filename_format.format(
                instrument=instrument,
                chunkNumber = chunkNumber,
                codec=codec))
            directory = os.path.dirname(path)
            if not os.path.exists(directory):
                os.makedirs(directory)
            if path in generated:
                raise HarmonicsError((
                    f'Separated source path conflict : {path},'
                    'please check your filename format'))
            generated.append(path)
            if self._pool:
                task = self._pool.apply_async(audio_adapter.save, (
                    path,
                    data,
                    self._sample_rate,
                    codec,
                    bitrate))
                self._tasks.append(task)
            else:
                audio_adapter.save(path, data, self._sample_rate, codec, bitrate)
        if synchronous and self._pool:
            self.join()