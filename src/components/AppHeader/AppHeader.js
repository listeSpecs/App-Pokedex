import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setAuthToken, verificarLogin } from '../../api/apiFactory';
import { Container } from '../../styles/base';
import { Menu } from './AppHeaderEstilo';

const AppHeader = () => {
  const [verificacaoLogin, setVerificacaoLogin] = useState(false);

  const history = useHistory('/');

  useEffect(() => {
    verificarLogin().then((data) => setVerificacaoLogin(data));
  }, []);

  const limparCadastro = async () => {
    await setAuthToken(null);
    setVerificacaoLogin(false);
    history.push('/');
  };

  return (
    <div style={{ backgroundColor: '#c00', borderBottom: '1px solid #fff' }}>
      <Container>
        <header>
          <Menu>
            <ul>
              <li>
                <Link to="/pokemon" style={{ color: '#fff' }}>
                  Cadastro de Pokemon
                </Link>
              </li>
              <li>
                <Link to="/" style={{ color: '#fff' }}>
                  Pokédex (Listagem de Pokemons)
                </Link>
              </li>
              <li>
                <Link to="/cadastrar" style={{ color: '#fff' }}>
                  Cadastro de Usuários
                </Link>
              </li>
              {!verificacaoLogin ? (
                <li>
                  <Link to="/login" style={{ color: '#fff' }}>
                    Entrar
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="#"
                    onClick={limparCadastro}
                    style={{ color: '#fff' }}
                  >
                    Sair
                  </Link>
                </li>
              )}
            </ul>
          </Menu>
        </header>
      </Container>
    </div>
  );
};

export default AppHeader;
