import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Navegacion.css';
import {logout} from '../../servicios/servicios-sesion'
import {getInfoUsuario} from '../../servicios/servicio-usuario'
import logo from '../../recursos/output-onlinepngtools.png'
import { Button, Modal } from 'react-bootstrap';


function Navegacion(){

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [color, setColor] = useState('btn btn-secondary');
    const [mostrar,setMostrar] = useState(false);

    const handleClose = () => setMostrar(false);
    const handleShow = () => setMostrar(true);

    const history = useHistory();

    useEffect(() => {
        document.getElementById("notificacion").style.visibility = "hidden";
        const access = localStorage.getItem('access');
        if(access !== null){
            setToken(access);
            solicitarNotificaciones();
        }
      }, [solicitarNotificaciones] );

    function cerrarSesion () {
        /*const respuesta = await logout(user);
        if (respuesta[0].name==="Colombia"){
            localStorage.removeItem('access');
            /*var user = JSON.parse(localStorage.getItem('sesion')).name;
            console.log(user);
            history.push("/");
        }
        else{
            alert("Error cerrando sesion.");
        }*/
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.reload();
    }


    function solicitarNotificaciones () {
        if (token !== ""){
            getInfoUsuario(token).then( respuesta => {
                if (respuesta.bandera === true){
                    setUsername(" "+respuesta.data.user.username);
                    if (respuesta.data.pending_notifications === true){
                        document.getElementById("notificacion").style.visibility = "visible";
                        setColor('btn btn-primary');
                    }
                }
                else{
                    alert(respuesta.data);
                }
            });
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
                        {(username !== "") ? (
                            <div className="btn-group dropleft">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                    <span>{username}</span>
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" type="button">Mis Proyectos</button>
                                    <button className="dropdown-item" type="button" onClick={cerrarSesion}>Logout</button>
                                </div>

                                <button type="button" className={color} onClick={handleShow} id="notificacion"> 
                                    <i className="fas fa-bell"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="btn-group dropleft">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <Link to="/login">
                                        <button className="dropdown-item" type="button">LogIn</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="dropdown-item" type="button">SignUp</button>
                                    </Link>
                                </div>
                                
                                <button type="button" className={color} onClick={handleShow} id="notificacion"> 
                                    <i className="fas fa-bell"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <Modal show={mostrar} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Notificaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>El proceso de uno o mas proyectos ya ha finalizado.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" /*onClick={volverHome}*/>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Navegacion;