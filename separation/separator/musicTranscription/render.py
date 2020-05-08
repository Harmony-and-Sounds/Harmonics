from music21 import *
import os
import music21 as m21
from midi2audio import FluidSynth
from scipy.io.wavfile import read
from ..init import write

us = m21.environment.UserSettings()
us_path = us.getSettingsPath()
if not os.path.exists(us_path):
    us.create()


us['musescoreDirectPNGPath'] = '/usr/bin/musescore'
us['musicxmlPath'] = '/usr/bin/musescore'
us['lilypondPath'] = '/usr/bin/lilypond'

def render(path, out_path):
    midi = converter.parse(path)
    conv = converter.subConverters.ConverterMusicXML()

    conv.write(midi, fmt='musicxml', fp=f'{out_path}.xml', subformats=['pdf'])


def render_audio(path,auxiliarDirectory ,out_path):

    fs = FluidSynth('/usr/share/fluidr3mono-gm-soundfont/FluidR3Mono_GM.sf3')
    fs.midi_to_audio(path, f'{auxiliarDirectory}/aux_audio.wav')

    sr, signal = read(f'{auxiliarDirectory}/aux_audio.wav')
    x = signal[:, 0]
    write(f'{out_path}_audio.mp3', sr, x, 'mp3')

