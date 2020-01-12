import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { GetTotalHours } from './Tools';

export const SummaryStats = props => {
  return (
    <Segment>
      <h3>Total Capacity</h3>
      <h3>{GetTotalHours(props.CapacityDetails.groups, 'total')} hours</h3>

      <h4>Capacity:</h4>
      <h4>Estimated Effort:</h4>
      <h4>Efforts planned:</h4>
    </Segment>
  );
};

const SprintSummary = props => {
  return (
    <div>
      <SummaryStats {...props} />

      <Button onClick={() => props.handleNavigateTabs(2)}>Back</Button>
      <Button>Done</Button>
    </div>
  );
};

export default SprintSummary;
