import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

const Looper = props => {
  let cName = 'card';
  if (props.day === '04') {
    cName = 'activeCard';
  }
  return (
    <div className={cName}>
      <h2>{props.day}</h2>
    </div>
  );
};

const Calendar = () => {
  const sprintDays = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15'
  ];

  return sprintDays.map((day, index) => <Looper key={index} day={day} />);
};

class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <br />
        <div className="scrolling-wrapper">
          <Calendar />
        </div>

        <br />
        <h2 className="text">{this.props.UserName}</h2>
        <h2 className="text">{this.props.UserPassword}</h2>
        <Link to="/profile">Profile (Protected)</Link>
        <br />
        <br />
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/CreateSprint">Create Sprint</Link>
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
