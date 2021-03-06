import librosa
import vamp
import os
import numpy as np
from midiutil.MidiFile import MIDIFile
from scipy.signal import medfilt
import jams


def save_jams(jamsfile, notes, track_duration, orig_filename):

    jam = jams.JAMS()

    jam.file_metadata.duration = track_duration
    jam.file_metadata.title = orig_filename

    midi_an = jams.Annotation(namespace='pitch_midi',
                              duration=track_duration)

    for n in notes:
        midi_an.append(time=n[0], duration=n[1], value=n[2], confidence=0)

    jam.annotations.append(midi_an)

    jam.save(jamsfile)

def save_midi(outfile, notes, tempo):
    track = 0
    time = 0
    midifile = MIDIFile(1)

    midifile.addTrackName(track, time, "MIDI TRACK")
    midifile.addTempo(track, time, tempo)

    channel = 0
    volume = 100

    for note in notes:
        onset = note[0] * (tempo / 60.)
        duration = note[1] * (tempo / 60.)
        # duration = 1
        pitch = int(note[2])
        midifile.addNote(track, channel, pitch, onset, duration, volume)

    binfile = open(outfile, 'wb')
    midifile.writeFile(binfile)
    binfile.close()


def midi_to_notes(midi, fs, hop, smooth, minduration):
    if (smooth > 0):
        filter_duration = smooth
        filter_size = int(filter_duration * fs / float(hop))
        if filter_size % 2 == 0:
            filter_size += 1
        midi_filt = medfilt(midi, filter_size)
    else:
        midi_filt = midi

    notes = []
    p_prev = 0
    duration = 0
    onset = 0
    for n, p in enumerate(midi_filt):
        if p == p_prev:
            duration += 1
        else:
            # treat 0 as silence
            if p_prev > 0:
                # add note
                duration_sec = duration * hop / float(fs)
                if duration_sec >= minduration:
                    onset_sec = onset * hop / float(fs)
                    notes.append((onset_sec, duration_sec, p_prev))


            onset = n
            duration = 1
            p_prev = p

    if p_prev > 0:
        duration_sec = duration * hop / float(fs)
        onset_sec = onset * hop / float(fs)
        notes.append((onset_sec, duration_sec, p_prev))

    return notes


def hz2midi(hz):
    hz_nonneg = hz.copy()
    idx = hz_nonneg <= 0
    hz_nonneg[idx] = 1
    midi = 69 + 12 * np.log2(hz_nonneg / 440.)
    midi[idx] = 0

    midi = np.round(midi)

    return midi

def audio_to_midi_melodia(infile, outfile, bpm, smooth=0.25, minduration=0.1, savejams=False):
    fs = 44100
    hop = 128

    data, sr = librosa.load(infile, sr=fs, mono=True)

    melody = vamp.collect(data, sr, "mtg-melodia:melodia",
                          parameters={"voicing": 0.2})

    pitch = melody['vector'][1]

    pitch = np.insert(pitch, 0, [0] * 8)

    midi_pitch = hz2midi(pitch)

    notes = midi_to_notes(midi_pitch, fs, hop, smooth, minduration)

    save_midi(outfile, notes, bpm)

    if savejams:

        jamsfile = outfile.replace(".mid", ".jams")
        track_duration = len(data) / float(fs)
        save_jams(jamsfile, notes, track_duration, os.path.basename(infile))

    print("Conversion complete.")