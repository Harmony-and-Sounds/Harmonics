import React, { useState } from 'react';
import './Login.css';
import fotoUsuario from '../../recursos/icono_usuario.png'
import logo from '../../recursos/Logo_texto_negro.png'
import {login} from '../../servicios/servicios-sesion'
import { useHistory, Link } from "react-router-dom";

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    function realizarPerticion () {
        //Encriptar si se requiere
        if (userName !== "" && password !== ""){
            login(userName,password).then(respuesta => {
                if (respuesta.bandera === true){
                    localStorage.setItem('access', respuesta.data.access);
                    localStorage.setItem('refresh', respuesta.data.refresh);
                    history.push("/");
                }
                else{
                    alert(respuesta.data)
                    setUserName("");
                    setPassword("");
                }
            });
        }
        else{
            alert("Los campos no han sido llenados correctamente.")
        }
    }

    return (
        <div className="Login">
            <div className="container-fluid over">
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section over">
                        <div className = "modal-content over">
                            <div className="col-12 user-img over">
                                <img src={fotoUsuario} className="logo" alt="fotoUsuario"/>
                            </div>
                            <img src={logo} className="logo" alt="Logo"/>
                            <div className="col-12 form-input over">
                                <form>
                                    <div className="form-group over">
                                        <input type="text" className="form-control over" placeholder="Ingrese el usuario" value={userName} onChange={e => setUserName(e.target.value)} required/>
                                    </div>
                                    <div className="form-group over">
                                        <input type="password" className="form-control over" placeholder="Ingrese la contraseña" value={password} onChange={e => setPassword(e.target.value)} required/>
                                    </div>
                                    <button type="button" className="btn btn-success over" onClick={realizarPerticion}>Login</button>
                                </form>
                            </div>
                            <div className="col-12 forgot over">
                                <Link to="/signup">
                                    <span>Registrarse</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;