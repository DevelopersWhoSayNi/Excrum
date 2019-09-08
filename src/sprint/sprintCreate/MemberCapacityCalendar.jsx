import React from 'react';
import { Segment, List, Image, Label } from 'semantic-ui-react';
import { WeekdayNames } from './DateFormat';
import CapacitySummery from './CapacitySummery';

require('../Sprint.css');

const Day = props => {
  return (
    <div className="CalendarDays">
      <Label circular size="big" color="green">
        <h4 onClick={() => props.modifyDayHours(props)}>{props.hours}</h4>
      </Label>
    </div>
  );
};

const Days = props => {
  return props.member.capacityHours.map((day, index) => (
    <Day
      key={index}
      day={day}
      hours={props.member.capacityHours[index].hours}
      modifyDayHours={props.modifyDayHours}
    />
  ));
};

const DayOfWeek = () => {
  return WeekdayNames.map((day, index) => (
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
        <Days member={props.member} modifyDayHours={props.modifyDayHours} />
      </div>
    </div>
  );
};

export const Member = props => {
  function modifyDayHours(selectedNode) {
    const modificationData = {
      date: selectedNode.day.date,
      CurrentValue: selectedNode.day.hours,
      memberId: props.member.id
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
          <Calendar member={props.member} modifyDayHours={modifyDayHours} />
        </Segment>
      </List.Content>
    </List.Item>
  );
};

const MemberCapacityCalendar = props => {
  return (
    <div>
      {props.members.map((member, index) => (
        <Member
          key={index}
          member={member}
          modifyDayHours={props.modifyDayHours}
        />
      ))}
      <br />
      <CapacitySummery
        title={'Group ' + props.groupName + ' total capacity'}
        value={100}
      />
    </div>
  );
};

export default MemberCapacityCalendar;
