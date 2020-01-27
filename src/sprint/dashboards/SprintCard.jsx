import React, { Component } from 'react';
import { Segment, List, Image, Input } from 'semantic-ui-react';

const membersListOverview = membersList => {
  const members = membersList.map((member, i) => {
    return (
      <List.Item key={i}>
        <Image avatar src={member.photoSrc} />
      </List.Item>
    );
  });

  return <List horizontal>{members}</List>;
};

class SprintCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: this.props.isEditMode,
      sprint: this.props.sprint
    };
  }

  // componentDidUpdate() {
  //   this.setState({ sprint: this.props.sprint });
  // }

  openCapacityDetailsModal() {
    this.props.openCapacityDetailsModal();
  }

  handleSprintNumberChange(value) {
    const newSprintDetails = { ...this.state.sprint, sprintNumber: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
  }

  handleEffortsPlannedChange(value) {
    const newSprintDetails = { ...this.state.sprint, effortEstimated: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
  }

  handleEffortsAddedChange(value) {
    const newSprintDetails = { ...this.state.sprint, effortAdded: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
  }

  handleEffortsDeliveredChange(value) {
    const newSprintDetails = { ...this.state.sprint, effortDelivered: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
  }

  handleStartDateChange(value) {
    const newSprintDetails = { ...this.state.sprint, startDate: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
    this.props.markCapacityDateUpdated();
  }

  handleEndDateChange(value) {
    const newSprintDetails = { ...this.state.sprint, endDate: value };
    this.setState({ sprint: newSprintDetails });
    this.props.updateSprintData(newSprintDetails);
    this.props.markCapacityDateUpdated();
  }

  render() {
    return (
      <Segment className="SprintCard">
        <div onClick={x => this.openCapacityDetailsModal()}>
          <h3>{this.state.sprint.team.teamName}</h3>
          {membersListOverview(this.state.sprint.team.members)}
        </div>
        <div>
          <h3
            className={this.props.capacityIsDirty ? 'DirtyCapacity' : ''}
            onClick={x => this.openCapacityDetailsModal()}
          >
            Capacity: {this.props.sprint.capacity}
          </h3>
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput"
              label="Efforts Planned:"
              fluid
              placeholder={this.state.sprint.effortEstimated}
              onChange={e => this.handleEffortsPlannedChange(e.target.value)}
            />
          ) : (
            <h3>Efforts Planned: {this.state.sprint.effortEstimated}</h3>
          )}
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput"
              label="Efforts Added:"
              fluid
              placeholder={this.state.sprint.effortAdded}
              onChange={e => this.handleEffortsAddedChange(e.target.value)}
            />
          ) : (
            <h3>Efforts Added: {this.state.sprint.effortAdded}</h3>
          )}
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput"
              label="Efforts Delivered:"
              fluid
              placeholder={this.state.sprint.effortDelivered}
              onChange={e => this.handleEffortsDeliveredChange(e.target.value)}
            />
          ) : (
            <h3>Efforts Delivered: {this.state.sprint.effortDelivered}</h3>
          )}
        </div>
        <div>
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput"
              label="Sprint Number:"
              fluid
              placeholder={this.state.sprint.sprintNumber}
              onChange={e => this.handleSprintNumberChange(e.target.value)}
            />
          ) : (
            <h3>Sprint Number: {this.state.sprint.sprintNumber}</h3>
          )}
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput"
              id="startDateInput"
              type="date"
              label="Start Date"
              defaultValue={this.state.sprint.startDate}
              onChange={e => this.handleStartDateChange(e.target.value)}
            />
          ) : (
            <h3>Start Date: {this.state.sprint.startDate}</h3>
          )}
        </div>
        <div className={this.state.isEditMode ? 'SecondRowSecondColumn' : ''}>
          <h3 className={this.state.isEditMode ? 'divider' : ''}>
            ----------------------------
          </h3>
          {this.state.isEditMode ? (
            <Input
              className="SprintEditInput SecondColumn"
              id="endDateInput"
              type="date"
              label="End Date"
              defaultValue={this.state.sprint.endDate}
              onChange={e => this.handleEndDateChange(e.target.value)}
            />
          ) : (
            <h3>End Date: {this.state.sprint.endDate}</h3>
          )}
        </div>
      </Segment>
    );
  }
}

export default SprintCards;
