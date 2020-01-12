import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown } from 'semantic-ui-react';
import GetTeamDefaultSprintData from './GetSprintData';

const options = [
  { key: 'm', text: 'FinTech', value: 'FinTech' },
  { key: 'f', text: 'Exact Finance', value: 'EF' },
  { key: 'c', text: 'Customer Intelligence', value: 'DSCI' }
];

class SprintDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintData: this.props.sprintData
    };

    this.iterationPath = this.iterationPath.bind(this);
  }

  async componentDidMount() {
    this.setDefaultStartDate();
    // this.setDefaultEndDate();
  }

  iterationPath() {
    const path =
      this.state.sprintData.iterationPath + this.state.sprintData.sprintNumber;
    return path;
  }

  handleTeamChange(e) {
    const selectedTeamSprintData = GetTeamDefaultSprintData(e);
    this.setState({ sprintData: selectedTeamSprintData });
    this.props.updateSprintDetails(selectedTeamSprintData);
  }

  handleSprintNumberChange(value) {
    const newSprintDetails = { ...this.state.sprintData, sprintNumber: value };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(this.state.sprintData);
  }

  handleStartDateChange(date) {
    const newSprintDetails = { ...this.state.sprintData, startDate: date };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(this.state.sprintData);
  }

  handleEndDateChange(date) {
    const newSprintDetails = { ...this.state.sprintData, endDate: date };
    this.setState({ sprintData: newSprintDetails });
    this.props.updateSprintDetails(this.state.sprintData);
  }

  AddZero(num) {
    return num >= 0 && num < 10 ? '0' + num : num + '';
  }

  getCurrentDate(daysToAdd) {
    var now = new Date();
    if (daysToAdd) {
      console.log({ daysToAdd });
      console.log({ now });
      now.setDate(now.getDate() + daysToAdd);
      console.log({ now });
    }

    var strDateTime = [
      [
        now.getFullYear(),
        this.AddZero(now.getMonth() + 1),
        this.AddZero(now.getDate())
      ].join('-')
    ].join(' ');

    console.log({ strDateTime });
    return strDateTime;
  }

  setDefaultStartDate() {
    if (this.props.sprintData.startDate) {
      this.handleStartDateChange(this.props.sprintData.startDate);
    } else {
      this.handleStartDateChange(this.getCurrentDate());
    }
  }

  setDefaultEndDate() {
    if (this.props.sprintData.endDate) {
      this.handleEndDateChange(this.props.sprintData.endDate);
    } else {
      this.handleEndDateChange(
        this.getCurrentDate(this.props.sprintData.sprintLength)
      );
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
            defaultValue={this.state.sprintNumber}
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
