import React, { Component } from 'react'
import Section from '../Section/Section'
import './Home.css';
class Home extends Component {

    render(){
        return (
            <div className="Home">
                <Section/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <img className="img-responsive center" src="https://www.afandaluzas.org/wp-content/uploads/2017/07/grupo-multietnico-de-hombres-jovenes-y-de-mujeres-que-estudian-adentro_1139-989.jpg" alt="Girl in a jacket"/>
                        </div>
                        <div className="col my-auto">
                            <section className="example">
                                <p>
                                La plataforma Harmonics le permite a sus usuarios, una vez se hayan registrado, generar una pseudo-partitura, en formato .pdf, a partir de cada instrumento que seleccionen de una canción en formato .mp3. Tan sólo es necesario entrar en la sección de "Empezar" y cargar la canción que deseen, para aislar la pista que necesite de entre: voz, piano, percusión, charango, quena y guitarra.
                                </p>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-auto">
                            <section className="example">
                                <p>
                                Una de las metas de Harmonics es apoyar en el aprendizaje de las personas, y expandir la práctica de canciones de la música andina colombiana. Con tal fin, ¡amablemente solicitamos su ayuda! Entre más utilicen la plataforma, más material estará disponible para todo visitante de la plataforma.
                                </p>
                            </section>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <img className="img-fluid center" src="https://www.afandaluzas.org/wp-content/uploads/2017/07/grupo-multietnico-de-hombres-jovenes-y-de-mujeres-que-estudian-adentro_1139-989.jpg" alt="Girl in a jacket"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <img className="img-responsive center" src="https://www.afandaluzas.org/wp-content/uploads/2017/07/grupo-multietnico-de-hombres-jovenes-y-de-mujeres-que-estudian-adentro_1139-989.jpg" alt="Girl in a jacket"/>
                        </div>
                        <div className="col my-auto">
                            <section className="example">
                                <p>
                                Podrá encontrar las distintas pseudo-partituras generadas por los usuarios en la sección "Proyectos." Una vez allí, podrá buscar por el instrumento que desee, o el mismo nombre de la canción; si ésta no aparece, ¡entonces puede tomar la iniciativa y agregarla! De esta manera, podemos construir una librería de pseudo-partituras en conjunto.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
