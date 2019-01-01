import gql from 'graphql-tag';

export default {
    Mutation: {
        catchPokemon: (_, { id, __typename }, { cache, getCacheKey }) => {
            const cacheKey = getCacheKey({__typename: 'Pokemon', id: id});
            const fragment = gql`
                fragment pokemon on Pokemon {
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
            `;
            const pokemon = cache.readFragment({fragment, id: cacheKey});
            const data = { ...pokemon, caught: !pokemon.caught };
            cache.writeFragment({ id, fragment, data });
            return data;
        }
      }
};