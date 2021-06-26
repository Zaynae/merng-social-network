import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import App from './App';

// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks'

const link = createHttpLink({
    uri: 'http://localhost:5000/',
});

  
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

