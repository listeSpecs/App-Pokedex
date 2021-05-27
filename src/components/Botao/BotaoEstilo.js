import styled from 'styled-components';
import { espacamento } from '../../styles/constants/sizes';

export const BotaoForm = styled.button`
  border-radius: 4px;
  padding: ${espacamento.pequeno}px ${espacamento.medio}px;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  color: #fff;
  background-color: #cc0000;
  font-size: .92em;

  :hover {
    background-color: #800000;
  }
`;
