import React, { Component, createRef } from 'react';
import { Button, Ref, Rail, Sticky, Dimmer, Loader } from 'semantic-ui-react';
import DragDropList from './DragDropList';
import CapacitySummery from './CapacitySummery';

class TasksForm extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();

    this.state = { lastSprintData: null };
  }

  render() {
    return (
      <div>
        <Dimmer active={this.state.loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Ref innerRef={this.canvasRef}>
          <Rail position="right">
            <Sticky
              bottomOffset={50}
              context={this.canvasRef}
              offset={50}
              pushing
            >
              <CapacitySummery
                membersList={this.props.sprintData.team.members}
              />
            </Sticky>
          </Rail>
        </Ref>

        <div style={{ display: 'inline-flex' }}>
          <DragDropList />
        </div>

        <br />
        <br />
        <Button onClick={() => this.props.handleNavigateTabs(1)}>Back</Button>
        <Button onClick={() => this.props.handleNavigateTabs(3)}>Next</Button>
      </div>
    );
  }
}

export default TasksForm;
