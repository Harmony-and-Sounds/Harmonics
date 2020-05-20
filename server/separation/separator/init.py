import pydub
import librosa
import numpy as np
fs = 44100

def write(path, sr, x, codec, normalized=False):
    """numpy array to MP3"""
    audio_segment = pydub.AudioSegment(
        x.tobytes(),
        frame_rate=sr,
        sample_width=x.dtype.itemsize,
        channels=1
    )

    audio_segment.export(path, format=codec)

def read(path):
    data, sr = librosa.load(path, mono=False)
    return data.astype(np.np.float32),sr