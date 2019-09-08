import React from 'react';
import { Button } from 'semantic-ui-react';

const SprintSummary = props => {
  return (
    <div>
      <h1>H!</h1>
      <h2>WH</h2>
      <h3>BPC</h3>

      <Button onClick={() => props.handleNavigateTabs(2)}>Back</Button>
      <Button>Done</Button>
    </div>
  );
};

export default SprintSummary;
