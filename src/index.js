import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import CadastroPokemon from './screens/CadastroPokemon/CadastroPokemon';
import PaginaPokedex from './screens/PaginaPokedex/PaginaPokedex';
import CadastroUsuario from './screens/CadastroUsuario/CadastroUsuario';

const App = () => (
  <Switch>
    <Route exact path="/">
      <CadastroPokemon />
    </Route>
    <Route exact path="/cadastrar">
      <CadastroUsuario />
    </Route>
    <Route exact path="/pokedex">
      <PaginaPokedex />
    </Route>
  </Switch>
);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppHeader />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
