import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateUserAuthStatus } from '../UserActions';

class Logout extends Component {
  componentDidMount() {
    const auth = {
      Authenticated: false,
      Token: ''
    };
    localStorage.removeItem('token');
    this.props.UpdateUserAuthStatus(auth);
  }

  render() {
    return <div>niiiiiiiiiiiiiiiii - OUT!</div>;
  }
}

export default connect(
  null,
  { UpdateUserAuthStatus }
)(Logout);
