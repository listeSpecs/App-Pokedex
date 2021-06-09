import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/base';
import { Menu } from './AppHeaderEstilo';

const AppHeader = () => {
  const a = 'b';

  return (
    <div style={{ backgroundColor: '#c00', borderBottom: '1px solid #fff' }}>
      <Container>
        <header>
          <Menu>
            <ul>
              <li>
                <Link to="/" style={{ color: '#fff' }}>
                  Cadastro de Pokemon
                </Link>
              </li>
              <li>
                <Link to="/pokedex" style={{ color: '#fff' }}>
                  Pokédex (Listagem de Pokemons)
                </Link>
              </li>
              <li>
                <Link to="/cadastrar" style={{ color: '#fff' }}>
                  Cadastro de Usuários
                </Link>
              </li>
            </ul>
          </Menu>
        </header>
      </Container>
    </div>
  );
};

export default AppHeader;
