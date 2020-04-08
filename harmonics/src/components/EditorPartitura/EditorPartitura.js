//https://configurator.abcjs.net/visual
import React, { useState, useEffect } from 'react';
//import { Notation } from 'react-abc';
//import { Midi } from 'react-abc';
import  Abcjs  from 'react-abcjs';

import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';

function EditorPartitura(props) {

  const [partitura, setPartitura] = useState('CDEF GABc|');
  const [mostrar, setMostrar] = useState(false);


  useEffect(() => {
    prueba();
  }, [partitura]);

  function clickNota(abcElem,tuneNumber,classes) {
    var nota = partitura.slice(abcElem.startChar, abcElem.endChar);
    console.log(nota);
  }

  function prueba() {
    abcjs.renderMidi(
      "midi-id",
      partitura,
      {
        generateDownload: true,
        downloadLabel: "Descargue aqui %T",
        inlineControls: {
            loopToggle: true,
            tempo: true,
        },
      }
      );
  }

  const engraverParams = {
    editable: false,
    listener:  { highlight: clickNota},
    scale: 1,
    //responsive: 'resize'
  };

  return (

        <div className="Editor">
          <div className="fluid-container correcion">
            <div>
              <Abcjs
                abcNotation={ partitura }
                parserParams={{}}
                engraverParams={engraverParams}
                renderParams={{ viewportHorizontal: true }}
              />
              <textarea
                cols="50"
                rows="20"
                value={partitura}
                onChange={e => {setPartitura(e.target.value);
                setMostrar(false);}}
              />
              <div id="midi-id"/>
            </div>
          </div>
        </div>
  );
}

export default EditorPartitura;

//<Midi notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />
//<button onClick={() => setMostrar(true)}>mostrar</button>
//{mostrar === true && <Midi id="midi" notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />}
