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
      sprintData: this.props.sprintData,
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
    const newMembers = this.state.sprintData.members;

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
              <Segment>
                {/* <h4>
                  {this.state.CapacityDetails.groups[0].groupName} :
                  {GetTotalHours(
                    this.state.CapacityDetails.groups,
                    this.state.CapacityDetails.groups[0].groupName
                  )}
                </h4>
                <h4>
                  {this.state.CapacityDetails.groups[1].groupName} :
                  {GetTotalHours(
                    this.state.CapacityDetails.groups,
                    this.state.CapacityDetails.groups[1].groupName
                  )}
                </h4> */}
                <br />
                ------------------------------------
                <br />
                <CapacitySummery
                  title="Team total Capacity"
                  value={GetTotalHours(this.state.sprintData.members)}
                />
              </Segment>
            </Sticky>
          </Rail>
        </Ref>

        <Segment>
          <List horizontal selection>
            <MemberCapacityCalendar
              groupName={'DSCI'}
              members={this.state.sprintData.members}
              modifyDayHours={this.modifyDayHours}
            />
          </List>

          <h4>Team members availability</h4>
          <Button onClick={() => this.props.handleNavigateTabs(0)}>Back</Button>
          <Button onClick={() => this.props.handleNavigateTabs(2)}>Next</Button>
        </Segment>
      </div>
    );
  }
}

export default CapacityDetails;
