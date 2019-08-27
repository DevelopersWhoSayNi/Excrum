import React, { Component } from 'react';
import { Button, Label, Select, Input, Segment } from 'semantic-ui-react';

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
  }

  handleTeamNameChange(e) {
    const newTeamDetails = { ...this.state.teamDetails, team: e.value };
    this.setState({ teamDetails: newTeamDetails });
  }

  handleStartDateChange(date) {
    const newTeamDetails = { ...this.state.teamDetails, startDate: date };
    this.setState({ teamDetails: newTeamDetails });
  }

  handleEndDateChange(date) {
    const newTeamDetails = { ...this.state.teamDetails, endDate: date };
    this.setState({ teamDetails: newTeamDetails });
  }

  render() {
    return (
      <Segment>
        <label>Team</label>
        <Select
          label="Team"
          options={options}
          onChange={(value, e) => {
            this.handleTeamNameChange(e);
          }}
          defaultValue={this.state.teamDetails.team}
        />

        <Input
          label="Sprint Number"
          placeholder="#"
          defaultValue={this.state.teamDetails.sprintNumber}
          onChange={e => this.handleSprintNumberChange(e.target.value)}
        />
        <Label style={{ marginTop: '4px', marginLeft: '-0.5px' }}>
          {this.iterationPath()}
        </Label>

        <Input
          type="date"
          label="Start"
          defaultValue={this.state.teamDetails.startDate}
          onChange={e => this.handleStartDateChange(e.target.value)}
        />
        <Input
          type="date"
          label="End"
          defaultValue={this.state.teamDetails.endDate}
          onChange={e => this.handleEndDateChange(e.target.value)}
        />

        <br />

        <Button onClick={() => this.props.Next(this.state.teamDetails)}>
          Next
        </Button>
      </Segment>
    );
  }
}

export default SprintDetails;
