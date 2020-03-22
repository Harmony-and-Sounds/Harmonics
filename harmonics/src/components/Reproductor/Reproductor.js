//https://www.npmjs.com/package/react-h5-audio-player
import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Reproductor.css';
import {getAudioMidi, getAudioVozSeparada} from '../../servicios/servicios-proyecto'

import cancion from '../../recursos/AndeanTest.mp3'

function Reproductor(props) {

    const [usuario, setUsuario] = useState(props.usuario);
    const [nomProyecto, setNomProyecto] = useState(props.nomProyecto);
    const [instrumento, setInstrumento] = useState(props.instrumento);
    const [midiMp3, setMidiMP3] = useState(null);
    const [vozSeparada, setvozSeparada] = useState(null);


    async function getMidi () {
        const respuestaMidi = await getAudioMidi(usuario, nomProyecto, instrumento);
        if (respuestaMidi[0].name==="Colombia"){
            setMidiMP3(respuestaMidi);
        }
        else{
            alert("Error cargando audio midi.");
        }
    }


    async function getVozSeparada () {
        const respuestaVoz = await getAudioVozSeparada(usuario, nomProyecto, instrumento);
        if (respuestaVoz[0].name==="Colombia"){
            setvozSeparada(respuestaVoz);
        }
        else{
            alert("Error cargando audio con la voz separada.");
        }
    }

    useEffect(() => {
        //getMidi();
        //getVozSeparada();
      });

  return (
        <div className="Reproductor">
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>Reproductor Midi</h4>
                        <AudioPlayer
                            src={midiMp3}
                            onPlay={e => console.log("onPlay")}
                            className="rhap_container"
                            // other props here
                        />
                    </div>
                    <div className="col">
                        <h4>Reproductor de la voz separada</h4>
                        <AudioPlayer
                            src={vozSeparada}
                            onPlay={e => console.log("onPlay")}
                            className="rhap_container"
                            // other props here
                        />
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Reproductor;