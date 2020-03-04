import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./loader.css"
import loader from "./loader.svg"


function Loader (props){
  return (
        <div id="loader-wrapper">
            <img id="loader" src={loader} ></img>
        </div>
  );
}


  const LoaderManager = ({state}) => {


      console.log(state);

      return (
          <div>
              { state
                  ? <Loader/>
                  : null
              }
          </div>
      )
}

  export default LoaderManager;
