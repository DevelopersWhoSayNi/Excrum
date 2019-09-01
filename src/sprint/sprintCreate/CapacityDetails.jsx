import React, { Component } from 'react';
import update from 'react-addons-update';
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
        CurrentValue: 0
      }
    };
  }

  modifyDayHours = props => {
    this.setState({
      OpenModal: true,
      updateHours: {
        memberId: props.memberId,
        DayToBeModified: FormatDate(new Date()),
        CurrentValue: props.CurrentValue
      }
    });
  };

  updateDayHours = props => {
    // let memberId = 0;
    // for (
    //   let index = 0;
    //   index < this.state.CapacityDetails.members.length;
    //   index++
    // ) {
    //   const member = this.state.CapacityDetails.members[index];
    //   // if (member.id === this.state.updateHours.memberId) {
    //   //   this.state.CapacityDetails.members[index].capacityHours.hours = 99;
    //   // }
    // }
    debugger;

    // const memberX = this.state.updateHours.memberId;

    this.setState(prevState => ({
      CapacityDetails: {
        ...prevState.CapacityDetails.members,
        [prevState.CapacityDetails.members[1].capacityHours[1].hours]: 99
      }
    }));

    // this.setState({
    //   CapacityDetails: update(this.state.CapacityDetails.members, {
    //     1: { hours: { $set: 99 } }
    //   })
    // });

    // this.setState({
    //   items: update(this.state.items, {
    //     1: { name: { $set: 'updated field name' } }
    //   })
    // });

    //find the record in the JSON file(state) and update the hour
  };

  closeModal = () => this.setState({ OpenModal: false });

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
            <Input placeholder={this.state.updateHours.CurrentValue} />
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
          <List selection verticalAlign="middle">
            <MemberCapacityCalendar
              members={this.state.CapacityDetails.members}
              modifyDayHours={this.modifyDayHours}
            />
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
