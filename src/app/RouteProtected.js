import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const validateToken = token => {
  return token !== 'undefined' && token !== null;
};

const RouteProtected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      validateToken(rest.token) ? (
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
