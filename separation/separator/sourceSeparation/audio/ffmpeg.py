
import os


import ffmpeg
import numpy as np

from .adapter import AudioAdapter
from .. import HarmonicsError
from ..utils.logging import get_logger



def _to_ffmpeg_time(n):

    m, s = divmod(n, 60)
    h, m = divmod(m, 60)
    return '%d:%02d:%09.6f' % (h, m, s)


def _to_ffmpeg_codec(codec):
    ffmpeg_codecs = {
        'm4a': 'aac',
        'ogg': 'libvorbis',
        'wma': 'wmav2',
    }
    return ffmpeg_codecs.get(codec) or codec


class FFMPEGProcessAudioAdapter(AudioAdapter):

    def load(self, path, offset=None, duration=None, sample_rate=None, dtype=np.float32):

        if not isinstance(path, str):
            path = path.decode()
        try:
            probe = ffmpeg.probe(path)
        except ffmpeg._run.Error as e:
            raise HarmonicsError(
                'An error occurs with ffprobe (see ffprobe output below)\n\n{}'
                .format(e.stderr.decode()))
        if 'streams' not in probe or len(probe['streams']) == 0:
            raise HarmonicsError('No stream was found with ffprobe')
        metadata = next(
            stream
            for stream in probe['streams']
            if stream['codec_type'] == 'audio')
        n_channels = metadata['channels']
        if sample_rate is None:
            sample_rate = metadata['sample_rate']
        output_kwargs = {'format': 'f32le', 'ar': sample_rate}
        if duration is not None:
            output_kwargs['t'] = _to_ffmpeg_time(duration)
        if offset is not None:
            output_kwargs['ss'] = _to_ffmpeg_time(offset)
        process = (
            ffmpeg
            .input(path)
            .output('pipe:', **output_kwargs)
            .run_async(pipe_stdout=True, pipe_stderr=True))
        buffer, _ = process.communicate()
        waveform = np.frombuffer(buffer, dtype='<f4').reshape(-1, n_channels)
        if not waveform.dtype == np.dtype(dtype):
            waveform = waveform.astype(dtype)
        return (waveform, sample_rate)

    def save(self, path, data, sample_rate, codec=None, bitrate=None):

        directory = os.path.dirname(path)
        if not os.path.exists(directory):
            raise HarmonicsError(f'output directory does not exists: {directory}')
        get_logger().debug('Writing file %s', path)
        input_kwargs = {'ar': sample_rate, 'ac': data.shape[1]}
        output_kwargs = {'ar': sample_rate, 'strict': '-2'}
        if bitrate:
            output_kwargs['audio_bitrate'] = bitrate
        if codec is not None and codec != 'wav':
            output_kwargs['codec'] = _to_ffmpeg_codec(codec)
        process = (
            ffmpeg
            .input('pipe:', format='f32le', **input_kwargs)
            .output(path, **output_kwargs)
            .overwrite_output()
            .run_async(pipe_stdin=True, pipe_stderr=True, quiet=True))
        try:
            process.stdin.write(data.astype('<f4').tobytes())
            process.stdin.close()
            process.wait()
        except IOError:
            raise HarmonicsError(f'FFMPEG error: {process.stderr.read()}')
        get_logger().info('File %s written succesfully', path)
