import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';
//import ReproductorMidi from '../ReproductorMidi/ReproductorMidi';
import Reproductor from '../Reproductor/Reproductor';
import VisualizadorPDF from '../VisualizadorPDF/VisualizadorPDF';
import './Instrumentos.css';

function Instrumentos(props) {

  const [usuario, setUsuario] = useState(props.usuario);
  const [nomProyecto, setNomProyecto] = useState(props.nomProyecto);
  const [instrumentos, setInstrumentos] = useState(props.instrumentos);

  return (
        <div className="Instrumentos">
          <div className="fluid-container correcion">
            <h2>Instrumentos</h2>
            <br/>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <br/>
                <h3>Instrumento</h3>
                <Reproductor usuario={null} nomProyecto={null} instrumento={null}/>
                <VisualizadorPDF usuario={null} nomProyecto={null} instrumento={null}/>
              </Tab>
              <Tab eventKey="PRUEBA" title="PRUEBA">
                <h1>hola</h1>
              </Tab>
            </Tabs>
          </div>

        </div>
  );
}

export default Instrumentos;
