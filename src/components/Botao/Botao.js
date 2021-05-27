import PropTypes from 'prop-types';
import React from 'react';
import { BotaoForm } from './BotaoEstilo';

const Botao = ({
  type, onClick, style, label,
}) => (
  <BotaoForm type={type} onClick={onClick} style={style}>
    {label}
  </BotaoForm>
);

Botao.propTypes = {
  onClick: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  type: PropTypes.string,
  label: PropTypes.string,
};

Botao.defaultProps = {
  style: null,
  type: 'button',
  label: '',
};

export default Botao;
