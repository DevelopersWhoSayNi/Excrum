import React, { Component } from 'react';
import { Button, Segment, List, Image, Label, Modal } from 'semantic-ui-react';
require('../Sprint.css');

const Day = props => {
  return (
    <div className="CalendarDays">
      <Label circular size="big" color="green">
        <h4 onClick={() => props.modifyDayHours(props)}>8</h4>
      </Label>
    </div>
  );
};

const Days = props => {
  const sprintDays = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11'
  ];

  return sprintDays.map((day, index) => (
    <Day key={index} day={day} modifyDayHours={props.modifyDayHours} />
  ));
};

const DayOfWeek = () => {
  const weekdayNames = ['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri '];

  return weekdayNames.map((day, index) => (
    <Label size="mini" key={index}>
      {day}
    </Label>
  ));
};

const Calendar = props => {
  return (
    <div className="CalendarBox">
      <div className="day-of-week">
        <DayOfWeek />
      </div>

      <div className="days">
        <Days modifyDayHours={props.modifyDayHours} />
      </div>
    </div>
  );
};

const Member = props => {
  function modifyDayHours(date) {
    const modificationData = {
      date: date.day,
      memberId: props.member.Id
    };

    props.modifyDayHours(modificationData);
  }

  return (
    <List.Item>
      <Image
        size="tiny"
        avatar
        src={require('../../resources/' + props.member.photoSrc)}
      />
      <List.Content>
        <Segment>
          <List.Header>{props.member.name}</List.Header>
          <Calendar modifyDayHours={modifyDayHours} />
        </Segment>
      </List.Content>
    </List.Item>
  );
};

const Members = props => {
  return props.members.map((member, index) => (
    <Member key={index} member={member} modifyDayHours={props.modifyDayHours} />
  ));
};

class CapacityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CapacityDetails: this.props.CapacityDetails,
      OpenModal: false
    };
  }

  // showModal = (size) => () => this.setState({ size, open: true })

  modifyDayHours = props => {
    this.setState({ OpenModal: true });
  };

  closeModal = () => this.setState({ OpenModal: false });

  updateDayHours = props => {
    console.log(props);
    //find the record in the JSON file(state) and update the hour
  };

  render() {
    return (
      <div>
        <Modal
          size="mini"
          open={this.state.OpenModal}
          onClose={this.closeModal}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
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
            <Members
              members={this.state.CapacityDetails.members}
              modifyDayHours={this.modifyDayHours}
            />
          </List>

          <label>Team members availability</label>
          <Button>Next</Button>
          <Button onClick={() => this.props.Back()}>Back</Button>
        </Segment>
      </div>
    );
  }
}

export default CapacityDetails;
