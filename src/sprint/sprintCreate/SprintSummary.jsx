import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';
import CapacitySummery from './CapacitySummery';
import { RemoveMembersPhoto } from './Tools';
import Axios from 'axios';

const CreateSprint = props => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/sprints';

  //remove users profile photos as they are redundant.
  const cleanedUpSprintData = RemoveMembersPhoto(props.sprintData);
  return Axios.post(url, cleanedUpSprintData)
    .then(response => {
      UpdateTeamsLastSprintId(
        props.sprintData.team.teamID,
        response.data.body.sprintId
      );
      console.log('done' + response.data.body.sprintId);
    })
    .catch(error => {
      console.log('Failed');
    });
};

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

class SprintSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintCreatedBanner: true
    };
  }

  createSprint() {
    CreateSprint(this.props).then(() => {
      this.setState({ sprintCreatedBanner: false });
    });
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

        <CapacitySummery membersList={this.props.sprintData.team.members} />

        <h4>Capacity:</h4>
        <h4>Estimated Effort:</h4>
        <h4>Efforts planned:</h4>

        <Button onClick={() => this.props.handleNavigateTabs(2)}>Back</Button>
        <Button primary onClick={() => this.createSprint()}>
          Create
        </Button>
      </div>
    );
  }
}

export default SprintSummary;
