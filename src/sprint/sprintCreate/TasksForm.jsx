import React from 'react';
import { Form } from 'semantic-ui-react';

const TasksForm = () => {
  return (
    <Form>
      <Form.Field inline>
        <label>Tasks from TFS</label>
      </Form.Field>
      <Form.Button>Done</Form.Button>
    </Form>
  );
}

export default TasksForm;