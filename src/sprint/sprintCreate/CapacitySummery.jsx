import React from 'react';
import { GroupMembersByRole } from './api/GetMembersCapacityList';
import { GetTotalHours } from '../Tools';
import { Segment } from 'semantic-ui-react';

const showCapacitySummary = membersList => {
  if (membersList[0].capacityHours === undefined) {
    return 0;
  } else {
    return GetTotalHours(membersList);
  }
};

export const CapacitySummery = props => {
  const membersGroupedByRole = GroupMembersByRole(props.membersList);
  let result = [];

  membersGroupedByRole.forEach(group => {
    result.push(
      <Segment key={group.role === undefined ? 1 : group.role}>
        <h3>{group.role === undefined ? 'Team' : group.role} Capacity:</h3>
        <h3>{showCapacitySummary(group.members)} hours</h3>
      </Segment>
    );
  });

  return result;
};

export default CapacitySummery;
