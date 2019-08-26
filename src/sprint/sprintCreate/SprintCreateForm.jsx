import React, { Component } from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import DatesAndTitle from './DatesAndTitle';
import CapacityForm from './CapacityForm';
import TasksForm from './TasksForm';

require('../Sprint.css');

const panes = func => {
  function myFunc() {
    console.log('Zaaart!');
  }

  const iterationPath = "Iteration : Customer Intelligence / Sprint #";

  return [
    { menuItem: 'Dates and Title', render: () => <DatesAndTitle Next={() => myFunc()} iterationPath={iterationPath}/> },
    { menuItem: 'Capacity', render: () => <CapacityForm Next={func} /> },
    { menuItem: 'Tasks', render: () => <TasksForm Next={func} /> }
  ];
}

class CreateSprintForm extends Component {
  state = { activeIndex: 0};

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment compact className="CreateSprint">
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

export default CreateSprintForm;
