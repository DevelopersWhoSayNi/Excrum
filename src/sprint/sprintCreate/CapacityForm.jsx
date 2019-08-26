import React from 'react';
import { Form } from 'semantic-ui-react';

const CapacityForm = () => {
  return (
    <Form>
      <Form.Field inline>
        <label>Team members availability</label>
      </Form.Field>
      <Form.Button>Next</Form.Button>
    </Form>
  );
}

export default CapacityForm