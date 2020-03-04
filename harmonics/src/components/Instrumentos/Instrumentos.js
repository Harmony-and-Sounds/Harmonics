import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';
import { useEffect } from 'react';
import "./Instrumentos.css"
import LoaderManager from "../Loader";


class Instrumentos extends React.Component {

  constructor(){
       super();
       this.state = {
           showing : true
       }
   }


 render() {
const { showing } = this.state;
  return (

    <div className="Instrumentos">
      <div className="row">
        <div className="col">
            <h2>Instrumentos</h2>
            <br/>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <p>a</p>
              </Tab>
              <Tab eventKey="profile" title="Profile">
                <p>a</p>
              </Tab>
              <Tab eventKey="contact" title="Contact">
                <p>a</p>
              </Tab>
            </Tabs>
            </div>

            <button className ="my-button" onClick={() => this.setState({ showing: !showing })}>toggle</button>
            <LoaderManager state = {showing}/>


    </div>
  </div>

  );
}
}

export default Instrumentos;
