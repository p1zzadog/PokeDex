import gql from 'graphql-tag';

export const CATCH_POKEMON = gql`
    mutation CatchPokemon($__typename: String! $id: String!) {
        catchPokemon(__typename: $__typename, id: $id) @client {
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
            caught
        }
    }
`;