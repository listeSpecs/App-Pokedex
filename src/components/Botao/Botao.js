import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as FecharSvg } from '../../assets/icones/fechar.svg';
import { BotaoForm } from './BotaoEstilo';
import { BotaoNude } from '../../styles/base';

const Botao = ({
  type, onClick, style, label, fechar,
}) => {
  if (fechar) {
    return (
      <BotaoNude type="button" onClick={onClick} style={style}>
        <FecharSvg height={12} width={12} fill="#000" />
      </BotaoNude>
    );
  }

  return (
    <BotaoForm type={type} onClick={onClick} style={style}>
      {label}
    </BotaoForm>
  );
};

Botao.propTypes = {
  onClick: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  type: PropTypes.string,
  label: PropTypes.string,
  fechar: PropTypes.bool,
};

Botao.defaultProps = {
  style: null,
  type: 'button',
  label: '',
  fechar: false,
};

export default Botao;
