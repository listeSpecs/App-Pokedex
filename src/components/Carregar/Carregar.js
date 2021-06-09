import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Centro, Linha } from '../../styles/base';

const Carregar = ({ height, width, login }) => {
  if (login) {
    return (
      <Linha>
        <Loader
          type="TailSpin"
          color="#c00"
          height={30}
          width={30}
        />
      </Linha>
    );
  }
  return (
    <Centro>
      <Loader
        type="TailSpin"
        color="#c00"
        height={height}
        width={width}
      />
    </Centro>
  );
};

Carregar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  login: PropTypes.bool,
};

Carregar.defaultProps = {
  width: 100,
  height: 100,
  login: false,
};

export default Carregar;
