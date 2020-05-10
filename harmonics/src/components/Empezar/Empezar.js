import React, {useMemo,useState,useCallback,useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
//import Multiselect from 'react-widgets/lib/Multiselect'
import { useHistory } from 'react-router-dom'
//import 'react-widgets/dist/css/react-widgets.css';
import './Empezar.css';
import {crearProyecto} from '../../servicios/servicios-proyecto'
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import { Dropdown } from 'semantic-ui-react'

import SeleccionarArchivo from '../../recursos/PU_SeleccionarArchivo.png'
import ElegirInstrumentos from '../../recursos/PU_ElegirInstrumentos.png'
import RealizarSeparacion from '../../recursos/PU_RealizarSeparacion.png'
import MisProyectos from '../../recursos/PU_MisProyectos.png'

import 'semantic-ui-css/components/reset.min.css';
//import 'semantic-ui-css/components/transition.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/list.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/item.min.css';

const instrumentos = [
  { key: 'vocals', text: 'Voces', value: 'vocals' },
  { key: 'piano', text: 'Piano', value: 'piano' },
  { key: 'drums', text: 'Percuciones', value: 'drums' },
  { key: 'bass', text: 'Bajo', value: 'bass' },
  { key: 'other', text: 'Otros', value: 'other' },
];

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const activeStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

function Empezar(props) {

  const [token, setToken] = useState('');
  const [value, setValue] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [nombreProy, setNombreProy] = useState('');
  const [mostrar,setMostrar] = useState(false);
  const [mostrarAyuda,setMostrarAyuda] = useState(false);

  useEffect(() => {
    const access = sessionStorage.getItem('access');
    if(access !== null){
        setToken(access);
    }
  }, []);

  const handleCloseAyuda = () => setMostrarAyuda(false);
  const handleClose = () => setMostrar(false);

  const history = useHistory();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => (
      setArchivo(file)
      //getBase64(file)
  ));
  }, []);

  const {acceptedFiles, getRootProps, getInputProps,  isDragActive, isDragAccept, isDragReject} = useDropzone({
    accept: 'audio/mpeg', //audio/mp3
    multiple: false,
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

 function crearProy () {
  //Encriptar si se requiere
  if (archivo !== null && value.length !== 0 && nombreProy !== ""){
      crearProyecto(token, nombreProy, archivo, value).then( respuesta => {
        if (respuesta.bandera === true){
          setMostrar(true);
        }
        else{
            alert("Debes tener una sesión activa para poder usar este servicio");
            setValue([]);
            setArchivo(null);
            setNombreProy("");
        }
      });
  }
  else{
      alert("Los campos no han sido llenados correctamente.")
  }
}

function volverHome (){
  history.push("/");
}

return (
  <div className="container-fluid vertical-center">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/components/transition.min.css" />
    <div className="fila">
      <div className="columna_centrada">
        <h1>Nombre del proyecto</h1>
        <input type="text" className="form-control over" placeholder="Ingrese el nombre del proyecto" value={nombreProy} onChange={e => setNombreProy(e.target.value)} required/>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
        <h1>Canción</h1>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop</p>
          <p>La canción de musica andina que desea separar.</p>
          <em>(Solo un archivo .mp3 sera permitido.)</em>
        </div>
        <aside>
          {archivo !== null && <h4>Archivos aceptados</h4>}
          {acceptedFilesItems}
        </aside>
      </div>
      <div className="col-sm-6 col-md-6 col-lg-6">
        <h1>Instrumentos</h1>
        <Dropdown placeholder="Seleccione los instrumentos que tiene la canción ..." fluid multiple selection options={instrumentos} onChange={(event, data) => setValue(data.value)}/>
      </div>
    </div>
    <div className="flex-row">
      <br/>
      <button className="btn btn-success justify-content-center" onClick={crearProy}>Realizar separación </button>
      <button className="btn btn-warning justify-content-center" onClick={() => {setMostrarAyuda(true)}}><i className="fas fa-question-circle"></i></button>
    </div>

    <Modal show={mostrar} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha creado la solicitud de forma exitosa, se le notificara cuando su proceso alla sido completado.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={volverHome}>
            Volver a la pantalla principal
          </Button>
        </Modal.Footer>
    </Modal>



    <Modal show={mostrarAyuda} onHide={handleCloseAyuda} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Ayuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel>
          <Carousel.Item>
            <img
              className="imageCarousel"
              src={SeleccionarArchivo}
              alt="First slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="imageCarousel"
              src={ElegirInstrumentos}
              alt="Second slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="imageCarousel"
              src={RealizarSeparacion}
              alt="Third slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="imageCarousel"
              src={MisProyectos}
              alt="fourth slide"
            />

          </Carousel.Item>
        </Carousel>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
  </div>
  );
}



export default Empezar;
