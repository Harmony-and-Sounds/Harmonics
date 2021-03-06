//https://configurator.abcjs.net/visual
import React, { useState, useEffect } from 'react';
import  Abcjs  from 'react-abcjs';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';
import './EditorPartitura.css';
import { Modal } from 'react-bootstrap';
import Constantes from './Constantes';
import { Dropdown, Checkbox, Button } from 'semantic-ui-react'
import {ABCHandler} from './libreriaABC/ABCHandler';
import Carousel from 'react-bootstrap/Carousel'
import { useLocation,useHistory } from "react-router-dom";
import { getPartituraABC, guardarPartitura } from '../../servicios/servicios-proyecto';

import 'semantic-ui-css/components/reset.min.css';
//import 'semantic-ui-css/components/transition.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/list.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/item.min.css';
import 'semantic-ui-css/components/checkbox.min.css';
import 'semantic-ui-css/components/button.min.css';

import Redonda from '../../recursos/Notas-iconos/RedondaIcon.png';
import Blanca from '../../recursos/Notas-iconos/BlancaIcon.png';
import Negra from '../../recursos/Notas-iconos/NegraIcon.png';
import Corchea from '../../recursos/Notas-iconos/CorcheaIcon.png';
import SemiCorchea from '../../recursos/Notas-iconos/SemicorcheaIcon.png';
import Fusa from '../../recursos/Notas-iconos/FusaIcon.png';
import SemiFusa from '../../recursos/Notas-iconos/SemiFusaIcon.png';
import Puntillo from '../../recursos/Notas-iconos/Puntillo.png';
import Ligadura from '../../recursos/Notas-iconos/Ligadura.png';

