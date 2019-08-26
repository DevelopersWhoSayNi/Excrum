import React from 'react';
import { Form, Label, Select, Input } from 'semantic-ui-react';

const options = [
    { key: 'm', text: 'FinTech', value: 'FinTech' },
    { key: 'f', text: 'Exact Finance', value: 'EF' },
    { key: 'c', text: 'Customer Intelligence', value: 'DSCI' }
];

const DatesAndTitle = props => {
  return (
    <Form>
      <Form.Field inline>
        <label>Team</label>
        <Select label="Team" options={options} />
      </Form.Field>
      <Form.Field inline>
        <Input label="Sprint Number" placeholder="#" />
        <Label style={{"marginTop": '4px', "marginLeft": '-0.5px'}}>
          {props.iterationPath}
        </Label>
      </Form.Field>
      <Form.Field inline>
        <Input type="date" label="Start" />
        <Input type="date" label="End" />
      </Form.Field>
      <Form.Button onClick={() => props.Next()}>Next</Form.Button>
    </Form>
  );
}

export default DatesAndTitle;