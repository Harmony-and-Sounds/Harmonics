import React, { useState } from 'react';
import './SignUp.css';
import fotoUsuario from '../../recursos/userFace.png'
import logo from '../../recursos/output-onlinepngtools.png'
import {login} from '../../servicios/servicios-sesion'
import { useHistory, Link } from "react-router-dom";

function SignUp() {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    function validarEmail(){
        if (email!==""){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(re.test(String(email).toLowerCase()));
            return re.test(String(email).toLowerCase());
        }
        return false;
    }

    async function realizarPerticion () {
        //Encriptar si se requiere

        if (userName !== "" && password !== "" && validarEmail()){
            const respuesta = await login(userName,password);
            if (respuesta[0].name==="Colombia"){
                localStorage.setItem('sesion', JSON.stringify(respuesta[0]))
                /*var user = JSON.parse(localStorage.getItem('sesion')).name;
                console.log(user);*/
                alert("Usuario creado correctamente.");
                history.push("/");
            }
            else{
                alert("Error creando el usuario");
                setUserName("");
                setPassword("");
                setEmail("");
            }
        }
        else{
            alert("Los campos no han sido llenados correctamente.")
        }
    }

    return (
        <div className="SignUp">
            <div className="container-fluid a">
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section a">
                        <div className = "modal-content over">
                            <div className="col-12 user-img over">
                                <img src={fotoUsuario} className="logo" alt="fotoUsuario"/>
                            </div>
                            <img src={logo} className="logo" alt="Logo"/>
                            <div className="col-12 form-input over">
                                <form>
                                    <div className="form-group over email">
                                        <input type="email" className="form-control over" placeholder="Ingrese el correo" value={email} onChange={e => setEmail(e.target.value)} required/>
                                    </div>
                                    <div className="form-group over">
                                        <input type="text" className="form-control over" placeholder="Ingrese el usuario" value={userName} onChange={e => setUserName(e.target.value)} required/>
                                    </div>
                                    <div className="form-group over">
                                        <input type="password" className="form-control over" placeholder="Ingrese la contraseña" value={password} onChange={e => setPassword(e.target.value)} required/>
                                    </div>
                                    <button type="button" className="btn btn-success over" onClick={realizarPerticion}>Registrarse</button>
                                </form>
                            </div>
                            <div className="col-12 forgot over">
                                <Link to="/login">
                                    <span>Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;