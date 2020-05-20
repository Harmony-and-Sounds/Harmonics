from music21 import *
import os
import music21 as m21
from midi2audio import FluidSynth
from scipy.io.wavfile import read
from ..init import write
from harmonicsServer.settings import FLUIDSYNTH_FONTS
us = m21.environment.UserSettings()
us_path = us.getSettingsPath()
if not os.path.exists(us_path):
    us.create()


us['musescoreDirectPNGPath'] = '/usr/bin/musescore'
us['musicxmlPath'] = '/usr/bin/musescore'
us['lilypondPath'] = '/usr/bin/lilypond'

def render(path, out_path,key,title,tempo, notes):
    midi = converter.parse(path)
    sc = m21.stream.Score()
    sc.insert(0, metadata.Metadata())
    sc.metadata.title = title
    sc.metadata.composer = " "
    s = m21.stream.Stream()
    s.append(get_clef(key[2]))
    s.append(m21.key.Key(key[0],key[1]))
    s.append(m21.meter.TimeSignature(tempo))
    for note in notes:
        s.append(note)

    sc.insert(1,s)

    s.write('midi', fp=path)
    conv = converter.subConverters.ConverterMusicXML()

    conv.write(s, fmt='musicxml', fp=f'{out_path}.xml', subformats=['pdf'])

def get_clef(type):
    if type == "treble":
        return m21.clef.TrebleClef()
    elif type == "bass":
        return m21.clef.BassClef()
    elif type == "bass3":
        return m21.clef.FBaritoneClef()
    elif type == "alto":
        return m21.clef.CClef()
    elif type == "alto2":
        return m21.clef.MezzoSopranoClef()
    elif type == "alto1" :
        return m21.clef.SopranoClef()
    return m21.clef.TrebleClef()

def render_audio(path,auxiliarDirectory ,out_path):

    fs = FluidSynth(FLUIDSYNTH_FONTS)
    fs.midi_to_audio(path, f'{auxiliarDirectory}/aux_audio.wav')

    sr, signal = read(f'{auxiliarDirectory}/aux_audio.wav')
    x = signal[:, 0]
    write(f'{out_path}_audio.mp3', sr, x, 'mp3')
    os.remove(f'{auxiliarDirectory}/aux_audio.wav')

