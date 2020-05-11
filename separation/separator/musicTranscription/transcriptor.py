from music21 import *
import os
import music21 as m21
from midi2audio import FluidSynth
from harmonicsServer.settings import BASE_DIR
from ..init import write
from scipy.io.wavfile import read
from .note import Note
from fractions import Fraction
from .render import render_audio, render
us = m21.environment.UserSettings()
us_path = us.getSettingsPath()
if not os.path.exists(us_path):
    us.create()
print('Path to music21 environment', us_path)
print(us)

us['musescoreDirectPNGPath'] = '/usr/bin/musescore'
us['musicxmlPath'] = '/usr/bin/musescore'
us['lilypondPath'] = '/usr/bin/lilypond'

def get_duration(duration):
    offres = 0
    if duration < 1 / 64:
        return -1
    if duration >= 1:
        offres = int(duration / 4)
        duration = (duration % 4) / 4

    res = 0
    error = 1000
    if duration > 0:
        for i in [2, 4, 8, 16, 32, 64]:
            for j in range(1, i + 1):
                if abs(j / i - duration) < error:
                    error = abs(j / i - duration)
                    res = j / i
    return offres + res

def get_measure_duration(measure):
    duration = 0

    for note in measure:
        duration += note.duration

    return duration

def get_notes_chords_rests(path):
    midi = converter.parse(path)

    note_list = []

    for element_by_offset in stream.iterator.OffsetIterator(midi.parts[0]):
        for entry in element_by_offset:
            duration = get_duration(float(entry.duration.quarterLength))
            if duration != -1:
                if isinstance(entry, note.Note):
                    note_list.append(Note(str(entry.pitch), duration, Fraction(duration), "", ""))
                elif isinstance(entry, note.Rest):
                    note_list.append(Note('z', duration, Fraction(duration), "", ""))

    return note_list

def create_ABCTranscription(notes, output, tempo, key, instrument):

    ABCString = f'T: {instrument}\nM: ' + tempo + '\nL: 1\nK: ' + key + '\n|'
    tempo = eval(tempo)
    i = 0;
    measure = []
    endline = 1
    while i < len(notes):
        duration = get_measure_duration(measure)

        while duration < tempo and i < len(notes):
            if duration + notes[i].duration <= tempo:

                measure.append(notes[i])

            elif tempo - duration > 0 and duration + notes[i].duration > tempo:

                diff = tempo - duration
                noteDif = notes[i].duration - diff
                note_aux = Note(notes[i].pitch, diff, Fraction(diff), "", "")

                if notes[i].right_tie == ")":
                    note_aux.left_tie = "("
                    note_aux.right_tie = ")"
                    notes[i].right_tie = ")"
                else:
                    note_aux.left_tie = "("
                    notes[i].right_tie = ")"

                # note_aux.duration = diff
                notes[i].duration = noteDif
                notes[i].frac_duration = Fraction(noteDif)

                measure.append(note_aux)
                i -= 1
            i += 1
            duration = get_measure_duration(measure)

        aux = ""
        for note in measure:
            aux += note.__str__()

        ABCString += aux + "|"
        measure = []
        if endline % 5 == 0 :
            ABCString += '\n'
        endline += 1

    write_ABCTranscription(ABCString, output)

def create_transcriptions(midiV1Path, midiOutputPath, directory, instrumentName):

    notes = get_notes_chords_rests(midiV1Path)
    key = "C"
    sc = m21.stream.Score()

    sc.insert(0, metadata.Metadata())
    sc.metadata.title = instrumentName
    sc.metadata.composer = " "

    s = m21.stream.Stream()

    # s.quarterLength = 1
    s.append(m21.key.Key('C'))
    s.append(m21.meter.TimeSignature('4/4'))

    for note in notes:
        if (note.pitch == 'z'):
            s.append(m21.note.Rest(quarterLength=4 * note.duration))
        else:
            s.append(m21.note.Note(note.pitch, quarterLength=4 * note.duration))


    sc.insert(1, s)

    s.write('midi', fp=midiOutputPath)

    pa = os.path.splitext(midiOutputPath)[0]
    conv = converter.subConverters.ConverterMusicXML()
    conv.write(s, fmt='musicxml', fp=f'{pa}.xml', subformats=['pdf'])
    render_audio(midiOutputPath,directory,f'{pa}')
    create_ABCTranscription(notes, midiOutputPath, "4/4", "C", instrumentName)

def update_transcriptions(voice, midi_file, ABCString = None):
    midiPath = BASE_DIR + "/media/" + voice.voice_midi_directory
    destination = open(midiPath, 'wb')
    for chunk in midi_file.chunks():
        destination.write(chunk)
    destination.close()

    metadata = get_metadata_from_ABCString(ABCString)

    pa = os.path.splitext(midiPath)[0]
    render(midiPath,pa,metadata[0],metadata[1],metadata[2])
    render_audio(midiPath,BASE_DIR+"/output",pa)

    if ABCString != None :
        write_ABCTranscription(ABCString, midiPath)

def write_ABCTranscription(ABCString, midiPath):
    pa = os.path.splitext(midiPath)[0]
    with open(f'{pa}_ABC.abc', "w") as text_file:
        text_file.write(ABCString)

def get_metadata_from_ABCString(ABCString):
    rows = ABCString.split("\n")
    key = filter(lambda x : "K:" in x,rows)
    str_key = next(key).split(" ")[1]
    str_key = (str_key[:-1], "minor") if "m" in str_key else (str_key[:-1], "major")

    title = filter(lambda x: "T:" in x, rows)
    tempo = filter(lambda x: "M:" in x,rows)
    return (str_key, next(title).split(" ")[1],next(tempo).split(" ")[1])
