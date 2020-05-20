import re
from fractions import Fraction
import music21 as m21
class Note:

    def __init__(self, pitch, float_duration, frac_duration, left_tie, right_tie):
        self.pitch = pitch
        self.duration = float_duration
        self.frac_duration = frac_duration
        self.left_tie = left_tie
        self.right_tie = right_tie

    def get_pitch(self):
        note = "^" if "#" in self.pitch else ""
        note += self.pitch[0]
        tone_number = int(self.pitch[-1]) - 4
        alt = "'" if tone_number > 0 else ","
        for i in range(abs(tone_number)):
            note += alt
        return note

    def note_to_m21_note(self):
        note = None
        if self.pitch != "z" :
            note = m21.note.Note()
            note.pitch = m21.pitch.Pitch(self.pitch)
            note.quarterLength = (4 * self.duration)
            if self.right_tie != "":
                note.tie = m21.tie.Tie('stop')
            elif self.left_tie != "":
                note.tie = m21.tie.Tie('start')
        else :
            note = m21.note.Rest()
            note.quarterLength = (4 * self.duration)
        return note
    def __str__(self):
        pitch_aux = self.get_pitch() if self.pitch != "z" else "z"
        strdur = "{}/{}".format(self.frac_duration.numerator, self.frac_duration.denominator)
        if self.pitch == "z":
            return f'{pitch_aux}{strdur}'
        return f'{self.left_tie}{pitch_aux}{strdur}{self.right_tie}'


def notem21_from_ABCstring(note_string):

    left_tie = "(" if "(" in note_string else None
    right_tie = ")" if ")" in note_string else None
    duration  = re.search(r"([0-9]*/?[0-9]+)",note_string).group(0)
    alteration = re.search(r"(\^|_|=)+",note_string)
    alteration = alteration.group(0) if alteration != None else ""
    pitch = re.search(r"[A-Gz]",note_string).group(0)
    tone = re.search(r"(,+|'+)",note_string)
    tone = tone.group(0) if tone != None else ""
    tone_number = 4
    for s in range(len(tone)) :
        if tone[s] == "'":
            tone_number += 1
        elif tone[s] == ",":
            tone_number -= 1

    note_name = f'{pitch}{get_alteration(alteration)}{tone_number}'
    note = m21.note.Note(note_name) if pitch != 'z' else m21.note.Rest()
    note.duration = m21.duration.Duration(quarterLength= 4 * eval(duration))
    if pitch != 'z' :

        if left_tie != None and right_tie != None:
            note.tie = m21.tie.Tie('continue')
        elif left_tie != None:
            note.tie = m21.tie.Tie('start')
        elif right_tie != None:
            note.tie = m21.tie.Tie('stop')

    return note

def get_alteration(alter):
    if alter == "^":
        return "#"
    elif alter == "^^":
        return "##"
    elif alter == "_":
        return "-"
    elif alter == "__":
        return "--"
    elif alter == "=":
        return ""
    return ""
