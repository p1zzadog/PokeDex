import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './Pokemon.css';

const propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.string.isRequired,
        __typename: PropTypes.string.isRequired,
        englishName: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        caught: PropTypes.bool.isRequired,
        sprites: PropTypes.shape({
            normal: PropTypes.shape({
                male: PropTypes.shape({
                    front: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    catchPokemon: PropTypes.func.isRequired
}

const defaultProps = {

};

const Pokemon = ({pokemon, catchPokemon}) => 
    <div className="Pokemon">
        <img
            className="Pokemon-profile-pic"
            alt="Profile Pic"
            src={_get(pokemon, 'sprites.normal.male.front')}
        />
        <div className="Pokemon-details">
            <p>{pokemon.englishName}</p>
            <p>Height: {pokemon.height} m</p>
            <p>Weight: {pokemon.weight} kg</p>
            <p>Caught: {pokemon.caught ? 'YES!' : 'No'}</p>
        </div>
        <div className="Pokemon-catch"
        >
            <button onClick={e => catchPokemon(pokemon)}>Catch!</button>
        </div>
    </div>

Pokemon.propTypes = propTypes;
Pokemon.defaultProps = defaultProps;
export default Pokemon;