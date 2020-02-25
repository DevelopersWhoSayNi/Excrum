import React, { Component } from 'react';
import { Form, Input, Segment, Divider } from 'semantic-ui-react';
import TeamMembersList from '../../components/members/TeamMembersList';
require('../../css/Team.css');

class CreateTeamForm extends Component {
  render() {
    return (
      <div className="MainForm">
        <Segment padded>
          <Form>
            <div className="Section">
              <label>Team Name:</label>
              <Input transparent placeholder="name" />

              {/* <label>root iteration path: </label>
              <Input transparent placeholder="ExactOnline\Fintech\Fintech\" /> */}
              <br />
              <br />
              <label>Sprint's length (days): </label>
              <Input transparent placeholder="14" />
            </div>

            <div className="Section">
              <label>Team members: </label>
              <br />
              <br />
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
