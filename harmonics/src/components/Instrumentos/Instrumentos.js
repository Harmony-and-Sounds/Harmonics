import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap';

function Instrumentos(props) {
  return (
        <div className="Instrumentos">
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
  );
}

export default Instrumentos;
