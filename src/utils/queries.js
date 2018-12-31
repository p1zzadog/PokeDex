import gql from 'graphql-tag';

export const GET_POKEMON = gql`
query Pokemon($first: Int!, $after: String) {
    Pokemon(first: $first, after: $after) {
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