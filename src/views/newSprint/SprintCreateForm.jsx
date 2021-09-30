import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import SprintDetails from '../../components/sprints/SprintDetails';
import CapacityDetails from '../../components/capacity/CapacityDetails';
// import TasksForm from '../../components/tasks/TasksForm';
import SprintSummary from '../../components/sprints/SprintSummary';
import GetInitialSprintSetup from '../../common/GetInitialSprintSetup';
require('../../css/Sprint.css');

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
        ),
      },
      {
        menuItem: 'Capacity',
        render: () => (
          <CapacityDetails
            sprintData={this.state.sprintData}
            updateCapacityDetail={this.updateCapacityDetail}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        ),
      },
      // {
      //   menuItem: 'Tasks',
      //   render: () => (
      //     <TasksForm
      //       sprintData={this.state.sprintData}
      //       handleNavigateTabs={this.handleNavigateTabs}
      //     />
      //   )
      // },
      {
        menuItem: 'Summary',
        render: () => (
          <SprintSummary
            sprintData={this.state.sprintData}
            handleNavigateTabs={this.handleNavigateTabs}
          />
        ),
      },
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

  updateCapacityDetail = sprintData => {
    const newSprintData = {
      ...this.state.sprintData,
      team: sprintData.team,
      capacityDetails: sprintData.capacityDetails
    };

    this.setState({
      sprintData: newSprintData
    });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <div className="MainForm">
        <h1 className="dashboardTitle">Create Sprint</h1>
      <Segment compact className="MainForm" style={{ width: '80%', marginLeft: '10%' }}>
        <Tab
          panes={this.stepsTab()}
          activeIndex={activeIndex}
          // onTabChange={(e, v) => this.handleNavigateTabs(v.activeIndex)}
          menu={{ secondary: true, pointing: true }}
        />
      </Segment>
      </div>
    );
  }
}

export default CreateSprintForm;
