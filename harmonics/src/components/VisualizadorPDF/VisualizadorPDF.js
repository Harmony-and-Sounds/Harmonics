//https://www.npmjs.com/package/mgr-pdf-viewer-react

import React, { useState, useEffect } from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import {getPDF} from '../../servicios/servicios-proyecto'
//import './Reproductor.css';

function VisualizadorPDF(props) {

    const [idVoz] = useState(props.idVoz);
    const [pdf, setPdf] = useState(null);


    function getPartitura () {
        const access = sessionStorage.getItem('access');
        if(access !== null){
            getPDF(access, idVoz).then(respuesta => {
                if (respuesta.bandera === true){
                    setPdf(respuesta.data);
                }
                else{
                    alert(respuesta.data);
                }
            });
        }
    }

    useEffect(() => {
        getPartitura();
      },[]);

  return (
        <div className="VisualizadorPDF">
            <div className="container">
                <div className="row">
                    <div className="col">
                        { pdf !== null &&
                            <PDFViewer document={{
                                url: pdf
                            }} 
                            scale = {1.5}/>
                        }
                    </div>
                </div>

            </div>
        </div>
  );
}

export default VisualizadorPDF;