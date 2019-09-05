import React, { Component } from 'react';
import { Button, Segment, List, Modal, Input } from 'semantic-ui-react';
import { FormatDate } from './DateFormat';
import MemberCapacityCalendar from './MemberCapacityCalendar';
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

  updateDayHours = props => {
    const newMembers = this.state.CapacityDetails.members;

    for (let i = 0; i < newMembers.length; i++) {
      if (newMembers[i].id === this.state.updateHours.memberId) {
        for (let j = 0; j < newMembers[i].capacityHours.length; j++) {
          if (
            newMembers[i].capacityHours[j].date ===
            this.state.updateHours.DayToBeModified
          ) {
            newMembers[i].capacityHours[
              j
            ].hours = this.state.updateHours.UpdatedValue;
            //break;
          }
        }
        //break;
      }
    }

    const newState = { ...this.state.capacityHours, members: newMembers };
    this.setState({ newState });
    this.setState({ OpenModal: false });
  };

  closeModal = () => this.setState({ OpenModal: false });

  handleHoursValueUpdate = value => {
    debugger;
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
            <Button
              positive
              content="Update"
              onClick={e => this.updateDayHours(e)}
            />
          </Modal.Actions>
        </Modal>

        <Segment>
          <List horizontal selection>
            <List.Item>
              <h1>DE</h1>
              <List selection verticalAlign="middle">
                <MemberCapacityCalendar
                  members={this.state.CapacityDetails.members}
                  modifyDayHours={this.modifyDayHours}
                />
              </List>
            </List.Item>
            <List.Item>
            <h1>DS</h1>
              <List selection verticalAlign="middle">
                <MemberCapacityCalendar
                  members={this.state.CapacityDetails.members}
                  modifyDayHours={this.modifyDayHours}
                />
              </List>
            </List.Item>
          </List>

          <label>Team members availability</label>
          <Button>Next</Button>
          <Button onClick={() => this.props.handleNavigateTabs(0)}>Back</Button>
        </Segment>
      </div>
    );
  }
}

export default CapacityDetails;
