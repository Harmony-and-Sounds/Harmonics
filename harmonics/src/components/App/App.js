import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Navegacion from '../Navegacion/Navegacion'
import Home from '../Home/PaginaPrincipal/Home'
import Nosotros from '../Nosotros/Nosotros';

function App() {
  return (
      <Router>
        <div className="App">
          <Navegacion/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/nosotros" component={Nosotros}/>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
