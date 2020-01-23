import React, { createRef } from 'react';
import { Button, Ref, Rail, Sticky } from 'semantic-ui-react';
import DragDropList from './DragDropList';
import CapacitySummery from './CapacitySummery';

const TasksForm = props => {
  let contextRef = createRef();
  return (
    <div>
      <Ref innerRef={contextRef}>
        <Rail position="right">
          <Sticky bottomOffset={50} context={contextRef} offset={50} pushing>
            <CapacitySummery membersList={props.sprintData.team.members} />
          </Sticky>
        </Rail>
      </Ref>

      <div style={{ display: 'inline-flex' }}>
        <DragDropList />
      </div>
      <br />
      <br />
      <Button onClick={() => props.handleNavigateTabs(1)}>Back</Button>
      <Button onClick={() => props.handleNavigateTabs(3)}>Next</Button>
    </div>
  );
};

export default TasksForm;
