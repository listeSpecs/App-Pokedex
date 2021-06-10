import styled from 'styled-components';
import DropImg from '../assets/icones/drop.png';
import { cinza } from './constants/colors';
import { borderRadius, espacamento } from './constants/sizes';

/* LAYOUT */

export const AppBody = styled.div`
  padding-top: ${espacamento.pequeno}px;
  padding-bottom: ${espacamento.extraGrande}px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Centro = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 5% auto;
  padding: ${espacamento.pequeno}px;
  flex-direction: column;
`;

export const Linha = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Coluna = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divisor = styled.div`
  margin-bottom: ${({ border, size }) => (border && espacamento[size] ? espacamento[size] : espacamento.extraPequeno)}px;
  padding-bottom: ${({ size }) => (size && espacamento[size] ? espacamento[size] : espacamento.extraPequeno)}px;
  border: 0 solid ${cinza.claro};
  border-bottom-width: ${({ border }) => (border ? 1 : 0)}px;
`;

/* FONTES */

export const Alerta = styled.span`
  color: #c00;
`;

/* BOTÕES */

export const BotaoNude = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  outline: none;
  align-self: center;
`;

/* NOTIFICAÇÃO */

export const NotificacaoSucesso = styled.div`
  color: #6d9e64;
  background-color: #d4fecc;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.3);
  padding: ${espacamento.pequeno}px ${espacamento.pequeno}px;
  border-radius: 4px;
  margin-bottom: ${espacamento.extraPequeno}px;
  width: 20em;
  max-width: 100%;

  h4 {
    margin-top: 0;
    font-weight: 600;
    font-size: 1.3em;
  }
`;

export const NotificacaoErro = styled.div`
  color: #622428;
  background-color: #ffd3d4;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.3);
  padding: ${espacamento.pequeno}px ${espacamento.pequeno}px;
  border-radius: 4px;
  margin-bottom: ${espacamento.extraPequeno}px;
  width: 20em;
  max-width: 100%;

  h4 {
    margin-top: 0;
    font-weight: 600;
    font-size: 1.3em;
  }
`;

export const NotificacaoInfo = styled.div`
  background-color: #fff;
  color: #000;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.3);
  padding: ${espacamento.pequeno}px ${espacamento.pequeno}px;
  border-radius: 4px;
  margin-bottom: ${espacamento.extraPequeno}px;
  width: 20em;
  max-width: 100%;

  h4 {
    margin-top: 0;
    font-weight: 600;
    font-size: 1.3em;
  }
`;

/* FORMULÁRIO */

export const CampoForm = styled.input`
  flex: 1;
  letter-spacing: 1px;
  font: inherit;
  padding: ${espacamento.extraPequeno}px;
  border: 1px solid ${cinza.claro};
  border-radius: ${borderRadius}px;
  transition: .2s ease-in-out;
  backface-visibility: hidden;
  outline: none;
  box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;

  :focus {
    border-color: #cc0000;
    box-shadow: 0 2px 10px 0 rgba(204, 0, 0, 0.5);
  }
`;

export const SelectForm = styled.select`
  flex: 1;
  letter-spacing: 1px;
  font: inherit;
  padding: ${espacamento.extraPequeno}px;
  padding-right: ${espacamento.medio}px;
  border: 1px solid ${cinza.claro};
  border-radius: ${borderRadius}px;
  background: url(${DropImg}) no-repeat 98%;
  background-color: #fff;
  background-size: 13px;
  width: 100%;
  transition: .2s ease-in-out;
  backface-visibility: hidden;
  outline: none;
  box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  appearance: none;

  :focus {
    border-color: #cc0000;
    box-shadow: 0 2px 10px 0 rgba(204, 0, 0, 0.5);
  }
`;

export const ArquivoForm = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: ${espacamento.extraPequeno}px;
  border: 1px solid #ddd;
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  transition: .2s ease-in-out;
  outline: none;

  :hover {
    border-color: #cc0000;
    box-shadow: 0 2px 10px 0 rgba(204, 0, 0, 0.5);
  }
`;

export const AreaForm = styled.textarea`
  flex: 1;
  letter-spacing: 1px;
  font: inherit;
  padding: ${espacamento.extraPequeno}px;
  border: 1px solid ${cinza.claro};
  border-radius: ${borderRadius}px;
  resize: vertical;
  width: 100%;
  height: 145px;
  transition: .2s ease-in-out;
  backface-visibility: hidden;
  outline: none;
  box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;

  :focus {
    border-color: #cc0000;
    box-shadow: 0 2px 10px 0 rgba(204, 0, 0, 0.5);
  }
`;

export const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

/* GRID LAYOUT */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: ${espacamento.medio}px;

  @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 300px) {
    grid-template-columns: 1fr;
  }

`;

/* MODAL */

export const ContainerJanela = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  margin: auto;
  background-color: rgba(0, 0, 0, .3);
  animation: fade-in .3s ease-in-out forwards;
`;

export const Janela = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  padding: ${espacamento.medio}px;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 50%);
  display: flex;
  width: 80%;
  max-width: 800px;
  flex-direction: column;

  div {
    max-height: 90vh;
  }

  img {
    object-fit: contain;
    overflow: hidden;
    max-height: 75vh;
  }
`;

/* LISTA */

export const ListaItem = styled.div`
  background-color: #fff;
  border-radius: ${borderRadius}px;
  border: 1px solid ${cinza.claro};
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
`;

export const ListaItemHeader = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${espacamento.pequeno}px;
  min-width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
`;

export const ListaItemBody = styled.div`
  padding: ${espacamento.pequeno}px;
`;
