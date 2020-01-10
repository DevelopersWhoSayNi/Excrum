import React, { Component, createRef } from 'react';
import {
  Button,
  Segment,
  List,
  Modal,
  Input,
  Ref,
  Rail,
  Sticky
} from 'semantic-ui-react';
import { FormatDate } from './DateFormat';
import MemberCapacityCalendar from './MemberCapacityCalendar';
import CapacitySummery from './CapacitySummery';
import { GetTotalHours } from './Tools';
require('../Sprint.css');

class CapacityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CapacityDetails: this.props.CapacityDetails,
      OpenModal: false,
      updateHours: {
        memberId: 0,
        DayToBeModified: 0,
        CurrentValue: 0,
        UpdatedValue: 0
      }
    };
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
    const newGroups = this.state.CapacityDetails.groups;

    for (let g = 0; g < newGroups.length; g++) {
      const newMembers = newGroups[g].members;

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
              newGroups[g].members = newMembers;
              break;
            }
          }
          break;
        }
      }
    }

    const newState = {
      ...this.state.capacityHours,
      groups: newGroups
    };
    this.setState({ newState });
    this.setState({ OpenModal: false });
  };

  closeModal = () => this.setState({ OpenModal: false });

  handleHoursValueUpdate = value => {
    if (value > 24) {
      return;
    }

    const newUpdatedHourValue = {
      ...this.state.updateHours,
      UpdatedValue: value
    };

    this.setState({
      updateHours: newUpdatedHourValue
    });
  };

  contextRef = createRef();

  render() {
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
              placeholder={FormatDate(this.state.updateHours.CurrentValue)}
              onChange={e => this.handleHoursValueUpdate(e.target.value)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button negative content="Cancel" onClick={this.closeModal} />
            <Button positive content="Update" onClick={this.updateDayHours} />
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
              <Segment className="TotalCapacityDialog">
                <CapacitySummery
                  title="Team total Capacity"
                  value={GetTotalHours(
                    this.state.CapacityDetails.groups,
                    'total'
                  )}
                />
              </Segment>
            </Sticky>
          </Rail>
        </Ref>

        <Segment>
          <List horizontal selection>
            <List.Item style={{ verticalAlign: 'top' }}>
              <h1>Group:</h1>
              <h3>{this.state.CapacityDetails.groups[0].groupName}</h3>
              <List selection verticalAlign="middle">
                <MemberCapacityCalendar
                  groupName={this.state.CapacityDetails.groups[0].groupName}
                  members={this.state.CapacityDetails.groups[0].members}
                  modifyDayHours={this.modifyDayHours}
                  teamTotalHours={GetTotalHours(
                    this.state.CapacityDetails.groups,
                    this.state.CapacityDetails.groups[0].groupName
                  )}
                />
              </List>
            </List.Item>
            <List.Item>
              <h1>Group:</h1>
              <h3>{this.state.CapacityDetails.groups[1].groupName}</h3>
              <List selection verticalAlign="middle">
                <MemberCapacityCalendar
                  groupName={this.state.CapacityDetails.groups[1].groupName}
                  members={this.state.CapacityDetails.groups[1].members}
                  modifyDayHours={this.modifyDayHours}
                  teamTotalHours={GetTotalHours(
                    this.state.CapacityDetails.groups,
                    this.state.CapacityDetails.groups[1].groupName
                  )}
                />
              </List>
            </List.Item>
          </List>

          {/* <DragDropList
            members={this.state.CapacityDetails.members}
            modifyDayHours={this.modifyDayHours}
          /> */}

          <h4>Team members availability</h4>
          <Button onClick={() => this.props.handleNavigateTabs(0)}>Back</Button>
          <Button onClick={() => this.props.handleNavigateTabs(2)}>Next</Button>
        </Segment>
      </div>
    );
  }
}

export default CapacityDetails;
