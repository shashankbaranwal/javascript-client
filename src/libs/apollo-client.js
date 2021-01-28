/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';

const link = new HttpLink({ uri: 'http://localhost:9000/graphql' });

const authLink = setContext((_, { headers }) => {
// get the authentication token if it's exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default apolloclient;
