import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'FinTech', value: 'FinTech' },
  { key: 'f', text: 'Exact Finance', value: 'EF' },
  { key: 'c', text: 'Customer Intelligence', value: 'DSCI' }
];

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamDetails: this.props.teamDetails
    };

    this.iterationPath = this.iterationPath.bind(this);
  }

  iterationPath() {
    const path =
      this.state.teamDetails.iterationPath +
      this.state.teamDetails.sprintNumber;
    return path;
  }

  handleSprintNumberChange(value) {
    const newTeamDetails = { ...this.state.teamDetails, sprintNumber: value };
    this.setState({ teamDetails: newTeamDetails });
    this.props.updateSprintDetails(this.state.teamDetails);
  }

  handleTeamNameChange(e) {
    const newTeamDetails = { ...this.state.teamDetails, team: e.value };
    this.setState({ teamDetails: newTeamDetails });
    this.props.updateSprintDetails(this.state.teamDetails);
  }

  handleStartDateChange(date) {
    const newTeamDetails = { ...this.state.teamDetails, startDate: date };
    this.setState({ teamDetails: newTeamDetails });
    this.props.updateSprintDetails(this.state.teamDetails);
  }

  handleEndDateChange(date) {
    const newTeamDetails = { ...this.state.teamDetails, endDate: date };
    this.setState({ teamDetails: newTeamDetails });
    this.props.updateSprintDetails(this.state.teamDetails);
  }

  AddZero(num) {
    return num >= 0 && num < 10 ? '0' + num : num + '';
  }

  getCurrentDate(daysToAdd) {
    var now = new Date();
    if (daysToAdd) {
      now.setDate(now.getDate() + daysToAdd);
    }

    var strDateTime = [
      [
        now.getFullYear(),
        this.AddZero(now.getMonth() + 1),
        this.AddZero(now.getDate())
      ].join('-')
    ].join(' ');

    return strDateTime;
  }

  getDefaultStartDate() {
    if (this.props.sprintData.startDate) {
      return this.props.sprintData.startDate;
    } else {
      return this.getCurrentDate();
    }
  }

  getDefaultEndDate() {
    return this.getCurrentDate(this.props.sprintData.sprintLength);
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
            onChange={(value, e) => {
              this.handleTeamNameChange(e);
            }}
          />
        </div>
        <div style={{ width: '50%', marginBottom: '2%' }}>
          <Input
            label="Sprint Number"
            placeholder="#"
            fluid
            defaultValue={this.state.sprintNumber}
            onChange={e => this.handleSprintNumberChange(e.target.value)}
          />
        </div>
        <div style={{ width: '50%', marginBottom: '2%' }}>
          <Input
            type="date"
            label="Start Date"
            fluid
            defaultValue={this.getDefaultStartDate()}
            onChange={e => this.handleStartDateChange(e.target.value)}
          />
          <Input
            type="date"
            label="End  Date:"
            fluid
            defaultValue={this.getDefaultEndDate()}
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
