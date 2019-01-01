import React from 'react';
import PropTypes from 'prop-types';

import pokelogo from '../images/Pokeball.png';
import './AppHeader.css';

const propTypes = {

};
const defaultProps = {

};
const AppHeader = () =>
  <header className="App-header">
    <img src={pokelogo} className="App-logo" alt="logo" />
    <p className="App-header-title">&nbsp;PokeDex</p>
  </header>

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default AppHeader;