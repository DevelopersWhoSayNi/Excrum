import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import SprintDetails from './SprintDetails';
import CapacityDetails from './CapacityDetails';
import TasksForm from './TasksForm';
import SprintSummary from './SprintSummary';
import GetInitialSprintSetup from './GetInitialSprintSetup';
require('../Sprint.css');

class CreateSprintForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 2,
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
            teamDetails={this.state.sprintData.teamDetails}
            updateSprintDetails={this.updateSprintDetails}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      },
      {
        menuItem: 'Capacity',
        render: () => (
          <CapacityDetails
            CapacityDetails={this.state.sprintData.capacityDetails}
            updateCapacityDetail={this.updateCapacityDetail}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        )
      },
      {
        menuItem: 'Tasks',
        render: () => <TasksForm handleNavigateTabs={this.handleNavigateTabs} />
      },
      {
        menuItem: 'Summery',
        render: () => (
          <SprintSummary handleNavigateTabs={this.handleNavigateTabs} />
        )
      }
    ];
  };

  handleNavigateTabs = activeIndex => {
    this.setState({ activeIndex: activeIndex });
  };

  updateSprintDetails = teamDetails => {
    const newSprintData = {
      ...this.state.sprintData,
      teamDetails: teamDetails
    };

    this.setState({
      sprintData: newSprintData
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
