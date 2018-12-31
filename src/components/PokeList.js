import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';

import './PokeList.css';
import { GET_POKEMON } from '../utils/queries';
import BusySpinner from './BusySpinner';

class PokeList extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    render() {
        return (
            <Query query={GET_POKEMON} variables={{ first: 50, after: '' }} >
                {({loading, error, data, refetch, fetchMore}) => {
                    if (loading) {
                        console.log('loading: ', loading);
                        return <BusySpinner />
                    }
                    if (error) {
                        console.log('error: ', error);
                        return (
                            <Fragment>
                                <BusySpinner />
                                <p>{error.message}</p>
                            </Fragment>
                        );
                    }
                    return (
                        <div className="Poke-List">
                            <button onClick={() => refetch()}>Refetch!</button>
                            {_get(data, 'Pokemon.edges', []).map(edge =>
                                <Pokemon
                                    key={edge.cursor}
                                    pokemon={edge.node}
                                />
                            )}
                            <button
                                onClick={() => this.handleLoadMore({data, fetchMore})}
                            >Load More!</button>
                        </div>
                    );
                }}
            </Query>
        );
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
    handleLoadMore({data, fetchMore}) {
        return fetchMore({
            variables: {
                after: _get(data, 'Pokemon.pageInfo.endCursor', '')
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.Pokemon.edges;
                const pageInfo = fetchMoreResult.Pokemon.pageInfo;
                const totalCount = fetchMoreResult.Pokemon.totalCount;
                return newEdges.length
                    ? {
                        // Put the new pokemon at the end of the list and update `pageInfo`
                        // so we have the new `endCursor` and `hasNextPage` values
                        Pokemon: {
                          __typename: previousResult.Pokemon.__typename,
                          edges: [...previousResult.Pokemon.edges, ...newEdges],
                          pageInfo,
                          totalCount
                        }
                      }
                    : previousResult;
            }
        });
    }
}

const Pokemon = ({pokemon}) => 
    <div className="Pokemon">
        <img
            className="Pokemon-profile-pic"
            alt="Profile Pic"
            src={_get(pokemon, 'sprites.normal.male.front')}
        />
        <div className="Pokemon-details">
            details
        </div>
    </div>


export default PokeList;
