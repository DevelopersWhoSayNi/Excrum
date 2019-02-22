import React, { Component } from 'react';
import { Form, Input, Segment, Divider, Icon } from 'semantic-ui-react';
import TeamMembersList from '../../team/teamCreate/TeamMembersList';
require('../Team.css');

class CreateTeamForm extends Component {
  render() {
    return (
      <div className="MainForm">
        <Segment padded>
          <Form>
            <label>Create Team: </label>
            <Divider />

            <div className="Section">
              <label>Team Name:</label>
              <Input transparent placeholder=" name" />

              <label>root iteration path: </label>
              <Input transparent placeholder="ExactOnline\Fintech\Fintech\" />
              <br />
              <br />
              <label>Number of weeks in one sprint</label>
              <Input transparent placeholder=" 2" />
            </div>

            <div className="Section">
              <label>Team members: </label>
              <TeamMembersList />
            </div>

            <br />
            <br />
            <Divider />
            <Form.Button>Create</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateTeamForm;
