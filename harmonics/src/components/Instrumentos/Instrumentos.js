import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';
//import ReproductorMidi from '../ReproductorMidi/ReproductorMidi';
import Reproductor from '../Reproductor/Reproductor';
import VisualizadorPDF from '../VisualizadorPDF/VisualizadorPDF';
import './Instrumentos.css';
import { useLocation } from "react-router-dom";

function Instrumentos(props) {

  const location = useLocation();

  const [idProyecto] = useState(location.state.idProyecto);
  const [nomProyecto] = useState(location.state.nomProyecto);
  const [voices] = useState(location.state.voices);

  return (

        <div className="Instrumentos">
          <div className="fluid-container correcion">
            <h2>Instrumentos</h2>
            <br/>
            <Tabs id="uncontrolled-tab-example">
              { 
                voices.map( voz => (
                  <Tab key={voz.id} eventKey={voz.id} title={voz.instrument}>
                    <br/>
                    <h3>{voz.instrument}</h3>
                    <Reproductor idVoz={voz.id}/>
                    <VisualizadorPDF idVoz={voz.id}/>
                  </Tab>
                ))
              }
            </Tabs>
          </div>

        </div>
  );
}

export default Instrumentos;
