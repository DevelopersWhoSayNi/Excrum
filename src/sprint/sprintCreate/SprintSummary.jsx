import React from 'react';
import { Button } from 'semantic-ui-react';
import CapacitySummery from './CapacitySummery';
import Axios from 'axios';

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
      <CapacitySummery membersList={props.sprintData.team.members} />

      <h4>Capacity:</h4>
      <h4>Estimated Effort:</h4>
      <h4>Efforts planned:</h4>

      <Button onClick={() => props.handleNavigateTabs(2)}>Back</Button>
      <Button primary onClick={() => CreateSprint(props)}>
        Create
      </Button>
    </div>
  );
};

export default SprintSummary;
