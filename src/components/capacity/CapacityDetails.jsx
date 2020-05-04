import React, { Component, createRef } from 'react';
import { Segment, List, Image, Label } from 'semantic-ui-react';
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
  Loader,
  Divider
} from 'semantic-ui-react';
import MemberCapacityCalendar from '../members/MemberCapacityCalendar';
import CapacitySummery from './CapacitySummery';
import { CreateMembersCapacityList } from '../../common/Tools';
import GetMembersCapacityList, {
  GroupMembersByRole
} from '../../api/GetMembersCapacityList';
import { GetTotalHours } from '../../common/Tools';
import MemberCard from '../members/MemberCard';
require('../../css/Sprint.css');

export class CapacityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showValidationError: true,
      sprintData: this.props.sprintData,
      OpenModal: false,
      OpenMemberModal: false,
      MemberModalContent: null,
      updateHours: {
        memberId: 0,
        DayToBeModified: null,
        CurrentValue: 0,
        UpdatedValue: 0
      }
    };

    this.openMemberCard = this.openMemberCard.bind(this);
  }

  componentDidMount() {
    if (this.shouldRefreshCapacityCalendar()) {
      this.refreshCapacityCalendar();
    } else {
      this.setState({ sprintData: this.props.sprintData, loading: false });
    }
  }

  componentDidUpdate() {
    this.props.updateSprintData(this.state.sprintData);
  }

  shouldRefreshCapacityCalendar() {
    if (this.state.sprintData.team.members[0].capacityHours === undefined) {
      return true;
    }

    const firsSprintDayDate = this.getFirsSprintDayDate(
      this.state.sprintData.team.members[0].capacityHours
    );

    const lastSprintDayDate = this.state.sprintData.team.members[0]
      .capacityHours[
      this.state.sprintData.team.members[0].capacityHours.length - 1
    ].date;

    if (
      firsSprintDayDate !== this.state.sprintData.startDate ||
      lastSprintDayDate !== this.state.sprintData.endDate
    ) {
      return true;
    }

    return false;
  }

  getFirsSprintDayDate(capacityHours) {
    let result = '';

    for (let i = 0; i < capacityHours.length; i++) {
      if (capacityHours[i].date !== 'blank') {
        result = capacityHours[i].date;
        break;
      }
    }

    return result;
  }

  refreshCapacityCalendar() {
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
                openMemberCard={this.openMemberCard}
                startDate={this.state.sprintData.startDate}
                endDate={this.state.sprintData.endDate}
              />
            </List>
            <br />
            <Divider horizontal section />
            <br />
          </div>
        );
      });

      return result;
    }
  }

  memberOnLeave() {
    const newMembers = this.state.sprintData.team.members;

    for (let i = 0; i < newMembers.length; i++) {
      if (newMembers[i].id === this.state.MemberModalContent.id) {
        for (let j = 0; j < newMembers[i].capacityHours.length; j++) {
          newMembers[i].capacityHours[j].hours = 0;
        }
        break;
      }
    }

    const newState = {
      ...this.state.sprintData,
      members: newMembers
    };
    this.setState({ newState });
    this.setState({ OpenMemberModal: false });
  }

  openMemberCard(event, prop) {
    const target = event.target;
    if (target.parentNode.parentNode.className === 'CalendarDays') {
      return;
    }
    this.setState({ OpenMemberModal: true, MemberModalContent: prop });
  }

  closeModal = () => this.setState({ OpenModal: false });
  closeMemberModal = () => this.setState({ OpenMemberModal: false });

  contextRef = createRef();

  //#TODO move out modals
  //#TODO move out rail

  render() {
    const validationErrorMessage =
      'Entered must be at least one digit less than 24';
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
            <Label circular size="big" color={'red'}>
              <h4 onClick={() => this.handleHoursValueUpdate(0)}>"0"}</h4>
            </Label>
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

        <Modal
          size="mini"
          open={this.state.OpenMemberModal}
          onClose={this.closeMemberModal}
        >
          <Modal.Header>
            {this.state.MemberModalContent === null
              ? null
              : this.state.MemberModalContent.name}
          </Modal.Header>
          <Modal.Content>
            <MemberCard MemberModalContent={this.state.MemberModalContent} />
          </Modal.Content>
          <Modal.Actions>
            <Button content="Cancel" onClick={this.closeMemberModal} />
            <Button
              // disabled={!this.state.showValidationError}
              icon="plane"
              negative
              content="On leave"
              onClick={e => this.memberOnLeave()}
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

//#TODO split / rename to something more understandable 

const CapacityDetailsStep = props => {
  let newSprintData = null;
  const updateSprintData = sprintData => {
    newSprintData = sprintData;
  };

  const updateCapacityHours = () => {
    const membersGroupedByRole = GroupMembersByRole(newSprintData.team.members);
    let capacityDetails = [];

    membersGroupedByRole.map(group => {
      let groupName = newSprintData.team.teamName;
      if (group.role !== undefined) {
        groupName = group.role;
      }

      capacityDetails.push({
        groupName: groupName,
        capacityHours: GetTotalHours(group.members),
        effortsSuggested: 0,
        effortsPlanned: 0,
        effortsAdded: 0,
        effortsDelivered: 0
      });
      return 1;
    });
    newSprintData.capacityDetails = capacityDetails;
    props.updateCapacityDetail(newSprintData);
  };

  return (
    <div>
      <CapacityDetails {...props} updateSprintData={updateSprintData} />
      <Button onClick={() => props.handleNavigateTabs(0)}>Back</Button>
      <Button
        onClick={() => {
          updateCapacityHours();
          props.handleNavigateTabs(2);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default CapacityDetailsStep;
