import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import '../../css/Dashboard.css';

const Calendar = () => {
  const calendarRange = 10;
  var date = new Date().toLocaleString();
  var splitted = date.split(',')[0].split('/');

  var pastDays = new Date(
    parseInt(splitted[2]),
    parseInt(splitted[1]) - 1,
    parseInt(splitted[0]) - calendarRange
  );

  let dateNow = new Date().getDate();
  let calendarDays = [];
  let className = '';
  let dayNumber = 0;

  for (let index = 0; index < calendarRange * 2; index++) {
    pastDays.setDate(pastDays.getDate() + 1);
    dayNumber = pastDays.getDate();

    if (dayNumber === dateNow) {
      className = 'activeCard';
    } else {
      className = 'card';
    }

    if (dayNumber < 10) {
      dayNumber = '0' + dayNumber;
    }

    calendarDays.push(
      <div key={index} className={className}>
        <h2>{dayNumber}</h2>
      </div>
    );
  }

  return calendarDays;
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
        <Button basic>
          <Link className="HomePageButton" to="/Sprints">
            Sprints overview
          </Link>
        </Button>

        <br />
        <br />
        <Button basic>
          <Link className="HomePageButton" to="/CreateSprint">
            Create Sprint
          </Link>
        </Button>
        <br />
        <br />
        <Button basic>
          <Link className="HomePageButton" to="/createTeam">
            Create Team
          </Link>
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
