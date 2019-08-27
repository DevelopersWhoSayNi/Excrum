import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import SprintDetails from './SprintDetails';
import CapacityDetails from './CapacityDetails';
import TasksForm from './TasksForm';
import GetInitialSprintSetup from './GetInitialSprintSetup';
require('../Sprint.css');

class CreateSprintForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 1,
      sprintData: GetInitialSprintSetup()
    };

    this.handleSprintDetailsChange = this.handleSprintDetailsChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  stepsTab = () => {
    return [
      {
        menuItem: 'Sprint Details',
        render: () => (
          <SprintDetails
            Next={this.handleSprintDetailsChange}
            teamDetails={this.state.sprintData.teamDetails}
          />
        )
      },
      {
        menuItem: 'Capacity',
        render: () => (
          <CapacityDetails
            CapacityDetails={this.state.sprintData.capacityDetails}
            Next={this.handleCapacityChange}
            Back={this.handleBackButton}
          />
        )
      },
      {
        menuItem: 'Tasks',
        render: () => <TasksForm Next={() => this.myFunc()} />
      }
    ];
  };

  myFunc() {
    debugger;
    console.log('Zaaart!');
  }

  handleBackButton = () => {
    const newIndex = this.state.activeIndex - 1;
    this.setState({ activeIndex: newIndex });
  };

  handleSprintDetailsChange = teamDetails => {
    const newIndex = this.state.activeIndex + 1;
    const newSprintData = {
      ...this.state.sprintData,
      teamDetails: teamDetails
    };

    this.setState({
      sprintData: newSprintData,
      activeIndex: newIndex
    });
  };

  handleCapacityChange = capacity => {
    const newIndex = this.state.activeIndex + 1;
    const newSprintData = {
      ...this.state.sprintData,
      capacity: capacity
    };

    this.setState({
      sprintData: newSprintData,
      activeIndex: newIndex
    });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment compact className="CreateSprint">
        <Tab
          panes={this.stepsTab()}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
          menu={{ secondary: true, pointing: true }}
        />
      </Segment>
    );
  }
}

export default CreateSprintForm;
