import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import AppHeader from './components/AppHeader';
import PokeList from './routes/PokeList'; // only 1 route so far, no router


class App extends Component {
  static propTypes = {

  }
  static defaultProps = {

  }
  render() {
    return (
      <div className="App">
        <AppHeader />
        <PokeList />
      </div>
    );
  }
}



export default App;
