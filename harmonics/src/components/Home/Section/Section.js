import React, { Component } from 'react'
import './cssSection.scss';
import WaveBackground from "../../WaveBackground"

class Section extends Component {

    render(){
        return (
            <div className="Section">
                <section id="hero">
                  <WaveBackground />
                    <div className="h-text text-light">
                        <h1>Harmonics</h1>
                        <h5>
                        ¡Bienvenido(s)! Aquí en Harmonics, cualquier persona que este interesada en tener acceso a más recursos para su aprendizaje en el campo de la música encontrará una herramienta apropiada. El único requisito es saber cómo leer una partitura. Así, puede cargar sus propias canciones para generar una pseudo-partitura de cada instrumento en ella que desee, con la cual pueda practicar, e incluso apoyar a la creciente comunidad.
                        </h5>
                    </div>
                </section>
            </div>
        )
    }
}

export default Section;
