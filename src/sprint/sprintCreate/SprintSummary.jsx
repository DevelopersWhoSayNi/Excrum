import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { GetTotalHours } from './Tools';
import Axios from 'axios';

export const SummaryStats = props => {
  return (
    <Segment>
      <h3>Total Capacity</h3>
      <h3>{GetTotalHours(props.sprintData.team.members)} hours</h3>

      <h4>Capacity:</h4>
      <h4>Estimated Effort:</h4>
      <h4>Efforts planned:</h4>
    </Segment>
  );
};

const CreateSprint = sprintData => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/sprints';

    //photos are redundant, remove them.

  Axios.post(url, sprintData)
    .then(response => {
      console.log('done' + response);
    })
    .catch(error => {
      console.log('Failed');
    });
};

const SprintSummary = props => {
  return (
    <div>
      <SummaryStats {...props} />

      <Button onClick={() => props.handleNavigateTabs(2)}>Back</Button>
      <Button primary onClick={() => CreateSprint(props)}>
        Create
      </Button>
    </div>
  );
};

export default SprintSummary;
