import React from "react";
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from
} from "@apollo/client";

import App from './App';
import { onError } from "@apollo/client/link/error";


const httpLink = new HttpLink({
    uri: 'http://localhost:5000/',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
  
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
   
});

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

