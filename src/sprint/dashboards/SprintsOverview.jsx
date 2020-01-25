import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { RemoveMembersPhoto } from '../Tools';
import Axios from 'axios';

const UpdateTeamsLastSprintId = (teamId, lastSprintId) => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/teams';
  const body = {
    action: 'UpdateLastSprint',
    teamId: teamId,
    lastSprintId: lastSprintId
  };

  Axios.post(url, body)
    .then(response => {
      console.log('done');
    })
    .catch(error => {
      console.log('Failed');
    });
};

class SprintsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintCreatedBanner: true
    };
  }

  clicked() {
    //
  }

  getSprint() {
    //
  }

  render() {
    return (
      <div>
        <Message positive hidden={this.state.sprintCreatedBanner}>
          <Message.Header>Sprint created successfully</Message.Header>
          <p>
            Go to your <b>Sprints</b> page to see an overview of your sprints.
          </p>
        </Message>

        <h4>Xello!</h4>

        <Button onClick={() => this.clicked(2)}>Back</Button>
        <Button primary onClick={() => this.getSprint()}>
          Create
        </Button>
      </div>
    );
  }
}

export default SprintsOverview;
