import React, { Component } from 'react';
import {
  Button,
  Input,
  Segment,
  Dropdown
} from 'semantic-ui-react';

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

  render() {
    return (
      <Segment>
        {/* <label>Team</label> */}

        <div style={{ width: '50%' }}>
          <Dropdown
            placeholder="Select your team"
            search
            selection
            fluid
            options={options}
            onChange={(value, e) => {
              this.handleTeamNameChange(e);
            }}

            // defaultValue={this.state.teamDetails.team}
          />
        </div>
        <div style={{ width: '50%' }}>
          <Input
            label="Sprint Number"
            placeholder="#"
            fluid
            defaultValue={this.state.teamDetails.sprintNumber}
            onChange={e => this.handleSprintNumberChange(e.target.value)}
          />

          {/* <Label style={{ marginTop: '4px', marginLeft: '-0.5px' }}>
            {this.iterationPath()}
          </Label> */}
        </div>
        <div style={{ width: '50%' }}>
          <Input
            type="date"
            label="Start"
            fluid
            defaultValue={this.state.teamDetails.startDate}
            onChange={e => this.handleStartDateChange(e.target.value)}
          />
          <Input
            type="date"
            label="End"
            fluid
            defaultValue={this.state.teamDetails.endDate}
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