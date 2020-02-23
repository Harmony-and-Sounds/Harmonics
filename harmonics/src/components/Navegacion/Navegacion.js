import React, { Component } from 'react'
import './Navegacion.css';

class Navegacion extends Component {
    render(){
        return (
        <div className="Navegacion">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">
                    <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Harmonics"/>
                </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="container">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Empezar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navegacion;