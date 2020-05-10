import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';
//import ReproductorMidi from '../ReproductorMidi/ReproductorMidi';
import Reproductor from '../Reproductor/Reproductor';
import VisualizadorPDF from '../VisualizadorPDF/VisualizadorPDF';
import './Instrumentos.css';
import { useLocation,useHistory } from "react-router-dom";
import {descargarProyecto} from '../../servicios/servicios-proyecto'



function Instrumentos(props) {

  const location = useLocation();
  const history = useHistory();

  const [idProyecto] = useState(location.state.idProyecto);
  const [nomProyecto] = useState(location.state.nomProyecto);
  const [voices] = useState(location.state.voices);
  const [logueado] = useState(location.state.logueado);


  function goToEditar (vozId){
    history.push("/Editar", {idVoz:vozId});
  }

  function ponerTitulo(nombre){
    if (nombre === 'vocals'){
      return 'Voces';
    }
    if (nombre === 'piano'){
      return 'Piano';
    }
    if (nombre === 'drums'){
      return 'Percuciones';
    }
    if (nombre === 'bass'){
      return 'Bajo';
    }
    if (nombre === 'other'){
      return 'Otros';
    }
  }

  function descargarProy (idProy)  {
      descargarProyecto(idProyecto).then( respuesta => {
        if (respuesta.bandera === true){
          fetch(respuesta.data, {
        mode: 'no-cors' /*{mode:'cors'}*/
    }).then((transfer) => {
        return transfer.blob();
    }).then((bytes) => {
        let elm = document.createElement('a');
        elm.href = URL.createObjectURL(bytes);
        elm.setAttribute('download', nomProyecto+".zip");
        elm.click()
    }).catch((error) => {
        console.log(error);
    })
        }
      });
    }


  return (

        <div className="Instrumentos">
          <div className="fluid-container correcion">
            <div className="row">
              <div className="col">
              </div>
              <div className="col">
              <h2>{nomProyecto}</h2>
              </div>
              <div className="col">
                <button className="btnDescargar"  onClick={()=>descargarProy({idProyecto})}><i className="fa fa-download" ></i> Descargar proyecto</button>
              </div>
            </div>
            <Tabs id="uncontrolled-tab-example">
              {
                voices.map( voz => (
                  <Tab key={voz.id} eventKey={voz.id} title={ponerTitulo(voz.instrument)}>
                    <br/>
                    <h3>{ponerTitulo(voz.instrument)}</h3>
                    <Reproductor idVoz={voz.id}/>
                    <VisualizadorPDF idVoz={voz.id}/>
                    <br/>
                    <button className="btnDescargarVoz" ><i className="fa fa-download"></i> Descargar Intrumento</button>
                    {logueado && <button className="btnEditar" onClick={()=>goToEditar(voz.id)} >Editar partitura</button>}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </Tab>

                ))
              }

            </Tabs>
          </div>

        </div>
  );
}

export default Instrumentos;
