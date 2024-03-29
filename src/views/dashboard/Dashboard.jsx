import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Particles from 'react-particles-js';
import particleConfig from '../../config/particle-config';

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
      <div position="absolute" className="App">

        

        {/* <div className="scrolling-wrapper">
        {/* <br />
        <h2 className="text">{this.props.UserName}</h2>
        <h2 className="text">{this.props.UserPassword}</h2> */}
        {/* <Link to="/profile">Profile (Protected)</Link> */}


        {/* <Link to="/login">Login</Link> */}

        <Button id="CreateTeamButton">
          <Link className="HomePageButton" to="/createTeam">
            Create Team
          </Link>
        </Button>


        <Button id="CreateSprintButton">
          <Link className="HomePageButton" to="/CreateSprint">
            Create Sprint
          </Link>
        </Button>

        <Button id="SprintOverviewButton">
          <Link className="HomePageButton" to="/Sprints">
            Sprints Overview
          </Link>
        </Button>

        <Particles id="particles" class="CountParticles" params={particleConfig}></Particles>





        {/* <Link to="/logout">Logout</Link> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserName: state.UserReducer.UserName,
    UserPassword: state.UserReducer.UserPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatcher: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);
