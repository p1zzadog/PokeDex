import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PokemonSearchInput.css';

export default class PokemonSearchInput extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired
    }
    static defaultProps = {

    }
    state = {
        term: ''
    }
    render() {
        return (
            <div>
                <input
                    value={this.state.term}
                    onChange={e => this.setState({term: e.target.value})}
                    onKeyPress={this.handleOnKeyPress}
                />
                <button
                    onClick={this.handleSearchOnClick}
                >Search!</button>
                <button
                    onClick={this.handleClearSearchOnClick}
                >Clear!</button>
            </div>
        );
    }
    handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSearch(this.state.term);
        }
    }
    handleSearchOnClick = (e) => {
        this.props.onSearch(this.state.term);
    }
    handleClearSearchOnClick = (e) => {
        this.setState(
            {term: ''},
            () => this.props.onSearch(this.state.term)
        );
    }
}
