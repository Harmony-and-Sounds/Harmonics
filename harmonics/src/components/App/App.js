import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Navegacion from '../Navegacion/Navegacion'
import Home from '../Home/PaginaPrincipal/Home'
import Nosotros from '../Nosotros/Nosotros';
import Empezar from '../Empezar/Empezar';
import Instrumentros from '../Instrumentos/Instrumentos';

function App() {
  return (
      <Router>
        <div className="App">
          <Navegacion/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/nosotros" component={Nosotros}/>
              <Route exact path="/empezar" component={Empezar}/>
              <Route path="/instrumentos" component={Instrumentros}/>
              <Route component={Home} />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
