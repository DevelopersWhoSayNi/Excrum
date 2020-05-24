import React from 'react';
import { Provider } from 'react-redux';
import ConfigureStore from '../redux/Store';
import Router from './Router';
import './App.css';

import appSyncConfig from '../app/AppSync';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient, { defaultDataIdFromObject } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj);

      if (!id) {
        const { __typename: typename } = obj;
        switch (typename) {
          case 'Comment':
            return `${typename}:${obj.commentId}`;
          default:
            return id;
        }
      }

      return id;
    },
  },
});

const WithProviders = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProviders;
