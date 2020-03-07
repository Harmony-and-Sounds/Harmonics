import React, {useMemo,useState,useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import Multiselect from 'react-widgets/lib/Multiselect'
import {Link} from 'react-router-dom'
import 'react-widgets/dist/css/react-widgets.css';
import './Empezar.css';
import {obtenerDatos} from '../../servicios/servicios'

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

  const [value, setValue] = useState([]);
  const [archivo, setArchivo] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => (
      getBase64(file)
  ));
  }, [])

  const {acceptedFiles, rejectedFiles, getRootProps, getInputProps,  isDragActive, isDragAccept, isDragReject} = useDropzone({
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
    isDragReject
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

   const valid = () => {
    if (archivo !=null && value.lenght > 0){
      return true;
    }
    else {
      return false;
    }
  }

  return (

    <div className="container-fluid vertical-center">
        <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside>
                    <h4>Accepted files</h4>
                    <ul>
                    {acceptedFilesItems}
                    </ul>
                </aside>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
              <h4>Basic multi-select</h4>
              <Multiselect
                data={instrumentos}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
        </div>
        <div className="flex-row">
          <Link to="/instrumentos">
            <button className="btn btn-success justify-content-center" disabled = {(archivo === null || value.length == 0)? true : false} onClick={obtenerDatos.bind(value, archivo)} >
              Realizar serparacion
            </button>
          </Link>
        </div>
        <PopUp/>
    </div>
  );
}



export default Empezar;
