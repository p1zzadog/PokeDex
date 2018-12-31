import React from 'react';

import pokelogo from '../images/Pokeball.png';
import './BusySpinner.css';

const BusySpinner = () =>
  <div className="Busy-spinner">
    <img src={pokelogo} className="Busy-spinner-logo" alt="Busy Spinner" />
  </div>

export default BusySpinner;