import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import carpetaIcon from "./carpeta.png"
import { useHistory } from 'react-router-dom'
import "./ProyectoItem.css"
import Paginacion from '../Paginacion';



function ProyectoItem({data}) {

  const id = data.id;
  const name = data.name;
  const voices = data.voices;

  const history = useHistory();

  function sayHello(id) {
    alert(id);
  }
  function goToInstruments ({id},{name},{voices}){
    history.push("/instrumentos", {usuario:id ,nomProyecto:name,instrumentos:voices });
  }

  return (
  <div className="responsive">
    <div className="gallery" onClick={() => goToInstruments({id},{name},{voices})} >
        <img src={carpetaIcon} alt="Carpeta" width="600" height="400" />
     <div className="desc">{name}</div>
    </div>
  </div>

  );
}

export default ProyectoItem;
