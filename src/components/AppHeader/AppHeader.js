import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/base';
import { Menu } from './AppHeaderEstilo';

const AppHeader = () => {
  const a = 'b';

  return (
    <Container>
      <header>
        <Menu>
          <ul>
            <li>
              <Link to="/" style={{ color: '#cc0000' }}>
                Cadastro de Treinador
              </Link>
            </li>
            <li>
              <Link to="/pokedex" style={{ color: '#cc0000' }}>
                Pokédex (Listagem de Pokemons)
              </Link>
            </li>
            <li>
              <Link to="/treinadores" style={{ color: '#cc0000' }}>
                Centro de Treinadores (Listagem de Treinadores)
              </Link>
            </li>
          </ul>
        </Menu>
      </header>
    </Container>
  );
};

export default AppHeader;
