import styled from 'styled-components';
import { espacamento } from '../../styles/constants/sizes';

export const Menu = styled.nav`
  padding-top: ${espacamento.pequeno}px;
  padding-bottom: ${espacamento.extraGrande}px;

  ul {
    display: flex;
    justify-content: space-around;

    li {
      list-style: none;
    }
  }

  
`;
