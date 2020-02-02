import React, { Component } from 'react';
import { Input, Label, Icon } from 'semantic-ui-react';
require('../Team.css');

const colors = [
  'blue',
  'teal',
  'olive',
  'green',
  'yellow',
  'orange',
  'pink',
  'violet',
  'red',
  'purple',
  'grey',
  'black'
];

class MemberIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="TeamMember">
        <Label as="a" color={colors[this.props.index]} image>
          {/* <img src={profilePictures[props.index]} alt="" /> */}
          {this.props.member.name}
          <Label.Detail>{this.props.member.role}</Label.Detail>
          <Icon name="delete" className="btnClose" />
        </Label>

        <div>
          <label>Days </label>
          <Input
            className="AvailabilityInput"
            transparent
            placeholder="10"
            size="small"
          />
          <br />
          <label>Hours</label>
          <Input
            className="AvailabilityInput"
            transparent
            placeholder="8"
            size="small"
          />
        </div>
      </div>
    );
  }
}

export default MemberIcon;
