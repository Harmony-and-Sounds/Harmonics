import React, { Component } from 'react'
import './Nosotros.css';
import background from "../../recursos/background-partitura.jpg"
import Juanito from "../../recursos/Juanito.jpg"
import Randy from "../../recursos/Randy.jpeg"
import Felipe from "../../recursos/Felipe.jpeg"
import Sebastian from "../../recursos/Sebastian.jpeg"
import Andrea from "../../recursos/Andrea.png"
import Pavlich from "../../recursos/Pavlich.jpeg"

import IntegranteItem from "../IntegranteItem"




class Nosotros extends Component {

    render(){
        return (
          <>
          <div className="container-nosotros">
            <div className="image-nosotros">
              <img className = "imgPartitura" src={background} alt="background" ></img>
              <div className="bg-text">
                <h1>Harmony and Sounds</h1>
                <p>El grupo detrás de la creación de Harmonics, Harmony & Sounds, está conformado por estudiantes de pregrado de Ingeniería de Sistemas de la Pontificia Universidad Javeriana. El grupo posee conocimientos sobre planeación de proyectos, diseño arquitectónico, desarrollo y despliegue web, programación en python, desarrollo por medio de React y aplicación de Machine Learning para llevar este proyecto a cabo. </p>
              </div>
              <p></p>
            </div>
            <div className="TituloIntegrantes"><h2>Integrantes</h2></div>
            <IntegranteItem className="team-mate1" nombre="Randy Darrell Lancheros" src={Randy} email="randy.lancheros@javeriana.edu.co" git="RandyDpoe45" />
            <IntegranteItem className="team-mate2" nombre="Juan Felipe Castañeda" src={Juanito} email="castaneda_j@javeriana.edu.co" git="Castjuanito"/>
            <IntegranteItem className="team-mate3" nombre="Felipe Andres Gutirriez" src={Felipe} email="felipe_gutierrez@javeriana.edu.co" git="FelipeAndrGut"/>
            <IntegranteItem className="team-mate4" nombre="Juan Sebastian Triana" src={Sebastian} email="juan_triana@javeriana.edu.co" git="SebastianTrianaP"/>
          </div>
          <div className="container-aux">
            <div className="TituloDirectora"><h2>Directora</h2></div>
            <div className="TituloAsesor"><h2>Asesor</h2></div>
            <IntegranteItem className="Directora" nombre="Andrea del Pilar Rueda" src={Andrea} email="rueda-andrea@javeriana.edu.co" git="andrea-rueda"/>
            <IntegranteItem className="Asesor" nombre="Jaime Andres Pavlich" src={Pavlich} email="jpavlich@javeriana.edu.co" git="jpavlich"/>
          </div>
          </>
        )
    }
}

export default Nosotros;
