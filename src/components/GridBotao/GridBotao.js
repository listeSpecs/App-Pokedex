import PropTypes from 'prop-types';
import React from 'react';
import { corReversa } from '../../util/color';
import { PokemonBotao } from './GridBotaoEstilo';

const GridBotao = ({
  label, onClick, cor, img, imgWidth, imgHeight,
}) => (
  <PokemonBotao
    type="button"
    onClick={onClick}
    style={{ backgroundColor: cor, color: corReversa(cor) }}
  >
    <div>
      <img src={img} alt="Pokémon" width={imgWidth} height={imgHeight} />
    </div>
    <p>{label}</p>
  </PokemonBotao>
);

GridBotao.propTypes = {
  cor: PropTypes.string,
  img: PropTypes.string.isRequired,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

GridBotao.defaultProps = {
  cor: null,
  imgWidth: 100,
  imgHeight: 100,
  label: null,
  onClick: null,
};

export default GridBotao;
