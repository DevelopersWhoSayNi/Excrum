import React, { Component } from 'react';
import { Segment, Form, Input, Select, Tab } from 'semantic-ui-react';
require('../Sprint.css');

const options = [
  { key: 'm', text: 'FinTech', value: 'FinTech' },
  { key: 'f', text: 'Exact Finance', value: 'EF' }
];

const panes = func => {
  function myFunc() {
    console.log('Zaart!');
  }

  return [
    {
      menuItem: 'Dates and Title',
      render: () => <DatesAndTitleForm Next={() => myFunc()} />
    },
    { menuItem: 'Capacity', render: () => <CapacityForm Next={func} /> },
    { menuItem: 'Tasks', render: () => <TasksForm Next={func} /> }
  ];
};

class CreateSprintForm extends Component {
  state = { activeIndex: 0 };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment compact className="CreateSprint">
        {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> */}
        <Tab
          panes={panes(this.handleTabChange)}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
          menu={{ secondary: true, pointing: true }}
        />
      </Segment>
    );
  }
}

const DatesAndTitleForm = Next => {
  return (
    <Form>
      <Form.Field inline>
        <label>Team</label>
        <Select label="Team" options={options} />
      </Form.Field>
      <Form.Field inline>
        <Input label="Sprint Number" placeholder="2018-0102" />
      </Form.Field>
      <Form.Field inline>
        <Input label="Iteration :" placeholder="2018-0102" />
      </Form.Field>
      <Form.Field inline>
        <Input type="date" label="Start" />
        <Input type="date" label="End" />
      </Form.Field>
      <Form.Button onClick={() => Next()}>Next</Form.Button>
    </Form>
  );
};

const CapacityForm = () => {
  return (
    <Form>
      <Form.Field inline>
        <label>Team members availability</label>
      </Form.Field>
      <Form.Button>Next</Form.Button>
    </Form>
  );
};

const TasksForm = () => {
  return (
    <Form>
      <Form.Field inline>
        <label>Tasks from TFS</label>
      </Form.Field>
      <Form.Button>Done</Form.Button>
    </Form>
  );
};

export default CreateSprintForm;
