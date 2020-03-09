import React, { useState, useEffect } from 'react';
import './Login.css';
import fotoUsuario from '../../recursos/userFace.png'
import logo from '../../recursos/harm-removebg-preview.png'
import {login} from '../../servicios/servicios-sesion'
import { useHistory, Link } from "react-router-dom";

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function realizarPerticion () {
        //Encriptar si se requiere
        if (userName !== "" && password !== ""){
            const respuesta = await login(userName,password);
            if (respuesta[0].name==="Colombia"){
                localStorage.setItem('sesion', JSON.stringify(respuesta[0]))
                /*var user = JSON.parse(localStorage.getItem('sesion')).name;
                console.log(user);*/
                history.push("/");
            }
            else{
                alert("El nombre de usuario o la contrsaeña no son correctos.")
                setUserName("");
                setPassword("");
            }
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
                                <img src={fotoUsuario} className="logo"/>
                            </div>
                            <img src={logo} className="logo"/>
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