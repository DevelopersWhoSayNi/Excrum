import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown, Message } from 'semantic-ui-react';
import GetTeamDefaultSprintData from './api/GetSprintData';
import { FormatDate } from '../Tools';
import GetTeamsList from './api/GetTeamsList';

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintData: this.props.sprintData,
      errorMessage: [],
      selectedTeam: null,
      teamsList: []
    };

    this.iterationPath = this.iterationPath.bind(this);
  }

  componentDidMount() {
    this.setDefaultDates();
    GetTeamsList('U001').then(res => {
      if (res !== null) {
        const selectedTeam = this.getSelectedTeam(res);
        this.setState({
          teamsList: res,
          selectedTeam: selectedTeam
        });
      }
    });
  }

  iterationPath() {
    const path =
      this.state.sprintData.iterationPath + this.state.sprintData.sprintNumber;
    return path;
  }

  handleTeamChange(e) {
    GetTeamDefaultSprintData(e.value).then(response => {
      let newSprintDetails = {
        ...this.state.sprintData,
        team: response.team,
        lastSprintId: response.lastSprintId
      };

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

  getSelectedTeam(teamsList) {
    if (this.state.sprintData.team.teamID) {
      const selectedValue = teamsList.find(
        o => o.value === this.state.sprintData.team.teamID
      );
      if (selectedValue !== 'undefined' && selectedValue !== undefined) {
        return selectedValue.value;
      }
    }
  }

  validateInput() {
    let errorMessage = [];
    let validInput = true;

    if (
      this.state.sprintData.team.teamID === null ||
      this.state.sprintData.team.teamID === ''
    ) {
      errorMessage.push('Choose a team');
      validInput = false;
    }

    if (
      this.state.sprintData.sprintNumber === null ||
      this.state.sprintData.sprintNumber === ''
    ) {
      errorMessage.push('Enter the sprint number');
      validInput = false;
    }

    if (
      this.state.sprintData.startDate === null ||
      document.getElementById('startDateInput').value === ''
    ) {
      errorMessage.push('Start date is mandatory');
      validInput = false;
    }

    if (
      this.state.sprintData.endDate === null ||
      document.getElementById('endDateInput').value === ''
    ) {
      errorMessage.push('End date is mandatory');
      validInput = false;
    }

    if (validInput) {
      this.props.handleNavigateTabs(1);
    } else {
      this.setState({ errorMessage: errorMessage });
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
            options={this.state.teamsList}
            value={this.state.selectedTeam}
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
            id="startDateInput"
            type="date"
            label="Start Date"
            fluid
            defaultValue={this.state.sprintData.startDate}
            onChange={e => this.handleStartDateChange(e.target.value)}
          />
          <Input
            id="endDateInput"
            type="date"
            label="End  Date:"
            fluid
            defaultValue={this.state.sprintData.endDate}
            onChange={e => this.handleEndDateChange(e.target.value)}
          />
        </div>
        <br />

        <Message
          color="red"
          list={this.state.errorMessage}
          hidden={this.state.errorMessage.length > 0 ? false : true}
        />
        <Button onClick={() => this.validateInput()}>Next</Button>
      </Segment>
    );
  }
}

export default SprintDetails;
