import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider as ApolloClientProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Local GraphQL server endpoint
});

// Create auth link for adding authentication headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add Bearer token if available
    }
  }
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link with the HTTP link
  cache: new InMemoryCache(), // Use InMemoryCache for caching GraphQL data
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all', // Show both data and errors
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Apollo Provider component that wraps the app
const ApolloProvider = ({ children }) => {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  );
};

export default ApolloProvider;
