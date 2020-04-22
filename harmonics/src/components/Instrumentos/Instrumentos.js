import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';
//import ReproductorMidi from '../ReproductorMidi/ReproductorMidi';
import Reproductor from '../Reproductor/Reproductor';
import VisualizadorPDF from '../VisualizadorPDF/VisualizadorPDF';
import './Instrumentos.css';
import { useLocation } from "react-router-dom";
import {descargarProyecto} from '../../servicios/servicios-proyecto'



function Instrumentos(props) {

  const location = useLocation();

  const [idProyecto] = useState(location.state.idProyecto);
  const [nomProyecto] = useState(location.state.nomProyecto);
  const [voices] = useState(location.state.voices);


  function descargarProy (idProy)  {
    console.log(idProy);
      descargarProyecto(idProyecto).then( respuesta => {
        if (respuesta.bandera === true){
          console.log(respuesta.data);
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
            <div className="flex-row">
              <h2>{nomProyecto}<button className="btnDescargar"  onClick={()=>descargarProy({idProyecto})}><i className="fa fa-download" ></i> Descargar proyecto</button></h2>
            </div>
            <Tabs id="uncontrolled-tab-example">
              {
                voices.map( voz => (
                  <Tab key={voz.id} eventKey={voz.id} title={voz.instrument}>
                    <br/>
                    <h3>{voz.instrument}</h3>
                    <Reproductor idVoz={voz.id}/>
                    <VisualizadorPDF idVoz={voz.id}/>
                    <br/>
                    <button className="btnDescargarVoz" ><i className="fa fa-download"></i> Descargar Intrumento</button>
                  </Tab>
                ))
              }

            </Tabs>
          </div>

        </div>
  );
}

export default Instrumentos;
