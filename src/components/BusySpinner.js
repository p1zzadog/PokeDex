import React from 'react';
import PropTypes from 'prop-types';

import pokelogo from '../images/Pokeball.png';
import './BusySpinner.css';

const propTypes = {

}
const defaultProps = {

}
const BusySpinner = () =>
  <div className="Busy-spinner">
    <img src={pokelogo} className="Busy-spinner-logo" alt="Busy Spinner" />
  </div>

BusySpinner.propTypes = propTypes;
BusySpinner.defaultProps = defaultProps;
export default BusySpinner;