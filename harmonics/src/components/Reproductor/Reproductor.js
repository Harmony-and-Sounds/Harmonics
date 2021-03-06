//https://www.npmjs.com/package/react-h5-audio-player
import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Reproductor.css';
import {getAudioMidi, getAudioMidiNoLogin, getAudioVozSeparada, getAudioVozSeparadaNoLogin} from '../../servicios/servicios-proyecto'

function Reproductor(props) {

    const [idVoz] = useState(props.idVoz);
    const [midiMp3, setMidiMP3] = useState(null);
    const [vozSeparada, setvozSeparada] = useState(null);


    function getMidi () {
        const access = sessionStorage.getItem('access');
        if(access !== null){
            getAudioMidi(access, idVoz).then(respuesta => {
                if (respuesta.bandera === true){
                    setMidiMP3(respuesta.data);
                }
                else{
                    alert(respuesta.data);
                }
            });
        }
        else{
            getAudioMidiNoLogin(idVoz).then(respuesta => {
                if (respuesta.bandera === true){
                    setMidiMP3(respuesta.data);
                }
                else{
                    alert(respuesta.data);
                }
            });
        }
    }

    async function getVozSeparada () {
        const access = sessionStorage.getItem('access');
        if(access !== null){
            getAudioVozSeparada(access, idVoz).then(respuesta => {
                if (respuesta.bandera === true){
                    setvozSeparada(respuesta.data);
                }
                else{
                    alert(respuesta.data);
                }
            });
        }
        else{
            getAudioVozSeparadaNoLogin(idVoz).then(respuesta => {
                if (respuesta.bandera === true){
                    setvozSeparada(respuesta.data);
                }
                else{
                    alert(respuesta.data);
                }
            });
        }
    }

    useEffect(() => {
        getMidi();
        getVozSeparada();
        // eslint-disable-next-line
    },[]);


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
