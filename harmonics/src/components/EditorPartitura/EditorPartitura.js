//https://configurator.abcjs.net/visual
import React, { useState, useEffect } from 'react';
import  Abcjs  from 'react-abcjs';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';
import './EditorPartitura.css';
import { Modal } from 'react-bootstrap';
import Constantes from './Constantes';
import { Dropdown } from 'semantic-ui-react'
//import 'semantic-ui-css/semantic.min.css';
function EditorPartitura(props) {

  //Encabezado
  const [mostrarEditarEncabezada, setMostrarEditarEncabezada] = useState(false);
  const [tituloEditado, setTituloEditado] = useState('');
  const [numeradorEditado, setNumeradorEditado] = useState('');
  const [denominadorEditado, setDenominadorEditado] = useState('');
  const [keyEditado, setKeyEditado] = useState('');
  const [cleffEditado, setCleffEditado] = useState('');
  
  //Partitura completa
  const [partitura, setPartitura] = useState('T: TITULO\nM: 4/4\nL: 1/4\nK: C treble\nf,');
  
  //Fragmento editado
  const [nota, setNota] = useState('');
  const [notaSimplePos, setNotaSimplePos] = useState(0);
  const [alteracion, setAlteracion] = useState('');
  const [duracion, setDuracion] = useState('');
  const [notaInicio, setNotaInicio] = useState(null);
  const [notaFinal, setNotaFinal] = useState(null);
  const [editar, setEditar] = useState('');
  const [mostrar, setMostrar] = useState(false);
  
  //Encabezado partitura
  const [titulo, setTitulo] = useState('');
  const [compas, setCompas] = useState('');
  const [longitudNotas, setLongitudNotas] = useState('');
  const [key, setKey] = useState('');
  const [cleff, setCleff] = useState('');

  const handleClose = () => setMostrarEditarEncabezada(false);

  useEffect(() => {
    renderizarReproductor();
    extraerEncabezado();
  }, [partitura]);

  function clickNota(abcElem,tuneNumber,classes) {
    console.log(abcElem);
    if (abcElem.el_type === "note"){
      setNotaInicio(abcElem.startChar);
      setNotaFinal(abcElem.endChar);
      let n = partitura.slice(abcElem.startChar, abcElem.endChar)
      setEditar( compas + longitudNotas + key + cleff + n );
      setNota(n);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = n.search(regex);
      setNotaSimplePos(i);
      let regexAlteracion = /[_^=]/;
      let pos = n.search(regexAlteracion);
      if (pos !== -1){
        setAlteracion(n.substring(pos,i));
      }
      let regexSlash = /[/]/;
      let posSlash = n.search(regexSlash);
      if (posSlash !== -1){
        console.log(n.substring(posSlash,n.length));
        setDuracion(n.substring(posSlash,n.length));
      }
      else{
        let regexNumero = /[2-8]$/gm;
        let posNumero = n.search(regexNumero);
        console.log(posNumero);
        if (posNumero !== -1){
          console.log(n.substring(posNumero,n.length));
          setDuracion(n.substring(posNumero,n.length));
        }
      }
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
      setTituloEditado(titulo.substring(3,titulo.length-1));
      //console.log(titulo);
    }
    if(partitura.indexOf('M: ') !== -1){
      let inicio = partitura.indexOf('M: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      let compas = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setCompas(compas);
      let posSlash = compas.indexOf('/');
      setNumeradorEditado(compas.substring(3,posSlash))
      setDenominadorEditado(compas.substring(posSlash+1, compas.indexOf('\n')));
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
    if(partitura.indexOf('K: ') !== -1){
      let inicio = partitura.indexOf('K: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      let k = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      if(k.indexOf(" ", 3) !== -1){
        let i = k.indexOf(' ', 3)+1;
        let nk = k.substring(0, i);
        let clef = k.substring(i, k.length);
        //console.log(k);
        //console.log(nk);
        console.log(clef.length);
        setKey(nk);
        setCleff(clef);
        setCleffEditado(clef.substring(0, clef.length-1));
        setKeyEditado(nk.substring(3, nk.length-1));
      }
      else{
        setKey(key);
        setKeyEditado(key.substring(3, key.length-1));
      }
      //console.log(key);
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
    let notaOriginal = nota.substring(notaSimplePos, notaSimplePos+1);
    if (notaOriginal === notaOriginal.toUpperCase()){
      let remplazo = nota.substring(0, notaSimplePos) + notaSimple + nota.substring(notaSimplePos+1, nota.length);
      setEditar(editar.replace(nota, remplazo));
      setNota(remplazo);
    }
    else{
      notaSimple = notaSimple.toLowerCase();
      let remplazo = nota.substring(0, notaSimplePos) + notaSimple + nota.substring(notaSimplePos+1, nota.length);
      setEditar(editar.replace(nota, remplazo));
      setNota(remplazo);
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

  function editarEncabezado(){
    let copiaPartitura = partitura;
    copiaPartitura = copiaPartitura.replace(titulo,'T: '+tituloEditado+'\n');
    copiaPartitura = copiaPartitura.replace(key+cleff,'K: '+keyEditado+' '+cleffEditado+'\n');
    copiaPartitura = copiaPartitura.replace(compas,'M: '+numeradorEditado+'/'+denominadorEditado+'\n');

    setPartitura(copiaPartitura);
    console.log(copiaPartitura);

    setMostrarEditarEncabezada(false);
    setMostrar(false);
  }

  function aumentarOctava(){
    if (nota.indexOf(',') !== -1){
      let i = nota.indexOf(',');
      let copiNota = nota.substring(0,i)+nota.substring(i+1,nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
    } else{
      let copiNota = nota.substring(0,notaSimplePos+1) + "'"+ nota.substring(notaSimplePos+1,nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
    }
  }

  
  function disminuirOctava(){
    if (nota.indexOf("'") !== -1){
      let i = nota.indexOf("'");
      let copiNota = nota.substring(0,i)+nota.substring(i+1,nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
    } else{
      let copiNota = nota.substring(0,notaSimplePos+1) + ","+ nota.substring(notaSimplePos+1,nota.length);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
    }
  }

  function editarAlteraciones(alteracionCombo){
    let regexAlteracion = /[_^=]/;
    let pos = nota.search(regexAlteracion);
    console.log(pos);
    if (pos !== -1) {
      let copiNota = nota.substring(0,pos) + alteracionCombo + nota.substring(notaSimplePos,nota.length);
      console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setAlteracion(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
    }
    else {
      let copiNota = nota.substring(0,notaSimplePos) + alteracionCombo + nota.substring(notaSimplePos,nota.length);
      console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setAlteracion(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
    }
  }

  function editarDuracion(duracionCombo){
    console.log(duracionCombo);
    let regexDuracion = /[/]/;
    let posSlash = nota.search(regexDuracion);
    console.log(posSlash);
    if (posSlash !== -1) {
      let copiNota = nota.substring(0,posSlash) + duracionCombo + nota.substring(posSlash+2,nota.length);
      console.log(nota);
      console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setDuracion(duracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
    }
    else {
      let regexNumero = /[2-8]$/gm;
      let posNumero = nota.search(regexNumero);
      console.log(posNumero);
      if (posNumero !== -1){
        let copiNota = nota.substring(0,posNumero) + duracionCombo + nota.substring(posNumero+1,nota.length);
        console.log(nota);
        console.log(copiNota);
        setEditar(editar.replace(nota, copiNota));
        setNota(copiNota);
        setDuracion(duracionCombo);
        let regex = /[cCdDeEfFgGaAbB]/;
        let i = copiNota.search(regex);
        setNotaSimplePos(i);
      }
      else{
        let copiNota = nota.substring(0,nota.length) + duracionCombo;
        console.log(copiNota);
        setEditar(editar.replace(nota, copiNota));
        setNota(copiNota);
        setDuracion(duracionCombo);
        let regex = /[cCdDeEfFgGaAbB]/;
        let i = copiNota.search(regex);
        setNotaSimplePos(i);
      }
    }
  }

  return (

        <div className="Editor">
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <div className="fluid-container correcion">
            <div className="encabezado">
              <button className="btn btn-secondary" onClick={() => setMostrarEditarEncabezada(true)}>Editar Encabezado</button>
              <button className="btn btn-success" onClick={obtenerMidi}>Guardar</button>
            </div>
            <div style={{paddingTop: "40px"}}>
              <Abcjs
                abcNotation={ partitura }
                parserParams={{}}
                engraverParams={engraverParams}
                renderParams={{ viewportHorizontal: true }}
              />
            </div>
            <div id="midi-id"/>
            {nota}
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
                  <select value={nota.substring(notaSimplePos, notaSimplePos+1).toUpperCase()} className="form-control" onChange={(e) => editadoEditar(e.target.value)}>
                  {Constantes.Notas.map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                  })}
                  </select>
                </div>
                <div className="col">
                  <h5>Octava</h5>
                </div>
                <div className="col">
                  <div className="botoneraE">
                    <div className="botonespacio">
                      <button style={{width: "50px"}} className="btn btn-primary" onClick={() => aumentarOctava()}>
                        <i className="fas fa-angle-up"></i>
                      </button>
                    </div>
                    <div className="botonespacio">
                      <button style={{width: "50px"}} className="btn btn-primary" onClick={() => disminuirOctava()}>
                        <i className="fas fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col">
                  <h5>Alteraciones</h5>
                </div>
                <div className="col">
                  <select value={alteracion}className="form-control" onChange={(e) => editarAlteraciones(e.target.value)}>
                  <option value="" disabled hidden>Seleccione una alteracion..</option>
                  {Constantes.Alteraciones.map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                  })}
                  </select>
                </div>
                <div className="col">
                  <h5>Duracion</h5>
                </div>
                <div className="col">
                  <Dropdown
                    fluid
                    selection
                    options={Constantes.Duraciones}
                    defaultValue={duracion}
                    onChange={(e, data) => editarDuracion(data.value)}
                  />
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
          <Modal show={mostrarEditarEncabezada} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><div className="align-self-center">Editar Encabezado</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col" align="center">
                        <h5>Nombre</h5>
                      </div>
                      <div className="col-8" align="center">
                        <input type="text" className="form-control" defaultValue={tituloEditado} onChange={e => setTituloEditado(e.target.value)}/>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center" align="center">
                        <h5>Clave</h5>
                      </div>
                      <div className="col-8" align="center">
                      <select value={cleffEditado} className="form-control" onChange={e => setCleffEditado(e.target.value)}>
                        {Constantes.Claves.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })}
                      </select>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center" align="center">
                        <h5>Compas</h5>
                      </div>
                      <div className="col-8" align="center">
                        <input type="number" className="form-control" defaultValue={numeradorEditado} min="1" onChange={e => setNumeradorEditado(e.target.value)}/>
                        <input type="number" className="form-control" defaultValue={denominadorEditado} min="1" onChange={e => setDenominadorEditado(e.target.value)}/>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center" align="center">
                        <h5>Modo</h5>
                      </div>
                      <div className="col-8" align="center">
                      <select value={keyEditado} className="form-control" onChange={e => setKeyEditado(e.target.value)}>
                        {Constantes.Modo.map((e, k) => {
                            return <option key={k} value={e.value}>{e.name}</option>;
                        })}
                      </select>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-secondary btn-lg btn-block" onClick={() => {editarEncabezado()}}>Editar</button>
                </Modal.Footer>
            </Modal>
        </div>
  );
}

export default EditorPartitura;

//<Midi notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />
//<button onClick={() => setMostrar(true)}>mostrar</button>
//{mostrar === true && <Midi id="midi" notation={partitura} midiParams={{generateDownload: true, downloadLabel:'Descarga de "%T"'}} />}
