import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h2 className="text">{this.props.UserName}</h2>
        <h2 className="text">{this.props.UserPassword}</h2>
        <Link to="/profile">Profile (Protected)</Link>
        <br />
        <br />
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserName: state.UserReducer.UserName,
    UserPassword: state.UserReducer.UserPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatcher: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboard);