function EditorPartitura(props) {

  const history = useHistory();

  //Elemento traido de misProyectos
  const location = useLocation();

  //Libreria
  const [handler, setHandler] = useState(null);
  const [handlerInicializado, setHandlerInicializado] = useState(false);

  //Ayuda
  const [mostrarAyudaEnsenansa, setMostrarAyudaEnsenansa] = useState(false);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [mostrarAyudaEditarNota, setMostrarAyudaEditarNota] = useState(false);
  const [mostrarAyudaAgregarNota, setMostrarAyudaAgregarNota] = useState(false);
  const [mostrarAyudaEliminarNota, setMostrarAyudaEliminarNota] = useState(false);

  //Encabezado
  const [mostrarEditarEncabezada, setMostrarEditarEncabezada] = useState(false);
  const [tituloEditado, setTituloEditado] = useState('');
  const [numeradorEditado, setNumeradorEditado] = useState('');
  const [denominadorEditado, setDenominadorEditado] = useState('');
  const [keyEditado, setKeyEditado] = useState('');
  const [cleffEditado, setCleffEditado] = useState('');

  //Menu
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [tipoNotaBase, setTipoNotaBase] = useState('');

  //Partitura completa
  const [partitura, setPartitura] = useState('');//T: TITULO\nM: 4/4\nL: 1\nK: C treble\n|z1/4|C1/8|

  //Fragmento editado
  const [nota, setNota] = useState('');
  const [notaSimplePos, setNotaSimplePos] = useState(0);
  const [alteracion, setAlteracion] = useState(' ');
  const [duracion, setDuracion] = useState('');
  const [notaInicio, setNotaInicio] = useState(null);
  const [editar, setEditar] = useState('');
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [mostrarSilencio, setMostrarSilencio] = useState(false);

  //Ligadura
  const [mostrarLigadura, setMostrarLigadura] = useState(false);
  const [ligar, setLigar] = useState(false);
  const [accion, setAccion] = useState('');

  //Eliminar
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [arreglar, setArreglar] = useState(true);

  //Agregar
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [notaSimpleAgregarPos, setNotaSimpleAgregarPos] = useState(0);
  const [alteracionAgregar, setAlteracionAgregar] = useState(' ');
  const [duracionAgregar, setDuracionAgregar] = useState('');
  const [notaAgregar, setNotaAgregar] = useState('');
  const [partituraAgregar, setPartituraAgregar] = useState('');
  const [mostrarNotaAgregar, setMostrarNotaAgregar] = useState(false);
  const [mostrarSilencioAgregar, setMostrarSilencioAgregar] = useState(false);
  const [ubicacion, setUbicacion] = useState('Derecha');

  //Encabezado partitura
  const [titulo, setTitulo] = useState('');
  const [compas, setCompas] = useState('');
  const [longitudNotas, setLongitudNotas] = useState('');
  const [key, setKey] = useState('');
  const [cleff, setCleff] = useState('');

  const handleClose = () => setMostrarEditarEncabezada(false);
  const handleCloseMostrarAyuda = () => setMostrarAyuda(false);
  const handleCloseMostrarAyudaEnsenansa = () => setMostrarAyudaEnsenansa(false);
  const handleCloseMostrarAyudaEditarNota = () => setMostrarAyudaEditarNota(false);
  const handleCloseMostrarAyudaAgregarNota = () => setMostrarAyudaAgregarNota(false);
  const handleCloseMostrarAyudaEliminarNota = () => setMostrarAyudaEliminarNota(false);
  const handleCloseMostrarEditar = () => {setMostrarEditar(false); setMostrarMenu(true)};
  const handleCloseMostrarMenu = () => setMostrarMenu(false);
  const handleCloseMostrarEliminar = () => {setMostrarEliminar(false); setMostrarMenu(true)};
  const handleCloseMostrarAgregar = () => {setMostrarAgregar(false); setMostrarMenu(true)};
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

  useEffect(() => {
    if (location.state === undefined){
      alert('Error cargando la partitura');
      history.push('/');
    }
    else{
      getABC();
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {  
    if (partitura !== ''){
      extraerEncabezado();
      renderizarReproductor();
    }
  // eslint-disable-next-line
  }, [partitura]);

  function getABC () {
    const access = sessionStorage.getItem('access');
    const idVoz = location.state.idVoz;
    if(access !== null){
        getPartituraABC(access, idVoz).then(respuesta => {
            if (respuesta.bandera === true){
                setPartitura(respuesta.data);
            }
            else{
                alert(respuesta.data);
            }
        });
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

  function extraerEncabezado(){
    let ultimoSalto = 0;
    let compasLocal = '';
    if(partitura.indexOf('T: ') !== -1){
      let inicio = partitura.indexOf('T: ');
      //console.log(inicio);
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      //console.log(fin);
      let titulo = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setTitulo(titulo);
      setTituloEditado(titulo.substring(3,titulo.length-1));
      //console.log(titulo);
    }
    if(partitura.indexOf('M: ') !== -1){
      let inicio = partitura.indexOf('M: ');
      let fin = partitura.indexOf('\n', ultimoSalto)+1;
      compasLocal = partitura.substring(inicio, fin);
      ultimoSalto = fin;
      setCompas(compasLocal);
      let posSlash = compasLocal.indexOf('/');
      setNumeradorEditado(compasLocal.substring(3,posSlash))
      setDenominadorEditado(compasLocal.substring(posSlash+1, compasLocal.indexOf('\n')));
      //console.log(compasLocal);
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
        //console.log(clef.length);
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

    if (!handlerInicializado){
      let InicioNotas = partitura.indexOf('|');
      let notas = partitura.substring(InicioNotas, partitura.length);
      //console.log(notas, compasLocal.substring(3, compasLocal.length));
      let h = new ABCHandler(compasLocal.substring(3, compasLocal.length), notas);
      setHandler(h);
      //console.log(h.getScore());
      setHandlerInicializado(true);
    }
  }

  function editarEncabezado(){
    /*handler.setTempo(numeradorEditado+'/'+denominadorEditado);
    let partituraSinEncabezadoModificada = handler.getScore();
    console.log(partituraSinEncabezadoModificada);
    let InicioNotas = partitura.indexOf('|');*/
    let copiaPartitura = partitura;
    //console.log(copiaPartitura);
    copiaPartitura = copiaPartitura.replace(titulo,'T: '+tituloEditado+'\n');
    copiaPartitura = copiaPartitura.replace(key+cleff,'K: '+keyEditado+' '+cleffEditado+'\n');
    copiaPartitura = copiaPartitura.replace(compas,'M: '+numeradorEditado+'/'+denominadorEditado+'\n');
    //console.log(copiaPartitura);

    handler.setTempo(numeradorEditado+'/'+denominadorEditado);
    let partituraSinEncabezadoModificada = handler.getScore();
    let InicioNotas = copiaPartitura.indexOf('|');

    copiaPartitura = copiaPartitura.substring(0,InicioNotas) + partituraSinEncabezadoModificada;
    setPartitura(copiaPartitura);
    //console.log(copiaPartitura);

    setMostrarEditarEncabezada(false);
    setMostrar(false);
    setMostrarSilencio(false);
    setMostrarEditar(false);
    setMostrarMenu(false);
  }

  function closeMostrarAyuda(){
    localStorage.setItem("ayudaEditar", false);
    setMostrarAyuda(false);
  }

  function guardar () {
    const access = sessionStorage.getItem('access');
    const idVoz = location.state.idVoz;
    guardarPartitura (access, idVoz, partitura).then( respuesta => {
      if (respuesta.bandera === true){
        history.goBack();
      }
      else{
          alert("Error guardando partitura.");
      }
    });
  }


  function clickNota(abcElem) {
    if (!ligar && abcElem.el_type === "note"){
      setMostrarMenu(true);
      setMostrar(false);
      setMostrarSilencio(false);
      //console.log(abcElem);
      if (abcElem.el_type === "note" && abcElem.pitches !== undefined){
        setNotaInicio(abcElem.startChar);
        let n = partitura.slice(abcElem.startChar, abcElem.endChar)
        //let n = obtener(abcElem.startChar);
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
        let regexfrac = /[\d]+[/][\d]+/gm;
        let posDur = n.search(regexfrac);
        if (posDur !== -1){
          regexfrac.test(n);
          let lastIndex = regexfrac.lastIndex;
          //console.log(n.substring(posDur,lastIndex));
          setDuracion(n.substring(posDur,lastIndex));
        }
        setTipoNotaBase('Nota');
        setMostrar(true);
      }
      else{
        setNotaInicio(abcElem.startChar);
        //console.log(abcElem.startChar);
        //console.log(abcElem.endChar);
        let n = partitura.slice(abcElem.startChar, abcElem.endChar)
        setEditar( compas + longitudNotas + key + cleff + n );
        setNota(n);
        let regexfrac = /[\d]+[/][\d]+/gm;
        let posDur = n.search(regexfrac);
        //console.log(posDur);
        if (posDur !== -1){
          regexfrac.test(n);
          let lastIndex = regexfrac.lastIndex;
          //console.log(n.substring(posDur,lastIndex));
          setDuracion(n.substring(posDur,lastIndex));
        }
        setTipoNotaBase('Silencio');
        setMostrarSilencio(true);
      }
    }
    if (ligar && abcElem.el_type === "note") {
      if (abcElem.pitches !== undefined){
        if (abcElem.startChar !== notaInicio){
          let InicioNotas = partitura.indexOf('|');
          let  primero = notaInicio - InicioNotas;
          let  segundo = abcElem.startChar - InicioNotas;
          if (accion === 'Agregar'){
            if (primero < segundo){
              handler.tieNotes(primero, segundo);
              let partituraSinEncabezadoModificada = handler.getScore();
              setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
              //console.log(partituraSinEncabezadoModificada);
            }
            if (segundo < primero){
              handler.tieNotes(segundo, primero);
              let partituraSinEncabezadoModificada = handler.getScore();
              setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
              //console.log(partituraSinEncabezadoModificada);
            }
          }
          if (accion === 'Eliminar'){
            if (primero < segundo){
              handler.untieNotes(primero, segundo);
              let partituraSinEncabezadoModificada = handler.getScore();
              setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
            }
            if (segundo < primero) {
              handler.untieNotes(segundo, primero);
              let partituraSinEncabezadoModificada = handler.getScore();
              setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
            }
          }
          setMostrarLigadura(false);
          setLigar(false);
          setAccion('');
          setNota('');
          setNotaSimplePos(0);
          setAlteracion(' ');
          setDuracion('');
          setNotaInicio(null);
          setEditar('');
          setTipoNotaBase('');
          setMostrarEditar(false);
        }
        else{
          alert('Seleccione una nota distinta a la propia');
        }
      }
      else {
        alert('Seleccione una nota valida para ligar');
      }
    }
  }

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
      //console.log(editar);
    }
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
    if (alteracionCombo === ' '){
      alteracionCombo = '';
    }
    //console.log(alteracionCombo);
    if (pos !== -1) {
      let copiNota = nota.substring(0,pos) + alteracionCombo + nota.substring(notaSimplePos,nota.length);
      //console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setAlteracion(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
    }
    else {
      let copiNota = nota.substring(0,notaSimplePos) + alteracionCombo + nota.substring(notaSimplePos,nota.length);
      //console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setAlteracion(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
    }
  }

  function editarDuracion(duracionCombo){
    let editado = 0;
    let regexfrac = /[\d]+[/][\d]+/gm;
    let posDur = nota.search(regexfrac);
    //console.log(nota);
    //console.log(posDur);
    if (posDur !== -1 && editado === 0){
      regexfrac.test(nota);
      let lastIndex = regexfrac.lastIndex;
      let copiNota = nota.substring(0,posDur) + duracionCombo + nota.substring(lastIndex,nota.length);
      //console.log(nota);
      //console.log(copiNota);
      setEditar(editar.replace(nota, copiNota));
      setNota(copiNota);
      setDuracion(duracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimplePos(i);
      editado = 1;
    }
  }

  function convertirSilencio(){
    let n = 'z1/4';
    setEditar( compas + longitudNotas + key + cleff + n );
    setNota(n);
    setDuracion('1/4');
    setMostrar(false);
    setMostrarSilencio(true);
  }

  function convertirNota(){
    let n = 'C1/4';
    setEditar( compas + longitudNotas + key + cleff + n );
    setNota(n);
    setNotaSimplePos(0);
    setAlteracion(' ');
    setDuracion('1/4');
    setMostrarSilencio(false);
    setMostrar(true);
  }

  function habilitarLigadura(accion){
    if (accion){
      setAccion('Agregar');
    }
    else{
      setAccion('Eliminar');
    }
    setLigar(true);
    setMostrarLigadura(true);
    setMostrarMenu(false);
  }

  function cancelarLigaduraNota() {
    setMostrarLigadura(false);
    setLigar(false);
    setMostrarMenu(true);
  }


  function editarEnGrande(){

    let InicioNotas = partitura.indexOf('|');
    handler.updateNote(notaInicio - InicioNotas, nota);
    let partituraSinEncabezadoModificada = handler.getScore();
    setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
    setNota('');
    setNotaSimplePos(0);
    setAlteracion(' ');
    setDuracion('');
    setNotaInicio(null);
    setEditar('');
    setTipoNotaBase('');
    setMostrar(false);
    setMostrarSilencio(false);
    setMostrarEditar(false);
    setMostrarMenu(false);
  }

  function eliminarNota(){
    let InicioNotas = partitura.indexOf('|');
    handler.deleteNote(notaInicio - InicioNotas, arreglar);
    let partituraSinEncabezadoModificada = handler.getScore();
    setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);

    setArreglar(true);
    setNota('');
    setNotaSimplePos(0);
    setAlteracion(' ');
    setDuracion('');
    setNotaInicio(null);
    setEditar('');
    setTipoNotaBase('');
    setMostrarEliminar(false);
    setMostrarMenu(false);
  }

  function inicioAgregar (){
    let notaAgregar = 'C1/4';
    setMostrarAgregar(true);
    setMostrarMenu(false)
    setNotaAgregar(notaAgregar);
    setNotaSimpleAgregarPos(0);
    setDuracionAgregar('1/4');
    setAlteracionAgregar(' ');
    setPartituraAgregar(compas + longitudNotas + key + cleff + notaAgregar );
    setMostrarNotaAgregar(true);
    setMostrarSilencioAgregar(false);
  }

  function editarAgregadoNota(notaSimple){
    let notaOriginal = notaAgregar.substring(notaSimpleAgregarPos, notaSimpleAgregarPos+1);
    if (notaOriginal === notaOriginal.toUpperCase()){
      let remplazo = notaAgregar.substring(0, notaSimpleAgregarPos) + notaSimple + notaAgregar.substring(notaSimpleAgregarPos+1, notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, remplazo));
      setNotaAgregar(remplazo);
    }
    else{
      notaSimple = notaSimple.toLowerCase();
      let remplazo = notaAgregar.substring(0, notaSimpleAgregarPos) + notaSimple + notaAgregar.substring(notaSimpleAgregarPos+1, notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, remplazo));
      setNotaAgregar(remplazo);
      //console.log(editar);
    }
  }

  function aumentarOctavaAgregar(){
    if (notaAgregar.indexOf(',') !== -1){
      let i = notaAgregar.indexOf(',');
      let copiNota = notaAgregar.substring(0,i)+notaAgregar.substring(i+1,notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
    } else{
      let copiNota = notaAgregar.substring(0,notaSimpleAgregarPos+1) + "'"+ notaAgregar.substring(notaSimpleAgregarPos+1,notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
    }
  }


  function disminuirOctavaAgregar(){
    if (notaAgregar.indexOf("'") !== -1){
      let i = notaAgregar.indexOf("'");
      let copiNota = notaAgregar.substring(0,i)+notaAgregar.substring(i+1,notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
    } else{
      let copiNota = notaAgregar.substring(0,notaSimpleAgregarPos+1) + ","+ notaAgregar.substring(notaSimpleAgregarPos+1,notaAgregar.length);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
    }
  }

  function editarAlteracionesAgregar(alteracionCombo){
    let regexAlteracion = /[_^=]/;
    let pos = notaAgregar.search(regexAlteracion);
    if (alteracionCombo === ' '){
      alteracionCombo = '';
    }
    //console.log(alteracionCombo);
    if (pos !== -1) {
      let copiNota = notaAgregar.substring(0,pos) + alteracionCombo + notaAgregar.substring(notaSimpleAgregarPos,notaAgregar.length);
      //console.log(copiNota);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
      setAlteracionAgregar(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimpleAgregarPos(i);
    }
    else {
      let copiNota = notaAgregar.substring(0,notaSimpleAgregarPos) + alteracionCombo + notaAgregar.substring(notaSimpleAgregarPos,notaAgregar.length);
      //console.log(copiNota);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
      setAlteracionAgregar(alteracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimpleAgregarPos(i);
    }
  }

  function editarDuracionAgregar(duracionCombo){
    let editado = 0;
    let regexfrac = /[\d]+[/][\d]+/gm;
    let posDur = notaAgregar.search(regexfrac);
    if (posDur !== -1 && editado === 0){
      regexfrac.test(notaAgregar);
      let lastIndex = regexfrac.lastIndex;
      let copiNota = notaAgregar.substring(0,posDur) + duracionCombo + nota.substring(lastIndex,notaAgregar.length);
      //console.log(copiNota);
      setPartituraAgregar(partituraAgregar.replace(notaAgregar, copiNota));
      setNotaAgregar(copiNota);
      setDuracionAgregar(duracionCombo);
      let regex = /[cCdDeEfFgGaAbB]/;
      let i = copiNota.search(regex);
      setNotaSimpleAgregarPos(i);
      editado = 1;
    }
  }

  function convertirSilencioAgregar(){
    let n = 'z1/4';
    setPartituraAgregar( compas + longitudNotas + key + cleff + n );
    setNotaAgregar(n);
    setDuracionAgregar('1/4');
    setMostrarNotaAgregar(false);
    setMostrarSilencioAgregar(true);
  }

  function convertirNotaAgregar(){
    let n = 'C1/4';
    setPartituraAgregar( compas + longitudNotas + key + cleff + n );
    setNotaAgregar(n);
    setNotaSimpleAgregarPos(0);
    setAlteracionAgregar(' ');
    setDuracionAgregar('1/4');
    setMostrarSilencioAgregar(false);
    setMostrarNotaAgregar(true);
  }


  function agregar(){
    let after = null;
    if (ubicacion === 'Izquierda'){
      after = false;
    }
    if (ubicacion === 'Derecha'){
      after = true;
    }
    let InicioNotas = partitura.indexOf('|');
    handler.addNote(notaInicio - InicioNotas, notaAgregar, after);
    let partituraSinEncabezadoModificada = handler.getScore();
    setPartitura(partitura.substring(0, InicioNotas) + partituraSinEncabezadoModificada);
    setNota('');
    setNotaSimplePos(0);
    setAlteracion(' ');
    setDuracion('');
    setNotaInicio(null);
    setEditar('');
    setTipoNotaBase('');
    setNotaSimpleAgregarPos(0);
    setAlteracionAgregar(' ');
    setDuracionAgregar('');
    setNotaAgregar('');
    setPartituraAgregar('');
    setUbicacion('Derecha');
    setMostrarNotaAgregar(false);
    setMostrarSilencioAgregar(false);
    setMostrarAgregar(false);
    setMostrarMenu(false);
  }


  return (

        <div className="Editor">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/components/transition.min.css" />
          <div className="fluid-container correcion">
            <div className="encabezado">
              <button className="btn btn-secondary" onClick={() => setMostrarEditarEncabezada(true)}>Editar Encabezado</button>
              <button className="btn btn-success" onClick={guardar}>Guardar</button>
              <button className="btn btn-warning justify-content-center" onClick={() => setMostrarAyuda(true)}><i className="fas fa-question-circle"></i></button>
              <button className="btn btn-info justify-content-center" onClick={() => setMostrarAyudaEnsenansa(true)}><i class="fas fa-music"></i></button>
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
          {mostrarLigadura &&
            <div className="container pad">
                <div className="row">
                  <div className="col align-self-center">
                    <span style={{fontSize: "23px"}}>Seleccione la nota que desea ligar ...</span>
                  </div>
                </div>
                <br/>
                <div className="row">
                <div className="col align-self-center">
                    <button style={{width:"320px"}} className="btn btn-danger btn-lg" onClick={(e) => cancelarLigaduraNota()}>Cancelar</button>
                  </div>
                </div>
            </div>
          }

          </div>
          <Modal show={mostrarEditarEncabezada} onHide={handleClose} size="lg" centered>
                <Modal.Header className="text-center" closeButton>
                  <h2 style={{margin: "0", paddingLeft: "32px"}} className="w-100">Editar Encabezado</h2>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col" align="center">
                        <h3>Nombre</h3>
                      </div>
                      <div className="col-8" align="center">
                        <input type="text" className="form-control" defaultValue={tituloEditado} onChange={e => setTituloEditado(e.target.value)}/>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center" align="center">
                        <h3>Clave</h3>
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
                        <h3>Compás</h3>
                      </div>
                      <div className="col-8" align="center">
                        <input type="number" className="form-control" defaultValue={numeradorEditado} min="1" onChange={e => setNumeradorEditado(e.target.value)}/>
                        <input type="number" className="form-control" defaultValue={denominadorEditado} min="1" onChange={e => setDenominadorEditado(e.target.value)}/>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center" align="center">
                        <h3>Tonalidad</h3>
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

            <Modal show={mostrarAyuda} onHide={handleCloseMostrarAyuda} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                  <Modal.Title>Ayuda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel>
                {Constantes.AyudaImagenes.map((e, key) => {
                    return (
                    <Carousel.Item>
                    <div className = "AyudaItem">
                      <img
                        className="imageCarouselAyuda"
                        src={e.image.src}
                        alt={key}
                      />
                    </div>
                    </Carousel.Item>
                  )
                })}
                </Carousel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => {closeMostrarAyuda()}} >
                    Entendido
                  </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarEditar} onHide={handleCloseMostrarEditar} dialogClassName="modal-90w" centered>
                <Modal.Header className="text-center" closeButton>
                    <h2 style={{margin: "0", paddingLeft: "32px"}} className="w-100">Editar</h2>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                  {mostrar &&
                  <div className="container">
                  <div className="prueba col-12">
                  <Abcjs
                    abcNotation={ editar }
                    parserParams={{}}
                    engraverParams={engraverParamsEditar}
                    renderParams={{ viewportHorizontal: true }}
                  />
                  </div>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3>Notas</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        fluid
                        selection
                        options={Constantes.Notas}
                        defaultValue={nota.substring(notaSimplePos, notaSimplePos+1).toUpperCase()}
                        onChange={(e, data) => editadoEditar(data.value)}
                      />
                    </div>
                    <div className="col align-self-center">
                      <h3>Octava</h3>
                    </div>
                    <div className="col align-self-center">
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
                    <div className="col align-self-center">
                      <h3>Alteraciones</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        fluid
                        selection
                        options={Constantes.Alteraciones}
                        defaultValue={alteracion}
                        onChange={(e, data) => editarAlteraciones(data.value)}
                      />
                    </div>
                    <div className="col align-self-center">
                      <h3>Duración</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        placeholder='Ingrese la duración ...'
                        fluid
                        selection
                        options={Constantes.Duraciones}
                        defaultValue={(Constantes.Duraciones.find(obj => { return obj.value === duracion }) !== undefined) ? duracion : null}
                        onChange={(e, data) => editarDuracion(data.value)}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3 style={{margin: "0"}}>Convertir en Silencio</h3>
                      <span style={{color: "red"}}>* Esto borrará la informacion de la nota</span>
                    </div>
                    <div className="col align-self-center">
                      <button className="btn btn-primary btn-lg btn-block" onClick={e => convertirSilencio()}>Convertir</button>
                    </div>
                    <div className="col align-self-center">
                    </div>
                    <div className="col align-self-center">
                    </div>
                  </div>
                </div>
                }
                {mostrarSilencio &&
                  <div className="container">
                    <div className="prueba">
                      <Abcjs
                        abcNotation={ editar }
                        parserParams={{}}
                        engraverParams={engraverParamsEditar}
                        renderParams={{ viewportHorizontal: true }}
                      />
                    </div>
                    <div className="row">
                      <div className="col align-self-center">
                        <h3>Duración</h3>
                      </div>
                      <div className="col align-self-center">
                        <Dropdown
                          placeholder='Ingrese la duración del silencio ...'
                          fluid
                          scrolling={true}
                          selections='true'
                          options={Constantes.DuracionesSilencios}
                          defaultValue={(Constantes.DuracionesSilencios.find(obj => { return obj.value === duracion }) !== undefined) ? duracion : null}
                          onChange={(e, data) => editarDuracion(data.value)}
                        />
                      </div>
                      <div className="col align-self-center">
                        <h3 style={{margin: "0"}}>Convertir en Nota</h3>
                        <span style={{color: "red"}}>* Esto borrará la informacion del Silencio</span>
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-primary btn-lg btn-block" onClick={e => convertirNota()}>Convertir</button>
                      </div>
                    </div>
                  </div>
                }
                </Modal.Body>
                <Modal.Footer>
                <div className="row no-gutters" style={{width: "100%"}}>
                  <div className="col-11">
                    <button className="btn btn-secondary btn-lg btn-block" onClick={e => editarEnGrande()}>Editar</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-warning btn-lg btn-block" onClick={() => setMostrarAyudaEditarNota(true)}><i className="fas fa-question-circle"></i></button>
                  </div>
                </div>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarMenu} onHide={handleCloseMostrarMenu} dialogClassName="modal-50w" centered>
                <Modal.Header className="text-center" closeButton>
                  <h2 style={{margin: "0", paddingLeft: "32px"}} className="w-100">Menú</h2>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                  {tipoNotaBase === 'Nota' &&
                  <div>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => habilitarLigadura(true)}>Agregar Ligadura</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => habilitarLigadura(false)}>Eliminar Ligadura</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {setMostrarEditar(true); setMostrarMenu(false)}}>Editar Nota</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {inicioAgregar()}}>Agregar Nota</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {setMostrarEliminar(true); setMostrarMenu(false)}}>Eliminar Nota</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                  </div>
                  }
                  {tipoNotaBase === 'Silencio' &&
                  <div>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {setMostrarEditar(true); setMostrarMenu(false)}}>Editar Silencio</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {inicioAgregar()}}>Agregar Nota</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col">
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-secondary btn-lg btn-block" onClick={(e) => {setMostrarEliminar(true); setMostrarMenu(false)}}>Eliminar Silencio</button>
                      </div>
                      <div className="col">
                      </div>
                    </div>
                  </div>
                  }
                </Modal.Body>
            </Modal>

            <Modal show={mostrarEliminar} onHide={handleCloseMostrarEliminar} size="sm" centered>
                <Modal.Header className="text-center" closeButton>
                  <h2 style={{margin: "0"}} className="w-100">Eliminar</h2>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3>Arreglar partitura</h3>
                    </div>
                    <div className="col align-self-center">
                       <Checkbox toggle checked={arreglar} onChange={(e, data) => setArreglar(data.checked)}/>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                <div className="row no-gutters" style={{width: "100%"}}>
                  <div className="col-9">
                    <button className="btn btn-secondary btn-lg btn-block" onClick={e => eliminarNota()}>Eliminar</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-warning btn-lg btn-block"onClick={() => setMostrarAyudaEliminarNota(true)}><i className="fas fa-question-circle"></i></button>
                  </div>
                </div>
                </Modal.Footer>
            </Modal>



            <Modal show={mostrarAgregar} onHide={handleCloseMostrarAgregar} dialogClassName="modal-90w" centered>
                <Modal.Header className="text-center" closeButton>
                    <h2 style={{margin: "0"}} className="w-100">Agregar</h2>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                  {mostrarNotaAgregar &&
                  <div className="container">
                  <div className="prueba col-12">
                  <Abcjs
                    abcNotation={ partituraAgregar }
                    parserParams={{}}
                    engraverParams={engraverParamsEditar}
                    renderParams={{ viewportHorizontal: true }}
                  />
                  </div>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3>Notas</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        fluid
                        selection
                        options={Constantes.Notas}
                        defaultValue={notaAgregar.substring(notaSimpleAgregarPos, notaSimpleAgregarPos+1).toUpperCase()}
                        onChange={(e, data) => editarAgregadoNota(data.value)}
                      />
                    </div>
                    <div className="col align-self-center">
                      <h3>Octava</h3>
                    </div>
                    <div className="col align-self-center">
                      <div className="botoneraE">
                        <div className="botonespacio">
                          <button style={{width: "50px"}} className="btn btn-primary" onClick={() => aumentarOctavaAgregar()}>
                            <i className="fas fa-angle-up"></i>
                          </button>
                        </div>
                        <div className="botonespacio">
                          <button style={{width: "50px"}} className="btn btn-primary" onClick={() => disminuirOctavaAgregar()}>
                            <i className="fas fa-angle-down"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3>Alteraciones</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        fluid
                        selection
                        options={Constantes.Alteraciones}
                        defaultValue={alteracionAgregar}
                        onChange={(e, data) => editarAlteracionesAgregar(data.value)}
                      />
                    </div>
                    <div className="col align-self-center">
                      <h3>Duración</h3>
                    </div>
                    <div className="col align-self-center">
                      <Dropdown
                        placeholder='Ingrese la duración de la nota ...'
                        fluid
                        selection
                        options={Constantes.Duraciones}
                        defaultValue={(Constantes.Duraciones.find(obj => { return obj.value === duracionAgregar }) !== undefined) ? duracionAgregar : null}
                        onChange={(e, data) => editarDuracionAgregar(data.value)}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col align-self-center">
                      <h3 style={{margin: "0"}}>Convertir en Silencio</h3>
                      <span style={{color: "red"}}>* Esto borrará la informacion de la nota</span>
                    </div>
                    <div className="col align-self-center">
                      <button className="btn btn-primary btn-lg btn-block" onClick={e => convertirSilencioAgregar()}>Convertir</button>
                    </div>
                    <div className="col align-self-center">
                      <h3>Ubicación</h3>
                    </div>
                    <div className="col align-self-center">
                    <Button.Group>
                      <Button color="green" onClick={() => setUbicacion('Izquierda')}>Izquierda</Button>
                      <Button.Or />
                      <Button color="teal" onClick={() => setUbicacion('Derecha')}>Derecha</Button>
                    </Button.Group>
                    </div>
                  </div>
                </div>
                }
                {mostrarSilencioAgregar &&
                  <div className="container">
                    <div className="prueba">
                      <Abcjs
                        abcNotation={ partituraAgregar }
                        parserParams={{}}
                        engraverParams={engraverParamsEditar}
                        renderParams={{ viewportHorizontal: true }}
                      />
                    </div>
                    <div className="row">
                      <div className="col align-self-center">
                        <h3>Duración</h3>
                      </div>
                      <div className="col align-self-center">
                      <Dropdown
                          placeholder='Ingrese la duración del silencio ...'
                          fluid
                          selection
                          scrolling={true}
                          options={Constantes.DuracionesSilencios}
                          defaultValue={(Constantes.DuracionesSilencios.find(obj => { return obj.value === duracionAgregar }) !== undefined) ? duracionAgregar : null}
                          onChange={(e, data) => editarDuracionAgregar(data.value)}
                        />
                      </div>
                      <div className="col align-self-center">
                        <h3 style={{margin: "0"}}>Convertir en Nota</h3>
                        <span style={{color: "red"}}>* Esto borrará la informacion del Silencio</span>
                      </div>
                      <div className="col align-self-center">
                        <button className="btn btn-primary btn-lg btn-block" onClick={e => convertirNotaAgregar()}>Convertir</button>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col align-self-center">
                        <h3>Ubicación</h3>
                      </div>
                      <div className="col align-self-center">
                        <Button.Group>
                        <Button color="green" onClick={() => setUbicacion('Izquierda')}>Izquierda</Button>
                        <Button.Or />
                        <Button color="teal" onClick={() => setUbicacion('Derecha')}>Derecha</Button>
                      </Button.Group>
                      </div>
                      <div className="col align-self-center">
                      </div>
                      <div className="col align-self-center">
                      </div>
                    </div>
                  </div>
                }
                </Modal.Body>
                <Modal.Footer>
                <div className="row no-gutters" style={{width: "100%"}}>
                  <div className="col-11">
                    <button className="btn btn-secondary btn-lg btn-block" onClick={e => agregar()}>{'Agregar a la '+ubicacion}</button>
                  </div>
                  <div className="col">
                    <button className="btn btn-warning btn-lg btn-block"onClick={() => setMostrarAyudaAgregarNota(true)}><i className="fas fa-question-circle"></i></button>
                  </div>
                </div>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarAyudaEditarNota} onHide={handleCloseMostrarAyudaEditarNota} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                  <Modal.Title>Ayuda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel>
                {Constantes.AyudaEditarImagenes.map((e, key) => {
                    return (
                    <Carousel.Item>
                    <div className = "AyudaItem">
                      <img
                        className="imageCarouselAyuda"
                        src={e.image.src}
                        alt={key}
                      />
                    </div>
                    </Carousel.Item>
                  )
                })}
                </Carousel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMostrarAyudaEditarNota} >
                    Entendido
                  </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarAyudaAgregarNota} onHide={handleCloseMostrarAyudaAgregarNota} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                  <Modal.Title>Ayuda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel>
                {Constantes.AyudaAgregarImagenes.map((e, key) => {
                    return (
                    <Carousel.Item>
                    <div className = "AyudaItem">
                      <img
                        className="imageCarouselAyuda"
                        src={e.image.src}
                        alt={key}
                      />
                    </div>
                    </Carousel.Item>
                  )
                })}
                </Carousel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMostrarAyudaAgregarNota} >
                    Entendido
                  </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarAyudaEliminarNota} onHide={handleCloseMostrarAyudaEliminarNota} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                  <Modal.Title>Ayuda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel>
                {Constantes.AyudaElimnarImagenes.map((e, key) => {
                    return (
                    <Carousel.Item>
                    <div className = "AyudaItem">
                      <img
                        className="imageCarouselAyuda"
                        src={e.image.src}
                        alt={key}
                      />
                    </div>
                    </Carousel.Item>
                  )
                })}
                </Carousel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMostrarAyudaEliminarNota} >
                    Entendido
                  </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarAyudaEnsenansa} onHide={handleCloseMostrarAyudaEnsenansa} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
                <Modal.Header className="text-center" closeButton>
                    <h2 style={{margin: "0"}} className="w-100">Ayuda elementos musicales básicos</h2>
                </Modal.Header>
                <Modal.Body>
                  <h5>Notas musicales básicas</h5>
                  <h6 style={{display: "inline-block"}}>Redonda</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Redonda} style={{width: "40px", height: "40px"}} alt="Redonda"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que posee una duración de cuatro pulsos de negra.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Blanca</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Blanca} style={{width: "40px", height: "40px"}} alt="Blanca"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/2 del valor de la figura redonda.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Negra</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Negra} style={{width: "40px", height: "40px"}} alt="Negra"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/4 del valor de la figura redonda.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Corchea</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Corchea} style={{width: "40px", height: "40px"}} alt="Corchea"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/8 del valor de la figura redonda.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Semicorchea</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={SemiCorchea} style={{width: "40px", height: "40px"}} alt="SemiCorchea"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/16 del valor de la figura redonda.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Fusa</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Fusa} style={{width: "40px", height: "40px"}} alt="Fusa"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/32 del valor de la figura redonda.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Semifusa</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={SemiFusa} style={{width: "40px", height: "40px"}} alt="SemiFusa"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Figura musical que equivale a 1/64 del valor de la figura redonda.
                    </div>
                  </div>
                  <h5>Elementos musicales básicas</h5>
                  <h6 style={{display: "inline-block"}}>Puntillo</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Puntillo} style={{width: "40px", height: "30px"}} alt="Puntillo"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Aumenta la duración de la nota en donde se use, en la mitad de su valor original.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Ligadura</h6>
                  <div className="row">
                    <div className="col-2 align-self-center">
                      <img src={Ligadura} style={{width: "40px", height: "30px"}} alt="Ligadura"/>
                    </div>
                    <div className="col-8 align-self-center">
                      Cuando uno o varias notas están unidas por este elemento, el valor de sus figuras se suma y se ejecuta como una sola figura.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Compas</h6>
                  <div className="row">
                    <div className="col align-self-center">
                      Elemento musical que nos sirve para poder escribir el ritmo de la música.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Clave</h6>
                  <div className="row">
                    <div className="col align-self-center">
                      Signo cuya función es indicar la altura de la musica escrita, asignando una determinada nota a una línea del pentagrama.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Octava</h6>
                  <div className="row">
                    <div className="col align-self-center">
                      Intervalo de ocho grados entre dos notas de la escala musical.
                    </div>
                  </div>
                  <h6 style={{display: "inline-block"}}>Alteración</h6>
                  <div className="row">
                    <div className="col align-self-center">
                      Signos que modifican la entonación o altura de una nota musical.
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMostrarAyudaEnsenansa} >
                    Entendido
                  </Button>
                </Modal.Footer>
            </Modal>
        </div>
  );
}

export default EditorPartitura;
