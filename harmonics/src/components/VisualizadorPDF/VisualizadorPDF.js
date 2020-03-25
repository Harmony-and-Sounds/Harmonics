//https://www.npmjs.com/package/mgr-pdf-viewer-react

import React, { useState, useEffect } from 'react';
import pdf from  '../../recursos/Capitulo 3 Voleibol.pdf';
import PDFViewer from 'mgr-pdf-viewer-react';
//import './Reproductor.css';

function VisualizadorPDF(props) {

    const [usuario, setUsuario] = useState(props.usuario);
    const [nomProyecto, setNomProyecto] = useState(props.nomProyecto);
    const [instrumento, setInstrumento] = useState(props.instrumento);

      /*const [midiMp3, setMidiMP3] = useState(null);
    const [vozSeparada, setvozSeparada] = useState(null);*/


    async function getMidi () {
        /*const respuestaMidi = await getAudioMidi(usuario, nomProyecto, instrumento);
        if (respuestaMidi[0].name==="Colombia"){
            setMidiMP3(respuestaMidi);
        }
        else{
            alert("Error cargando audio midi.");
        }*/
    }

    useEffect(() => {
        //getMidi();
        //getVozSeparada();
      });

  return (
        <div className="VisualizadorPDF">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PDFViewer document={{
                            url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
                        }} 
                        scale = {1.5}/>
                    </div>
                </div>

            </div>
        </div>
  );
}

export default VisualizadorPDF;