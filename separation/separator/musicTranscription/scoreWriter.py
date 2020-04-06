from music21 import *
import os
import music21 as m21
from midi2audio import FluidSynth
from harmonicsServer.settings import BASE_DIR
from ..init import write
from scipy.io.wavfile import read

us = m21.environment.UserSettings()
us_path = us.getSettingsPath()
if not os.path.exists(us_path):
    us.create()
print('Path to music21 environment', us_path)
print(us)

us['musescoreDirectPNGPath'] = '/usr/bin/musescore'
us['musicxmlPath'] = '/usr/bin/musescore'
us['lilypondPath'] = '/usr/bin/lilypond'


def get_notes_chords_rests(path):
    midi = converter.parse(path)
    note_list = []

    for element_by_offset in stream.iterator.OffsetIterator(midi.parts[0]):
        for entry in element_by_offset:

            if isinstance(entry, note.Note):
                note_list.append([str(entry.pitch), float(entry.duration.quarterLength)])
            elif isinstance(entry, note.Rest):
                note_list.append(['Rest', float(entry.duration.quarterLength)])


    return note_list

def resolveSongKey(notes):
    key = ''
    index = len(notes)-1
    while(notes[index][0] == 'Rest'):
        index -=1;

    if index >= 0:
        return notes[index][0]
    else:
        return 'C'


def createScoreFromMidi(midiV1Path,midiOutputPath,directory):

    notes = get_notes_chords_rests(midiV1Path)
    key = resolveSongKey(notes)
    sc = m21.stream.Score()
    sc.insert(0, instrument.Trombone())

    s = m21.stream.Stream()


    s.append(m21.key.Key(key))
    s.append(m21.meter.TimeSignature('4/4'))

    for note in notes:

        if (note[0] == 'Rest'):
            s.append(m21.note.Rest(quarterLength=note[1]))
        else:
            s.append(m21.note.Note(note[0], quarterLength=note[1]))

    sc.insert(1, s)

    sc.write('midi', fp=midiOutputPath)
    pa = os.path.splitext(midiOutputPath)[0]
    conv = converter.subConverters.ConverterMusicXML()
    conv.write(sc, fmt='musicxml', fp=f'{pa}.xml', subformats=['pdf'])

    fs = FluidSynth('/usr/share/fluidr3mono-gm-soundfont/FluidR3Mono_GM.sf3')
    fs.midi_to_audio(midiOutputPath, f'{directory}/aux_audio.wav')

    sr, signal = read(f'{directory}/aux_audio.wav')
    x = signal[:,0]
    write(f'{pa}_audio.mp3',sr,x)