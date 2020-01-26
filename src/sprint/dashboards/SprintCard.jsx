import React from 'react';
import { Segment, List, Image } from 'semantic-ui-react';
import { GetTotalHours } from '../Tools';

const membersListOverview = membersList => {
  const members = membersList.map((member, i) => {
    return (
      <List.Item key={i}>
        <Image avatar src={member.photoSrc} />
      </List.Item>
    );
  });

  return <List horizontal>{members}</List>;
};

export const SprintCards = props => {
  const openCapacityDetailsModal = () => {
    props.openCapacityDetailsModal();
  };

  const updatedCapacity = GetTotalHours(props.sprint.team.members);

  return (
    <Segment className="SprintCard">
      <div onClick={x => openCapacityDetailsModal()}>
        <h3>{props.sprint.team.teamName}</h3>
        {membersListOverview(props.sprint.team.members)}
      </div>
      <div>
        <h3>Capacity: {updatedCapacity}</h3>
        <h3>Efforts Planned: {props.sprint.effortEstimated}</h3>
        <h3>Efforts Added: {props.sprint.effortAdded}</h3>
        <h3>Efforts Delivered: {props.sprint.effortDelivered}</h3>
      </div>
      <div>
        <h3>Sprint Number: {props.sprint.sprintNumber}</h3>
        <h3>Start Date: {props.sprint.startDate}</h3>
      </div>
      <div>
        <h3>----------------------------</h3>
        <h3>End Date: {props.sprint.endDate}</h3>
      </div>
    </Segment>
  );
};

export default SprintCards;
