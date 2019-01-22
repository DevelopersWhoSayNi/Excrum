import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const IsTokenValid = token => {
  return token !== 'undefined' && token !== null;
};

const RouteProtected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      IsTokenValid(rest.accessToken) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default RouteProtected;
