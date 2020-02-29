import React, {useMemo,useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import './Empezar.css';

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
  const {acceptedFiles, rejectedFiles, getRootProps, getInputProps,  isDragActive, isDragAccept, isDragReject} = useDropzone({
    accept: 'audio/mp3', //audio/mp3
    multiple: false
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

  const [value, setValue] = useState([]);

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
    </div>
  );
}



export default Empezar;