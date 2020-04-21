import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Navegacion from '../Navegacion/Navegacion'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import Home from '../Home/PaginaPrincipal/Home'
import Nosotros from '../Nosotros/Nosotros';
import Empezar from '../Empezar/Empezar';
import Instrumentros from '../Instrumentos/Instrumentos';
import BuscarProyectos from '../BuscarProyectos';
import Editar from '../EditorPartitura/EditorPartitura';
import MisProyectos from '../MisProyectos';

function App() {

  const Main = withRouter(({ location }) => {
    return (
        <div>
          { location.pathname !== '/login' && location.pathname !== '/signup' && <Navegacion/>}
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/nosotros" component={Nosotros}/>
              <Route exact path="/empezar" component={Empezar}/>
              <Route path="/instrumentos" component={Instrumentros}/>
              <Route path="/Editar" component={Editar}/>
              <Route path="/proyectos" component={BuscarProyectos}/>
              <Route path="/misproyectos" component={MisProyectos}/>
              <Route component={Home} />
            </Switch>
        </div>
    )
  })

  return (
    <Router>
      <div className="App">
        <Main/>
      </div>
    </Router>
  );
}

export default App;
