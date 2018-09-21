import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import RouteProtected from './RouteProtected';
import Dashboard from '../dashboard/Dashboard';
import Login from '../user/userLogin/Login';
import UserCreateForm from '../user/userCreate/UserCreateForm';
import Profile from '../user/userProfile/Profile';
import CreateSprint from '../sprint/sprintCreate';

const Routes = props => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={UserCreateForm} />
        <RouteProtected
          exact
          isAuthenticated={props.IsAuthenticated}
          path="/profile"
          component={Profile}
        />
        <RouteProtected
          exact
          isAuthenticated={props.IsAuthenticated}
          path="/CreateSprint"
          component={CreateSprint}
        />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    IsAuthenticated: state.UserReducer.Authenticated,
    UserRights: state.UserReducer.UserRights
  };
};
export default connect(mapStateToProps)(Routes);
