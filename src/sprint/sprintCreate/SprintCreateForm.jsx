import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import SprintDetails from './SprintDetails';
import CapacityDetails from './CapacityDetails';
import TasksForm from './TasksForm';
import SprintSummary from './SprintSummary';
import GetInitialSprintSetup from './api/GetInitialSprintSetup';
require('../Sprint.css');

class CreateSprintForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      sprintData: GetInitialSprintSetup()
    };

    this.handleNavigateTabs = this.handleNavigateTabs.bind(this);
    this.updateSprintDetails = this.updateSprintDetails.bind(this);
    this.updateCapacityDetail = this.updateCapacityDetail.bind(this);
  }

  stepsTab = () => {
    return [
      {
        menuItem: 'Sprint Details',
        render: () => (
          <SprintDetails
            sprintData={this.state.sprintData}
            updateSprintDetails={this.updateSprintDetails}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      },
      {
        menuItem: 'Capacity',
        render: () => (
          <CapacityDetails
            sprintData={this.state.sprintData}
            updateSprintDetails={this.updateSprintDetails}
            updateCapacityDetail={this.updateCapacityDetail}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      },
      {
        menuItem: 'Tasks',
        render: () => (
          <TasksForm
            sprintData={this.state.sprintData}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      },
      {
        menuItem: 'Summary',
        render: () => (
          <SprintSummary
            sprintData={this.state.sprintData}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      }
    ];
  };

  handleNavigateTabs = activeIndex => {
    this.setState({ activeIndex: activeIndex });
  };

  updateSprintDetails = sprintDetails => {
    this.setState({
      sprintData: sprintDetails
    });
  };

  updateCapacityDetail = capacity => {
    const newSprintData = {
      ...this.state.sprintData,
      capacity: capacity
    };

    this.setState({
      sprintData: newSprintData
    });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment compact className="CreateSprint">
        <Tab
          panes={this.stepsTab()}
          activeIndex={activeIndex}
          onTabChange={(e, v) => this.handleNavigateTabs(v.activeIndex)}
          menu={{ secondary: true, pointing: true }}
        />
      </Segment>
    );
  }
}

export default CreateSprintForm;
