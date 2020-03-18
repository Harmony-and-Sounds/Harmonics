import React, { useState, useEffect } from 'react';
import midi from '../../recursos/zelda.mid'
import MidiPlayer from 'web-midi-player';
import './ReproductorMidi.css';

const MIDI_INIT = 'MIDI_INIT';
const MIDI_PLAY = 'MIDI_PLAY';
const MIDI_PAUSE = 'MIDI_PAUSE';
const MIDI_END = 'MIDI_END';
const MIDI_ERROR = 'MIDI_ERROR';

function ReproductorMidi(props) {

  const [midiPlayer, setMidiPlayer] = useState(null);

  useEffect(() => {
    if (!midiPlayer) {
      setMidiPlayer( new MidiPlayer() );
    }
    //midiPlayer.setLogger({ eventLogger });
  });

  useEffect(() => {
    if (midiPlayer) {
      const eventLogger = payload => {
        console.log(payload.time);
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

  function play (){
    midiPlayer.play({ url: midi});
  }

  function pause (){
    midiPlayer.pause();
  }

  return (
    <div className="ReproductorMidi">
        <div className="card repo">
            <div className="card-body">
                <h5 className="card-title">Reproductor MiDi</h5>
                <button className="btn btn-primary" onClick={play}>Play</button>
                <button className="btn btn-primary" onClick={pause}>Pause</button>
            </div>
        </div>
    </div>
  );
}

export default ReproductorMidi;