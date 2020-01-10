import React from 'react';
import { Button } from 'semantic-ui-react';
import { GetTotalHours } from './Tools';

const SprintSummary = props => {
  return (
    <div>
      <h1>Two Sprints ago:</h1>
      <h1>Last Sprint:</h1>
      <h2>New Sprint</h2>

      <h3>Total Capacity hours</h3>
      <h3>{GetTotalHours(props.CapacityDetails.groups, 'total')}</h3>

      <Button onClick={() => props.handleNavigateTabs(2)}>Back</Button>
      <Button>Done</Button>
    </div>
  );
};

export default SprintSummary;
