import { ApolloClient, HttpLink, split, ApolloLink, concat } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from 'isomorphic-unfetch';
import cache from './cache.js';

interface Definintion {
  kind: string;
  operation?: string;
}

let authToken = '';
console.log(process.env.REACT_APP_API_URL)
const httpLink = new HttpLink({
  fetch,
  uri: "http://localhost:3000/dev/graphql",
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const tokenValue = localStorage.getItem("token") ? localStorage.getItem("token") : '';
  operation.setContext({
    headers: {
      "Authorization": "Bearer " + tokenValue || null,
    },
  });
  return forward(operation);
});


const webSocketLink = new WebSocketLink({
  uri: String('ws://localhost:4020'),
  options: {
    reconnect: true
  }
});


export const setToken = async (token: string | undefined) => {
  try {
    authToken = token ? `Bearer ${token}` : '';
    console.log(authToken)
    localStorage.setItem("token", authToken);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    const token = localStorage.getItem('token');
    authToken = token ? token : '';
    return authToken;
  } catch (error) {
    console.log(error);
  }
};

export const destroyToken = async () => {
  try {
    localStorage.removeItem("token");
    authToken = '';
  } catch (error) {
    console.log(error);
  }
};

const link = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  httpLink
);

const apolloclient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: cache,
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export default apolloclient;
