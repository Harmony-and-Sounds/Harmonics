import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Navegacion.css';
import {logout} from '../../servicios/servicios-sesion'
import logo from '../../recursos/output-onlinepngtools.png'


function Navegacion(){

    const [user, setUser] = useState('');

    const history = useHistory();

    useEffect(() => {
        const usuario = localStorage.getItem('sesion');
        if(usuario !== null){
            //let  useri = JSON.parse(usuario)
            setUser(" "+(JSON.parse(usuario)).name)
        }
      });

    async function cerrarSesion () {
        //Encriptar si se requiere
        const respuesta = await logout(user);
        if (respuesta[0].name==="Colombia"){
            localStorage.removeItem('sesion');
            /*var user = JSON.parse(localStorage.getItem('sesion')).name;
            console.log(user);*/
            history.push("/");
        }
        else{
            alert("Error cerrando sesion.");
        }
    }

    return (
    <div className="Navegacion">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{padding: 3}}>
                <Link to="/">
                    <span className="navbar-brand perso">
                        <img src={logo} className="logoPrincipal" alt="Harmonics"/>
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
                        {(user !== "") ? (
                            <div className="btn-group dropleft">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                    <span>{user}</span>
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" type="button">Mis Proyectos</button>
                                    <button className="dropdown-item" type="button" onClick={cerrarSesion}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="btn-group dropleft">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                    <span>{user}</span>
                                </button>
                                <div className="dropdown-menu">
                                    <Link to="/login">
                                        <button className="dropdown-item" type="button">LogIn</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="dropdown-item" type="button">SignUp</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navegacion;