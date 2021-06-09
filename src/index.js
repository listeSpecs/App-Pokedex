/* eslint-disable react/prop-types */
import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import Botao from './components/Botao/Botao';
import CadastroPokemon from './screens/CadastroPokemon/CadastroPokemon';
import CadastroUsuario from './screens/CadastroUsuario/CadastroUsuario';
import PaginaPokedex from './screens/PaginaPokedex/PaginaPokedex';
import { Linha, NotificacaoErro, NotificacaoSucesso } from './styles/base';

const App = () => {
  const alertOptions = {
    position: positions.BOTTOM_RIGHT,
    transition: transitions.FADE,
  };

  const AlertTemplate = ({
    style, message, close, options,
  }) => (
    <div style={style}>
      {options.type === 'info' && (
        <NotificacaoSucesso>
          <Linha style={{ justifyContent: 'flex-end' }}>
            <Botao fechar onClick={close} />
          </Linha>
          <h4>Sucesso</h4>
          <p>
            Dados gravados com sucesso.
            <br />
            {message}
          </p>
        </NotificacaoSucesso>
      )}
      {options.type === 'success' && (
        <NotificacaoSucesso>
          <Linha style={{ justifyContent: 'flex-end' }}>
            <Botao fechar onClick={close} />
          </Linha>
          <h4>Sucesso</h4>
          <p>{message}</p>
        </NotificacaoSucesso>
      )}
      {options.type === 'error' && (
        <NotificacaoErro>
          <Linha style={{ justifyContent: 'flex-end' }}>
            <Botao fechar onClick={close} />
          </Linha>
          <h4>Atenção</h4>
          <p>{message}</p>
        </NotificacaoErro>
      )}
    </div>
  );

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
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
    </AlertProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppHeader />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
