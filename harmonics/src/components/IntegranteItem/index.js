import React from 'react';
import { useHistory } from "react-router-dom"
import "./IntegranteItem.css"
import gitLogo from "../../recursos/gitlogo.png"
import emailLogo from "../../recursos/EmailIcon.png"



function integranteItem({src,nombre,email,git}) {


  return (
  <div className="integranteItemContainer">
        <img className="integranteImg"  src={src} alt="integrante" />
        <p></p>
        <div className="nombreIntegrante">
          <p>{nombre}</p>
        </div>
        <p><img src={emailLogo} alt="icon1" width="25" height="20" align="middle"></img> {email}</p>
        <p><img src={gitLogo} alt="icon2" width="20" height="20" align="middle"></img> {git}</p>
  </div>

  );
}

export default integranteItem;
