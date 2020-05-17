from music21 import *
import os
import music21 as m21
from midi2audio import FluidSynth
from harmonicsServer.settings import BASE_DIR
import re
from .note import Note,notem21_from_ABCstring
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
        return None

    if duration >= 1:
        offres = int(duration / 4)
        duration = (duration % 4) / 4

    res = 0
    error = 1000
    fraction = "4/4"
    if duration > 0:
        for i in [2, 4, 8, 16, 32, 64]:
            for j in range(1, i + 1):
                if abs(j / i - duration) < error:
                    error = abs(j / i - duration)
                    res = j / i
                    fraction = [j, i]
    return (offres + res, fraction)


def subdivide_duration(duration):
    if duration[1] == 1:
        return [Fraction(1, 1)]

    left = duration[0]
    fractions = []
    while left > 1:
        dur = divide([left, duration[1]])
        fractions.append(Fraction(dur[0], dur[1]))
        left -= dur[0]
    if left > 0:
        fractions.append(Fraction(left, duration[1]))
    return fractions


def divide(duration):
    cont = 0
    while duration[1] % (duration[0] - cont) != 0 and (duration[0] - cont) > 1:
        cont += 1

    return [duration[0] - cont, duration[1]]


def get_notes_chords_rests(path):
    midi = converter.parse(path)

    key = ''
    note_list = []

    for element_by_offset in stream.iterator.OffsetIterator(midi.parts[0]):
        for entry in element_by_offset:
            duration = get_duration(float(entry.duration.quarterLength))

            if duration != None:
                dur = duration[0]
                sub = Fraction(duration[1][0], duration[1][1])
                if isinstance(entry, note.Note):
                    note_list.append(Note(str(entry.pitch), dur, sub, "", ""))
                elif isinstance(entry, note.Rest):
                    note_list.append(Note('z', dur, sub, "", ""))

    return note_list


def create_measures(notes, tempo):
    measures = []
    current_measure = []
    tempo = eval(tempo)
    i = 0
    while i < len(notes):
        duration = get_measure_duration(current_measure)
        while duration < tempo and i < len(notes):
            if duration + notes[i].duration <= tempo:
                current_measure.append(notes[i])
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

                notes[i].duration = noteDif
                notes[i].frac_duration = Fraction(noteDif)
                current_measure.append(note_aux)
                i -= 1
            i += 1
            duration = get_measure_duration(current_measure)

        measures.append(current_measure)
        current_measure = []
    return measures


def fix__notes_durations_in_measures(measures):
    fixed_measures = []
    for measure in measures:
        fixed_measure = []
        for note in measure:

            durations = subdivide_duration([note.frac_duration.numerator, note.frac_duration.denominator])
            if len(durations) == 1:
                fixed_measure.append(note)
            else:
                for duration in durations:
                    fixed_measure.append(Note(note.pitch, duration, Fraction(duration), "", ""))
                if note.left_tie == "(":
                    fixed_measure[-len(durations)].left_tie = "("
                if note.right_tie == ")":
                    fixed_measure[-1].right_tie = ")"
        fixed_measures.append(fixed_measure)
    return fixed_measures


def create_ABCTranscription(measures, output, tempo, key, instrument):
    ABCString = f'T: {instrument}\nM: {tempo}\nL: 1\nK: {key}\n|'
    i = 1;

    for measure in measures:
        for note in measure:
            ABCString += note.__str__()
        ABCString += "|"
        if i % 5 == 0:
            ABCString += "\n|"
        i += 1

    write_ABCTranscription(ABCString, output)

def get_measure_duration(measure):
    duration = 0

    for note in measure:
        duration += note.duration

    return duration

def create_transcriptions(midiV1Path, midiOutputPath, directory, instrumentName):

    notes = get_notes_chords_rests(midiV1Path)
    measures = create_measures(notes, "4/4")
    measures = fix__notes_durations_in_measures(measures)
    sc = m21.stream.Score()

    sc.insert(0, metadata.Metadata())
    sc.metadata.title = instrumentName
    sc.metadata.composer = " "

    s = m21.stream.Stream()

    s.append(m21.key.Key('C'))
    s.append(m21.meter.TimeSignature('4/4'))

    for measure in measures:
        for note in measure:
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
    create_ABCTranscription(measures, midiOutputPath, "4/4", "C treble", instrumentName)

def update_transcriptions(voice, ABCString = None):
    midiPath = BASE_DIR + "/media/" + voice.voice_midi_directory

    metadata = get_metadata_from_ABCString(ABCString)
    notes = get_notes(ABCString)
    pa = os.path.splitext(midiPath)[0]
    render(midiPath,pa,metadata[0],metadata[1],metadata[2],notes)
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
    str_key = next(key).split(" ")
    print(str_key)
    clef = str_key[2]
    str_key = (str_key[1][:-1], "minor", clef) if "m" in str_key[1] else (str_key[1], "major",clef)
    print(str_key[0],str_key[1])
    title = filter(lambda x: "T:" in x, rows)
    tempo = filter(lambda x: "M:" in x,rows)
    return (str_key, next(title)[2:],next(tempo).split(" ")[1])

def get_notes(ABCString):
    p = re.compile(r"(\()?(\^|_|=)*[A-Gz](,+|'+)?([0-9]*/?[0-9]+)?(\))?")
    notes = [x.group(0) for x in p.finditer(ABCString)]
    m21_notes =  [notem21_from_ABCstring(note) for note in notes[1:] ]
    return m21_notes

