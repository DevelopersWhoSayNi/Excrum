import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown } from 'semantic-ui-react';
import GetTeamDefaultSprintData from './GetSprintData';
import { FormatDate } from './Tools';

const options = [
  { key: 'a', text: 'Team 001', value: 'T001' },
  { key: 'f', text: 'Exact Finance', value: 'T002' },
  { key: 'c', text: 'Customer Intelligence', value: 'T003' }
];

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintData: this.props.sprintData
    };

    this.iterationPath = this.iterationPath.bind(this);
  }

  componentDidMount() {
    this.setDefaultDates();
  }

  iterationPath() {
    const path =
      this.state.sprintData.iterationPath + this.state.sprintData.sprintNumber;
    return path;
  }

  handleTeamChange(e) {
    GetTeamDefaultSprintData(e.value).then(response => {
      const newSprintDetails = { ...this.state.sprintData, team: response };
      this.setState({ sprintData: newSprintDetails });
      this.props.updateSprintDetails(newSprintDetails);
    });
  }

  handleSprintNumberChange(value) {
    const newSprintDetails = { ...this.state.sprintData, sprintNumber: value };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(newSprintDetails);
  }

  handleStartDateChange(date) {
    const newSprintDetails = { ...this.state.sprintData, startDate: date };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(newSprintDetails);
  }

  handleEndDateChange(date) {
    const newSprintDetails = { ...this.state.sprintData, endDate: date };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(newSprintDetails);
  }

  setDefaultDates() {
    let now = new Date();
    let startDate = '';
    let endDate = '';

    if (this.props.sprintData.startDate) {
      startDate = this.props.sprintData.startDate;
    } else {
      startDate = FormatDate(now);
    }

    if (this.props.sprintData.endDate) {
      endDate = this.props.sprintData.endDate;
    } else {
      now.setDate(now.getDate() + this.props.sprintData.sprintLength);
      endDate = FormatDate(now);
    }

    const newSprintDetails = {
      ...this.state.sprintData,
      startDate: startDate,
      endDate: endDate
    };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(newSprintDetails);
  }

  getSelectedTeam() {
    if (this.state.sprintData.team.teamID) {
      const selectedValue = options.find(
        o => o.value === this.state.sprintData.team.teamID
      );
      if (selectedValue !== 'undefined') {
        return selectedValue.value;
      }
    }
  }

  render() {
    return (
      <Segment style={{ width: '50%', marginLeft: '0.5%' }}>
        <div style={{ width: '50%', marginBottom: '2%' }}>
          <Dropdown
            placeholder="Select your team"
            search
            selection
            fluid
            options={options}
            defaultValue={this.getSelectedTeam()}
            onChange={(value, e) => {
              this.handleTeamChange(e);
            }}
          />
        </div>
        <div style={{ width: '50%', marginBottom: '2%' }}>
          <Input
            label="Sprint Number"
            placeholder="#"
            fluid
            defaultValue={this.state.sprintData.sprintNumber}
            onChange={e => this.handleSprintNumberChange(e.target.value)}
          />
        </div>
        <div style={{ width: '50%', marginBottom: '2%' }}>
          <Input
            type="date"
            label="Start Date"
            fluid
            defaultValue={this.state.sprintData.startDate}
            onChange={e => this.handleStartDateChange(e.target.value)}
          />
          <Input
            type="date"
            label="End  Date:"
            fluid
            defaultValue={this.state.sprintData.endDate}
            onChange={e => this.handleEndDateChange(e.target.value)}
          />
        </div>
        <br />

        <Button onClick={() => this.props.handleNavigateTabs(1)}>Next</Button>
      </Segment>
    );
  }
}

export default SprintDetails;
