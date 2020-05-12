import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Navegacion.css';
import {logout} from '../../servicios/servicios-sesion'
import {getInfoUsuario,borrarNotificaciones} from '../../servicios/servicio-usuario'
import logo from '../../recursos/logo_horizontal_blanco.png'
import persona from '../../recursos/icono_usuario_miniatura.png'
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
        document.getElementById("linkEmpezar").style.visibility = "hidden";
        const access = sessionStorage.getItem('access');
        if(access !== null){
            setToken(access);
            solicitarNotificaciones();
            document.getElementById("linkEmpezar").style.visibility = "visible";
        }
      }, [solicitarNotificaciones] );

    function cerrarSesion () {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        history.push('/home');
        window.location.reload();
    }

    function borrarNotificacion () {
      if (token !== ""){
          borrarNotificaciones(token).then( respuesta => {
              if (respuesta.bandera === true){
                //if (respuesta.data.pending_notifications === false){
                    document.getElementById("notificacion").style.visibility = "hidden";
                    setColor('btn btn-primary');
                    setMostrar(false);
                //}
              }
              else{
                  alert(respuesta.data);
              }
          });
      }
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
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top color" style={{padding: 3}}>
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
                            <Link to="/nosotros" style={{ textDecoration: 'none' }}>
                            <li className="nav-item">
                                <span className="nav-link link">Nosotros</span>
                            </li>
                            </Link>
                            <Link to="/proyectos" style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <span className="nav-link link">Proyectos</span>
                                </li>
                            </Link>
                            <Link to="/empezar" style={{ textDecoration: 'none' }} id="linkEmpezar">
                                <li className="nav-item">
                                    <span className="nav-link link">Empezar</span>
                                </li>
                            </Link>
                        </ul>
                        {(username !== "") ? (
                            <div className="btn-group dropleft">
                                <button type="button" className="btn btn-light dropdown-toggle colorPersona" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="persona" src={persona} alt="persona" align="middle"/>
                                    <span>{" Mi cuenta "}</span>
                                </button>
                                <div className="dropdown-menu">
                                  <Link to="/misproyectos">
                                    <button className="dropdown-item" type="button">Mis Proyectos</button>
                                  </Link>
                                    <button className="dropdown-item" type="button" onClick={cerrarSesion}>Logout</button>
                                </div>

                                <button type="button" className={color} onClick={handleShow} id="notificacion">
                                    <i className="fas fa-bell"></i>
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button type="button" className="btn btn-light colorPersona" onClick={() => {history.push("/login")}}>
                                   <p><img className="persona" src={persona} alt="persona" align="middle"/> Iniciar sesión</p>
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
                    <Button variant="secondary" onClick={borrarNotificacion}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Navegacion;
