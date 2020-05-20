import librosa
from scipy.io.wavfile import read
from aubio import *
from .sourceSeparation.separator import Separator
from .musicTranscription.melodia_extractor import audio_to_midi_melodia
import numpy as np
from harmonicsServer.settings import BASE_DIR
from .musicTranscription import transcriptor
import threading
import shutil
from .init import write

def createSeparation(filename,project):
    processId= threading.get_ident()
    os.mkdir(f'{BASE_DIR}/output/{processId}')
    path = f'{BASE_DIR}/output/{processId}'
    print(filename)
    voices = project.voices.all()
    separator = Separator('5stems-16kHz')

    duration = librosa.get_duration(filename=filename)
    stepSize,offset,i = 30,0,0

    while (offset+stepSize < duration):
        separator.separate_to_file(filename, path, offset= offset, duration=30, chunkNumber=i, codec="wav")
        offset,i = offset+stepSize,i+1

    separator.separate_to_file(filename, path, offset=offset, duration=duration-offset, chunkNumber=i, codec="wav")

    userPath = BASE_DIR+"/media/"+project.user.user.username+"/"+project.name

    for voice in voices :
        instrument = voice.instrument
        initialized = False
        data = None
        srr = None
        for j in range(i+1):
            sr, signal = read(f'{path}/{instrument}{j}.wav')
            x = signal[:,0]
            if not initialized:
                srr = sr
                data = x
                initialized = True
            else:
                data =np.append(data,x)
        write(f'{userPath}/{instrument}/{instrument}.mp3',srr, data,"mp3")
        voice.isolated_voice_directory = f'/{project.user.user.username}/{project.name}/{instrument}/{instrument}.mp3'

    for voice in voices:
        instrument = voice.instrument
        audio_to_midi_melodia(infile=f'{userPath}/{instrument}/{instrument}.mp3',outfile=f'{path}/{instrument}_midi.mid',bpm=60)
        transcriptor.create_transcriptions(f'{path}/{instrument}_midi.mid', f'{userPath}/{instrument}/{instrument}_midi.mid', path, instrument)

        voice.voice_midi_audio_directory = f'/{project.user.user.username}/{project.name}/{instrument}/{instrument}_midi_audio.mp3'
        voice.voice_sheet_directory = f'/{project.user.user.username}/{project.name}/{instrument}/{instrument}_midi.pdf'
        voice.voice_midi_directory = f'/{project.user.user.username}/{project.name}/{instrument}/{instrument}_midi.mid'
        voice.voice_abc_directory = f'/{project.user.user.username}/{project.name}/{instrument}/{instrument}_midi_ABC.abc'

    for voice in voices:
        voice.save()

    project.active = True
    project.save()

    project.user.pending_notifications = True
    project.user.save()

    shutil.rmtree(path)
