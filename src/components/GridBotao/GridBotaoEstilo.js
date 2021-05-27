import styled from 'styled-components';
import { cinza } from '../../styles/constants/colors';
import { borderRadius, espacamento } from '../../styles/constants/sizes';

export const PokemonBotao = styled.button`
  padding: ${espacamento.pequeno}px;
  color: inherit;
  height: 12em;
  font: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  flex-basis: 50% / 2 - ${espacamento.medio}px;
  border-radius: ${borderRadius}px;
  line-height: 1.4;
  outline: none;
  cursor: pointer;

  div {
    display: flex;
    flex: 1;
    align-items: flex-end;
  }

  p {
    padding-top: 2%;
    text-align: center;
    margin: 0;
    min-height: 40px;
    font-weight: 500;
    flex: 1;
    flex-shrink: 2;
  }

  :hover, :active, :focus {
    text-decoration: none;
    border: 1px solid #000;
  }
`;
