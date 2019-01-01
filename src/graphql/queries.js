import gql from 'graphql-tag';

export const GET_POKEMON = gql`
    query Pokemon($first: Int!, $after: String, $filter: PokemonFilter) {
        Pokemon(first: $first, after: $after, filter: $filter) {
            edges {
                cursor
                node {
                    id
                    identifier
                    englishName
                    height
                    weight
                    sprites {
                        normal {
                            male {
                                front
                                back
                            }
                            female {
                                front
                                back
                            }
                        }
                    }
                    caught @client
                }
            }
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            totalCount
        }
    }
`;