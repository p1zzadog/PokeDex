import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import _get from 'lodash/get';

import './PokeList.css';
import { GET_POKEMON } from '../graphql/queries';
import { CATCH_POKEMON } from '../graphql/mutations';
import BusySpinner from '../components/BusySpinner';
import Pokemon from '../components/Pokemon';
import PokemonSearchInput from '../components/PokemonSearchInput';

const RESULTS_PER_PAGE = 10;

class PokeList extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        filter: {
            identifierLike: ''
        }
    }
    render() {
        return (
            <Fragment>
                <PokemonSearchInput
                    onSearch={this.handleOnSearch}
                />
                <Query
                    query={GET_POKEMON}
                    variables={{ first: RESULTS_PER_PAGE, after: '', filter: this.state.filter}}
                    notifyOnNetworkStatusChange
                >
                    {({loading, error, data, refetch, fetchMore, networkStatus}) => {
                        if (networkStatus === 1) {
                            return <BusySpinner />
                        }
                        console.log('network status: ', networkStatus);
                        if (error) {
                            console.error(error);
                            return (
                                <Fragment>
                                    <BusySpinner />
                                    <p>{error.message}</p>
                                </Fragment>
                            );
                        }
                        return (
                            <div className="Poke-List">
                                {/*
                                <button onClick={() => refetch()}>Refetch!</button>
                                */}
                                {_get(data, 'Pokemon.edges', []).map(edge =>
                                    <Mutation
                                        key={`${edge.node.__typename}:${edge.node.id}`}
                                        mutation={CATCH_POKEMON}
                                        variables = {{pokemon: edge.node, __typename: edge.node.__typename, id: edge.node.id}}
                                    >
                                        {(catchPokemon, { loading, error, called, data }) => {
                                            return <Pokemon
                                                pokemon={edge.node}
                                                catchPokemon={() => this.handleCatchPokemon(edge.node, catchPokemon)}
                                            />
                                        }
                                        }
                                    </Mutation>
                                )}
                                <button
                                    onClick={() => this.handleLoadMore({data, fetchMore})}
                                    disabled={loading}
                                >Load More!</button>
                            </div>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }

    /**
     * 
     * @param {String} term 
     */
    handleOnSearch = (term = '') => {
        this.setState({
            filter: Object.assign({}, this.state.filter, {
                identifierLike: term.toLowerCase()
            })
        })
    }

    /**
     * @param {Object} pokemon
     * @param {String} pokemon.id
     * @param {String} pokemon.__typename
     */
    handleCatchPokemon = (pokemon, catchPokemon) => {
        console.log('pokemon: ', pokemon);
        console.log('catchPokemon: ', catchPokemon);
        catchPokemon({
            variables: {
                __typename: pokemon.__typename,
                id: pokemon.id
            },
            optimisticResponse: undefined,
            refetchQueries: undefined
        });
    }

    /**
     * handler for load more button, invokes Apollo#Query component fetchMore render prop
     * @param {Object} param0
     * @param {Object} param0.data
     * @param {Object} param0.data.Pokemon
     * @param {Object} param0.data.Pokemon.pageInfo
     * @param {String} param0.data.Pokemon.pageInfo.endCursor
     * @param {Function} param0.fetchMore
     */
    handleLoadMore = ({data, fetchMore}) => {
        return fetchMore({
            variables: {
                after: _get(data, 'Pokemon.pageInfo.endCursor', '')
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.Pokemon.edges;
                const pageInfo = fetchMoreResult.Pokemon.pageInfo;
                const totalCount = fetchMoreResult.Pokemon.totalCount;
                return newEdges.length ? ({
                        Pokemon: {
                          __typename: previousResult.Pokemon.__typename,
                          edges: [...previousResult.Pokemon.edges, ...newEdges],
                          pageInfo,
                          totalCount
                        }
                    }) : previousResult;
            }
        });
    }
}


export default PokeList;
