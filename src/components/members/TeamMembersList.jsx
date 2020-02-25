import React, { Component } from 'react';
// import { Input, Label, Icon } from 'semantic-ui-react';
import MemberCard from './MemberCard2';
import MemberIcon from './MemberIcon';
require('../../css/Team.css');

class TeamMembersList extends Component {
  constructor(props) {
    super(props);
    // this.state = { teamMembers: TestSetUsers };
    this.state = { teamMembers: [] };
  }

  createNewTeamMember(newMember) {
    let memberList = this.state.teamMembers;
    memberList.push(newMember);
    this.setState({ teamMembers: memberList });
  }

  teamMembers() {
    return this.state.teamMembers.map((member, index) => (
      <MemberIcon key={index} member={member} index={index} />
    ));
  }

  render() {
    return (
      <div>
        {this.teamMembers()}
        <div style={{ display: 'inline-flex' }}>
          <MemberCard />
        </div>
      </div>
    );
  }
}

export default TeamMembersList;

// const TestSetUsers = [
//   {
//     name: 'Amir',
//     role: 'SE'
//   },
//   {
//     name: 'Mariane',
//     role: 'SE'
//   },
//   {
//     name: 'Dion',
//     role: 'SE'
//   },
//   {
//     name: 'Amit',
//     role: 'HUX'
//   },
//   {
//     name: 'Masoud',
//     role: 'jakesh'
//   }
// ];
