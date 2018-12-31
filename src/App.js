import React, { Component } from 'react';

import pokelogo from './images/Pokeball.png';
import './App.css';
import PokeList from './components/PokeList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <PokeList />
      </div>
    );
  }
}

const AppHeader = () =>
  <header className="App-header">
    <img src={pokelogo} className="App-logo" alt="logo" />
    <p className="App-header-title">&nbsp;PokeGram</p>
  </header>

export default App;
