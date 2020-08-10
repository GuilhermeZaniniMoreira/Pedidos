import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Lista from './components/Pedidos/Lista';
import Formulario from './components/Pedidos/Formulario';

function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Pedidos</Link>
        </li>
        <li>
          <Link to="/novo">Novo Pedido</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Lista />
        </Route>
        <Route path="/novo">
          <Formulario />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
