import React, { Component, createRef } from 'react';
import {
  Button,
  Segment,
  List,
  Message,
  Modal,
  Input,
  Ref,
  Rail,
  Sticky
} from 'semantic-ui-react';
import MemberCapacityCalendar from './MemberCapacityCalendar';
import CapacitySummery from './CapacitySummery';
import { GetTotalHours, CreateMembersCapacityList } from './Tools';
import GetMembersCapacityList from './api/GetMembersCapacityList';
require('../Sprint.css');

class CapacityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalHours: 0,
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

  componentDidMount() {
    GetMembersCapacityList(this.state.sprintData.team.members).then(
      response => {
        const workDaysList = CreateMembersCapacityList(
          response,
          this.state.sprintData.startDate,
          this.state.sprintData.endDate
        );

        const totalHours = GetTotalHours(response);

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
          totalHours: totalHours,
          loading: false
        });
        this.props.updateSprintDetails(newSprintDetails);
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

    const totalHours = GetTotalHours(this.state.sprintData.team.members);

    const newState = {
      ...this.state.sprintData,
      members: newMembers
    };
    this.setState({ newState });
    this.setState({ OpenModal: false, totalHours: totalHours });
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
      return <div>loading...</div>;
    } else {
      return (
        <List horizontal selection>
          <MemberCapacityCalendar
            // groupName={'DSCI'}
            members={this.state.sprintData.team.members}
            modifyDayHours={this.modifyDayHours}
            startDate={this.state.sprintData.startDate}
            endDate={this.state.sprintData.endDate}
          />
        </List>
      );
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
              <Segment>
                <CapacitySummery
                  title="Team total Capacity"
                  value={this.state.totalHours}
                />
              </Segment>
            </Sticky>
          </Rail>
        </Ref>

        <Segment>
          {this.capacityList()}

          <h4>Team members availability</h4>
          <Button onClick={() => this.props.handleNavigateTabs(0)}>Back</Button>
          <Button onClick={() => this.props.handleNavigateTabs(2)}>Next</Button>
        </Segment>
      </div>
    );
  }
}

export default CapacityDetails;
