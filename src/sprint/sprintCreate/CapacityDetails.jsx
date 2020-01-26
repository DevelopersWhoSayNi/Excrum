import React, { Component, createRef } from 'react';
import {
  Button,
  List,
  Message,
  Modal,
  Input,
  Ref,
  Rail,
  Sticky,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import MemberCapacityCalendar from './MemberCapacityCalendar';
import CapacitySummery from './CapacitySummery';
import { CreateMembersCapacityList } from '../Tools';
import GetMembersCapacityList, {
  GroupMembersByRole
} from './api/GetMembersCapacityList';
require('../Sprint.css');

export class CapacityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showValidationError: true,
      sprintData: this.props.sprintData,
      OpenModal: false,
      updateHours: {
        memberId: 0,
        DayToBeModified: null,
        CurrentValue: 0,
        UpdatedValue: 0
      }
    };
  }

  componentDidUpdate() {
    this.props.updateSprintData(this.state.sprintData);
  }

  componentDidMount() {
    if (this.refreshCapacityCalendar()) {
      GetMembersCapacityList(this.state.sprintData.team.members).then(
        response => {
          const workDaysList = CreateMembersCapacityList(
            response,
            this.state.sprintData.startDate,
            this.state.sprintData.endDate
          );

          let newSprintDetails = {
            ...this.state.sprintData.team,
            members: workDaysList
          };

          newSprintDetails = {
            ...this.state.sprintData,
            team: newSprintDetails
          };

          this.setState({
            sprintData: newSprintDetails,
            loading: false
          });
        }
      );
    } else {
      this.setState({ sprintData: this.props.sprintData, loading: false });
    }
  }

  refreshCapacityCalendar() {
    if (this.state.sprintData.team.members[0].capacityHours === undefined) {
      return true;
    }
    return false;
  }

  modifyDayHours = props => {
    this.setState({
      OpenModal: true,
      updateHours: {
        memberId: props.memberId,
        DayToBeModified: props.date,
        CurrentValue: props.CurrentValue
      }
    });
  };

  updateDayHours = () => {
    if (
      this.state.updateHours.UpdatedValue === '' ||
      this.state.updateHours.UpdatedValue === undefined
    ) {
      this.setState({ showValidationError: false });
      return;
    }

    const newMembers = this.state.sprintData.team.members;

    for (let i = 0; i < newMembers.length; i++) {
      if (newMembers[i].id === this.state.updateHours.memberId) {
        for (let j = 0; j < newMembers[i].capacityHours.length; j++) {
          if (
            newMembers[i].capacityHours[j].date ===
            this.state.updateHours.DayToBeModified
          ) {
            newMembers[i].capacityHours[j].hours = Number(
              this.state.updateHours.UpdatedValue
            );
            break;
          }
        }
        break;
      }
    }

    const newState = {
      ...this.state.sprintData,
      members: newMembers
    };
    this.setState({ newState });
    this.setState({ OpenModal: false });
  };

  closeModal = () => this.setState({ OpenModal: false });

  handleHoursValueUpdate = value => {
    if (value > 24 || isNaN(value)) {
      this.setState({ showValidationError: false });
    } else {
      this.setState({ showValidationError: true });

      const newUpdatedHourValue = {
        ...this.state.updateHours,
        UpdatedValue: value
      };

      this.setState({
        updateHours: newUpdatedHourValue
      });
    }
  };

  capacityList() {
    if (this.state.loading) {
      return (
        <Dimmer active={this.state.loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    } else {
      let result = [];
      const membersGroupedByRole = GroupMembersByRole(
        this.state.sprintData.team.members
      );

      membersGroupedByRole.forEach(group => {
        result.push(
          <div key={group.role === undefined ? 1 : group.role}>
            {group.role === undefined ? null : <h3>{group.role}</h3>}
            <List horizontal selection>
              <MemberCapacityCalendar
                groupName={group.role}
                members={group.members}
                modifyDayHours={this.modifyDayHours}
                startDate={this.state.sprintData.startDate}
                endDate={this.state.sprintData.endDate}
              />
            </List>
          </div>
        );
      });

      return result;
    }
  }

  contextRef = createRef();

  render() {
    const validationErrorMessage =
      'Entered must be at leas one digit less than 24';
    return (
      <div>
        <Modal
          size="mini"
          open={this.state.OpenModal}
          onClose={this.closeModal}
        >
          <Modal.Header>Update Hours</Modal.Header>
          <Modal.Content>
            <p>Adjust the hours for {this.state.updateHours.DayToBeModified}</p>
            <Input
              id="hoursInput"
              placeholder={this.state.updateHours.CurrentValue}
              onChange={e => this.handleHoursValueUpdate(e.target.value)}
            />
            <Message color={'red'} hidden={this.state.showValidationError}>
              {validationErrorMessage}
            </Message>
          </Modal.Content>
          <Modal.Actions>
            <Button negative content="Cancel" onClick={this.closeModal} />
            <Button
              disabled={!this.state.showValidationError}
              positive
              content="Update"
              onClick={this.updateDayHours}
            />
          </Modal.Actions>
        </Modal>

        <Ref innerRef={this.contextRef}>
          <Rail position="right">
            <Sticky
              bottomOffset={50}
              context={this.contextRef}
              offset={50}
              pushing
            >
              <CapacitySummery
                membersList={this.state.sprintData.team.members}
              />
            </Sticky>
          </Rail>
        </Ref>

        {this.capacityList()}
      </div>
    );
  }
}

const CapacityDetailsStep = props => {
  let newSprintData = null;
  const updateSprintData = sprintData => {
    newSprintData = sprintData;
  };

  return (
    <div>
      <CapacityDetails {...props} updateSprintData={updateSprintData} />
      <Button onClick={() => props.handleNavigateTabs(0)}>Back</Button>
      <Button
        onClick={() => {
          props.updateCapacityDetail(newSprintData.team);
          props.handleNavigateTabs(2);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default CapacityDetailsStep;
