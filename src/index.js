import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import defaults from './graphql/defaults';
import resolvers from './graphql/resolvers';


const client = new ApolloClient({
    uri: 'https://pokeql.com/v1',
    clientState: {
        defaults,
        resolvers
    }
    // uri: 'http://localhost:3001/v1'
});

ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
