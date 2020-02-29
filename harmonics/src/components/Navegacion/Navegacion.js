import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navegacion.css';

class Navegacion extends Component {
    render(){
        return (
        <div className="Navegacion">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <Link to="/">
                        <span className="navbar-brand">
                            <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Harmonics"/>
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="container">
                            <ul className="navbar-nav mr-auto">
                                <Link to="/nosotros">
                                <li className="nav-item">
                                    <span className="nav-link">Nosotros</span>
                                </li>
                                </Link>
                                <Link to="/empezar">
                                    <li className="nav-item">
                                        <span className="nav-link">Empezar</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navegacion;