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

    def __str__(self):
        pitch_aux = self.get_pitch() if self.pitch != "z" else "z"
        strdur = "{}/{}".format(self.frac_duration.numerator, self.frac_duration.denominator)
        return f'{self.left_tie}{pitch_aux}{strdur}{self.right_tie}'