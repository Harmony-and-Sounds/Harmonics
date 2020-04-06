# CREATED: 11/11/15 11:22 AM by Justin Salamon <justin.salamon@nyu.edu>
__version__ = '0.0.0'
import numpy as np
import pydub

def write(f, sr, x, normalized=False):
    """numpy array to MP3"""
    audio_segment = pydub.AudioSegment(
        x.tobytes(),
        frame_rate=sr,
        sample_width=x.dtype.itemsize,
        channels=1
    )

    audio_segment.export(f, format="mp3")