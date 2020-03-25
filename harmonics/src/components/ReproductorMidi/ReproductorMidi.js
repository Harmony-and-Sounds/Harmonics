import React, { useState, useEffect } from 'react';
import midi from '../../recursos/zelda.mid'
import MidiPlayer from 'web-midi-player';
import './ReproductorMidi.css';

const MIDI_INIT = 'MIDI_INIT';
const MIDI_PLAY = 'MIDI_PLAY';
const MIDI_PAUSE = 'MIDI_PAUSE';
const MIDI_END = 'MIDI_END';
const MIDI_ERROR = 'MIDI_ERROR';

const getPlayPauseButton = (songState, player) => {
  switch (songState) {
      default: {
          return (
              <button onClick={() => player.play({ url: midi})}>▶️</button>
          );
      }
      case MIDI_PLAY: {
          return <button onClick={() => player.pause()}>⏸️</button>;
      }
      case MIDI_PAUSE: {
          return <button onClick={() => player.resume()}>▶️</button>;
      }
  }
};

function ReproductorMidi(props) {

  const [midiPlayer, setMidiPlayer] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [currentSongState, setCurrentSongState] = useState(null);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (!midiPlayer) {
      setMidiPlayer( new MidiPlayer({volume}) );
    }
    //midiPlayer.setLogger({ eventLogger });
  });

  useEffect(() => {
    if (midiPlayer) {
      const eventLogger = payload => {
        setCurrentSongTime(payload.time || 0);
        setCurrentSongState(payload.event);
        //console.log(payload.time);
        if (payload.event === MIDI_ERROR) {
          console.error(payload.message);
          console.error(payload.error);
        } 
      
        if (payload.event === MIDI_END) {
          console.log('Nothing else to play.');
        }
      };
      midiPlayer.setLogger({ eventLogger });
    }
  });
  return (
    <div className="ReproductorMidi">
        <div className="card repo">
            <div className="card-body">
                <h5 className="card-title">Reproductor MiDi</h5>
                {getPlayPauseButton(currentSongState,midiPlayer)}
                <button onClick={() => midiPlayer.stop()}>⏹️</button>
                <div className="slidecontainer">
                  <input type="range" className="slider" value={volume} onChange={(e) => 
                  {
                    if (midiPlayer.gainNode !== undefined){
                      const vol = parseInt(e.target.value);
                      midiPlayer.setVolume({ volume: vol });
                      setVolume(vol);
                    }
                  }}
                  />
                </div>
                {Math.floor(currentSongTime)} Segundos
            </div>
        </div>
    </div>
  );
}

export default ReproductorMidi;