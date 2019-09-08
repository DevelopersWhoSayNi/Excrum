import React from 'react';
import { Button } from 'semantic-ui-react';
import DragDropList from './DragDropList';

const TasksForm = props => {
  return (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <DragDropList />
      </div>
      <div>
        <Button onClick={() => props.handleNavigateTabs(1)}>Back</Button>
        <Button onClick={() => props.handleNavigateTabs(3)}>Next</Button>
      </div>
    </div>
  );
};

export default TasksForm;
