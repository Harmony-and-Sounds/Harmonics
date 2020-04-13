//https://configurator.abcjs.net/visual
import React, { useState, useEffect } from 'react';
//import { Notation } from 'react-abc';
//import { Midi } from 'react-abc';
import  Abcjs  from 'react-abcjs';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';
import './EditorPartitura.css';

function EditorPartitura(props) {

  const [partitura, setPartitura] = useState('T: TITULO\nM: 4/4\nL: 1/4\nc,/4');
  const [editar, setEditar] = useState('');
  const [nota, setNota] = useState('');
  const [notaInicio, setNotaInicio] = useState(null);
  const [notaFinal, setNotaFinal] = useState(null);
  const [mostrar, setMostrar] = useState(false);

  //Encabezado partitura
  const [titulo, setTitulo] = useState('');
  const [compas, setCompas] = useState('');
  const [longitudNotas, setLongitudNotas] = useState('');


  useEffect(() => {
    renderizarReproductor();
    extraerEncabezado();
  }, [partitura]);

  function clickNota(abcElem,tuneNumber,classes) {
    console.log(abcElem);
    if (abcElem.el_type === "note"){
      setNotaInicio(abcElem.startChar);
      setNotaFinal(abcElem.endChar);
      setEditar( compas + longitudNotas + partitura.slice(abcElem.startChar, abcElem.endChar) );
      setNota(partitura.slice(abcElem.startChar, abcElem.endChar));
      setMostrar(true);
    }
    //partitura.slice(abcElem.startChar, abcElem.endChar
    //console.log(nota);
  }

  function extraerEncabezado(){
    let ultimoSalto = 0;
    if(partitura.indexOf('T: ') !== -1){
      let inicio = partitura.indexOf('T: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      let titulo = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setTitulo(titulo);
      //console.log(titulo);
    }
    if(partitura.indexOf('M: ') !== -1){
      let inicio = partitura.indexOf('M: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      let compas = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setCompas(compas);
      //console.log(compas);
    }
    if(partitura.indexOf('L: ') !== -1){
      let inicio = partitura.indexOf('L: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      let longitudNotas = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setLongitudNotas(longitudNotas);
      //console.log(longitudNotas);
    }
  }

  function renderizarReproductor() {
    abcjs.renderMidi(
      "midi-id",
      partitura,
      {
        generateDownload: true,
        downloadClass: "desaparecer",
        //generateInline: false,
        inlineControls: {
            loopToggle: true,
            tempo: true,
        },
      }
      );
  }

  const engraverParams = {
    editable: true,
    listener:  { highlight: clickNota},
    scale: 1,
    //responsive: 'resize'
  };

  const engraverParamsEditar = {
    scale: 2,
    paddingtop: 0,
    paddingbottom: 0,
    paddingright: 0,
    paddingleft: 0,
    //responsive: "resize",
  };

  function editadoEditar(notaSimple){
    let copiNota = nota;
    let notaOriginal = copiNota.slice(0, 1);
    if (notaOriginal === notaOriginal.toUpperCase()){
      copiNota = notaSimple + copiNota.substring(1, nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);

    }
    else{
      notaSimple = notaSimple.toLowerCase();
      copiNota = notaSimple + copiNota.substring(1, nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      console.log(editar);
    }
  }

  function obtenerMidi(){
    var x = document.getElementsByClassName("desaparecer");
    let dataUri = x[0].firstChild.getAttribute("href");
    fetch(dataUri)
    .then(res => res.blob())
    .then(blob => {
      let nombre = titulo.trim();
      var file = new File([blob], nombre);
      console.log(file);
    })


  }


  return (

        <div className="Editor">
          <div className="fluid-container correcion">
            <button onClick={obtenerMidi}>Salvar</button>
            <Abcjs
              abcNotation={ partitura }
              parserParams={{}}
              engraverParams={engraverParams}
              renderParams={{ viewportHorizontal: true }}
            />
            <div id="midi-id"/>
            {mostrar && 
            <div className="container pad">
                <h4 style={{paddingBottom: "30px"}}>{'Editor'}</h4>
                <div className="prueba">
                  <Abcjs
                    abcNotation={ editar }
                    parserParams={{}}
                    engraverParams={engraverParamsEditar}
                    renderParams={{ viewportHorizontal: true }}
                  />
                </div>
              <div className="row">
                <div className="col">
                  <h5>Notas</h5>
                </div>
                <div className="col">
                  <select className="form-control" onChange={(e) => editadoEditar(e.target.value)}>
                    <option value="" selected disabled hidden>Escoger</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
                <div className="col">
                  <h5>Tonalidad</h5>
                </div>
                <div className="col">
                  <div className="botoneraE">
                    <div className="botonespacio">
                      <button style={{width: "50px"}} className="btn btn-primary">
                        <i class="fas fa-angle-up"></i>
                      </button>
                    </div>
                    <div className="botonespacio">
                      <button style={{width: "50px"}} className="btn btn-primary">
                        <i class="fas fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="botonera">
                <div className="botonespacio">
                  <button className="btn btn-secondary espacio">Editar</button>
                </div>
                <div className="botonespacio">
                  <button className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            </div>
          }
          </div>
        </div>
  );
}

export default EditorPartitura;

//<Midi notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />
//<button onClick={() => setMostrar(true)}>mostrar</button>
//{mostrar === true && <Midi id="midi" notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />}
