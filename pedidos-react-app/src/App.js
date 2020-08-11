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
import Pedido from './components/Pedidos/Pedido/Lista';

function App() {
  return (
    <Router>
    <div className="lista-pedidos">
      <ul>
        <li>
          <Link to="/" style={{ textDecoration: 'none'}}>Pedidos</Link>
        </li>
        <li>
          <Link to="/novo" style={{ textDecoration: 'none'}}>Novo Pedido</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Lista />
        </Route>
        <Route path="/novo">
          <Formulario />
        </Route>
        <Route path="/pedido/:id">
          <Pedido />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
