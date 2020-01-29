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
  state = { sprint: this.props.sprint, isEditMode: this.props.isEditMode };

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

  renderCapacityGroups() {
    const capacityGroups = this.state.sprint.capacityDetails.map(
      (capacityGroup, index) => {
        return (
          <List.Item key={index} className="CapacityListGroupColumn">
            {this.renderCapacityGroup(capacityGroup)}
          </List.Item>
        );
      }
    );

    return (
      <List horizontal selection>
        {capacityGroups}
      </List>
    );
  }

  renderCapacityGroup(capacityGroup) {
    return (
      <div>
        {capacityGroup.groupName}<br/>
        <h3
          className={this.props.capacityIsDirty ? 'DirtyCapacity' : ''}
          onClick={x => this.openCapacityDetailsModal()}
        >
          Capacity: {capacityGroup.capacityHours}
        </h3>
        {this.state.isEditMode ? (
          <Input
            className="SprintEditInput"
            label="Efforts Planned:"
            fluid
            placeholder={capacityGroup.effortsPlanned}
            onChange={e => this.handleEffortsPlannedChange(e.target.value)}
          />
        ) : (
          <h3>Efforts Planned: {capacityGroup.effortsPlanned}</h3>
        )}
        {this.state.isEditMode ? (
          <Input
            className="SprintEditInput"
            label="Efforts Added:"
            fluid
            placeholder={capacityGroup.effortsAdded}
            onChange={e => this.handleEffortsAddedChange(e.target.value)}
          />
        ) : (
          <h3>Efforts Added: {capacityGroup.effortsAdded}</h3>
        )}
        {this.state.isEditMode ? (
          <Input
            className="SprintEditInput"
            label="Efforts Delivered:"
            fluid
            placeholder={capacityGroup.effortsDelivered}
            onChange={e => this.handleEffortsDeliveredChange(e.target.value)}
          />
        ) : (
          <h3>Efforts Delivered: {capacityGroup.effortsDelivered}</h3>
        )}
      </div>
    );
  }

  render() {
    return (
      <Segment className="SprintCard">
        <div onClick={x => this.openCapacityDetailsModal()}>
          <h3>{this.state.sprint.team.teamName}</h3>
          {membersListOverview(this.state.sprint.team.members)}
        </div>
        {this.renderCapacityGroups()}
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
