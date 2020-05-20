
import numpy as np

def to_stereo(waveform):

    if waveform.shape[1] == 1:
        return np.repeat(waveform, 2, axis=-1)
    if waveform.shape[1] > 2:
        return waveform[:, :2]
    return waveform

