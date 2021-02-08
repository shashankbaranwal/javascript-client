import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

console.log(process.env.REACT_APP_Apollo_URI);
const httplink = new HttpLink({ uri: process.env.REACT_APP_Apollo_URI });

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:9000/graphql',
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
// get the authentication token if it's exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription'
    );
  },
  wsLink,
  httplink,
);

const apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default apolloclient;
