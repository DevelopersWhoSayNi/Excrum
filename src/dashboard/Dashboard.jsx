import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './Dashboard.css';

const Looper = props => {
  let cName = 'card';
  if (props.day === '30') {
    cName = 'activeCard';
  }
  return (
    <div className={cName}>
      <h2>{props.day}</h2>
    </div>
  );
};

const Calendar = () => {
  // const sprintDays = [
  //   '01',
  //   '02',
  //   '03',
  //   '04',
  //   '05',
  //   '06',
  //   '07',
  //   '08',
  //   '09',
  //   '10',
  //   '11',
  //   '12',
  //   '13',
  //   '14',
  //   '15'
  // ];
  
  const sprintDays = [
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
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

        {/* <br />
        <h2 className="text">{this.props.UserName}</h2>
        <h2 className="text">{this.props.UserPassword}</h2> */}
        {/* <Link to="/profile">Profile (Protected)</Link> */}
        <br />
        <br />
        {/* <Link to="/login">Login</Link> */}
        <Button basic >
          <Link className="HomePageButton" to="/Sprints">Sprints overview</Link>
        </Button>

        <br />
        <br />
        <Button basic>
          <Link className="HomePageButton" to="/CreateSprint">Create Sprint</Link>
        </Button>
        <br />
        <br />
        <Button basic>
          <Link className="HomePageButton" to="/createTeam">Create Team</Link>
        </Button>
        <br />
        <br />
        {/* <Link to="/logout">Logout</Link> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);
