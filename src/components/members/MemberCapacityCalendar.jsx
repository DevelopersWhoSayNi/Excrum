import React from 'react';
import { Segment, List, Image, Label } from 'semantic-ui-react';
import { WeekdayNames } from '../../common/Tools';
require('../../css/Sprint.css');

//#TODO split day components

const Day = props => {
  const dayColor = () => {
    if (props.day.hours === 0) {
      return 'red';
    } else if (props.day.hours < 8) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  const formatDate = date => {
    var splitted = date.split('-');
    return [splitted[2], splitted[1]].join('/');
  };

  if (props.day.type === 0) {
    return <div></div>;
  } else {
    return (
      <div className="CalendarDays">
        <Label circular size="big" color={dayColor()}>
          <h4 onClick={() => props.modifyDayHours(props)}>{props.day.hours}</h4>
        </Label>
        <div style={{ fontSize: '12px', paddingLeft: '12%' }}>
          {props.day.date === 'blank' ? null : formatDate(props.day.date)}
        </div>
      </div>
    );
  }
};

const Days = props => {
  return props.member.capacityHours.map((day, index) => (
    <Day key={index} day={day} modifyDayHours={props.modifyDayHours} />
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
  const modifyDayHours = selectedNode => {
    const modificationData = {
      date: selectedNode.day.date,
      CurrentValue: selectedNode.day.hours,
      memberId: props.member.id
    };

    props.modifyDayHours(modificationData);
  };

  return (
    <List.Item>
      <Image
        size="tiny"
        avatar
        src={props.member.photoSrc}
        onClick={e => props.openMemberCard(e, props.member)}
      />
      <List.Content>
        <Segment>
          <List.Header>{props.member.name}</List.Header>
          <Calendar
            id="memberCalendar"
            member={props.member}
            modifyDayHours={modifyDayHours}
          />
        </Segment>
      </List.Content>
    </List.Item>
  );
};

const MemberCapacityCalendar = props => {
  return props.members.map((member, index) => (
    <Member
      key={index}
      member={member}
      modifyDayHours={props.modifyDayHours}
      openMemberCard={props.openMemberCard}
    />
  ));
};

export default MemberCapacityCalendar;
