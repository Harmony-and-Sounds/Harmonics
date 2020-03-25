import React, {useMemo,useState,useCallback,useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import Multiselect from 'react-widgets/lib/Multiselect'
import { useHistory } from 'react-router-dom'
import 'react-widgets/dist/css/react-widgets.css';
import './Empezar.css';
import {crearProyecto} from '../../servicios/servicios-proyecto'
import logo from '../../recursos/output-onlinepngtools.png'
import { Button, Modal } from 'react-bootstrap';

let instrumentos = ['Guitarra', 'Charango', 'Flauta', 'Bateria', 'Voz'];

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

  useEffect(() => {
    const access = localStorage.getItem('access');
    if(access !== null){
        setToken(access);
    }
  });


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
    accept: 'audio/mp3', //audio/mp3
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

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
      var data = reader.result;
      setArchivo(data);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 function crearProy () {
  //Encriptar si se requiere
  if (archivo !== null && value.length !== 0 && nombreProy !== ""){

      crearProyecto(token, nombreProy, archivo, value).then( respuesta => {
        if (respuesta.bandera === true){
          setMostrar(true);
        }
        else{
            alert(respuesta.data);
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
    <img src={logo} alt="Harmonics" className="logoEmpezar"/>
    <div className="fila">
      <div className="columna_centrada">
        <h4>Nombre del proyecto</h4>
        <input type="text" className="form-control over" placeholder="Ingrese el nombre del proyecto" value={nombreProy} onChange={e => setNombreProy(e.target.value)} required/>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop la cancion de musica andina que desa separar.</p>
          <em>(Solo archivos .mp3 seran permitidos.)</em>
        </div>
        <aside>
          <h4>Archivos aceptados</h4>
          <ul>
          {acceptedFilesItems}
          </ul>
        </aside>
      </div>
      <div className="col-sm-6 col-md-6 col-lg-6">
        <h4>Instrumentos</h4>
        <Multiselect data={instrumentos} value={value} onChange={(value) => setValue(value)}/>
      </div>
    </div>
    <div className="flex-row">
      <button className="btn btn-success justify-content-center" onClick={crearProy}>Realizar serparacion </button>
    </div>

    <Modal show={mostrar} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha creado la solicitud de forma exitosa, se le notificara cuando su proceso alla sido completado.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={volverHome}>
            Volver a la pantalla principal
          </Button>
        </Modal.Footer>
    </Modal>
  </div>
  );
}



export default Empezar;
