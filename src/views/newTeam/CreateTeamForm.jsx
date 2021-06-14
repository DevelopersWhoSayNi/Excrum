import React, { Component } from 'react';
import { Form, Input, Segment, Divider } from 'semantic-ui-react';
import TeamMembersList from '../../components/members/TeamMembersList';
require('../../css/Team.css');

class CreateTeamForm extends Component {
  render() {
    return (
      
      <div className="MainForm">
        <h1>Create Team</h1>
        <Segment padded>
          <Form action="" className="createTeam">
            <div className="Section">
              <div className="InputItems">
                <label for="name" >Team Name:</label>
                <Input id="name" type="text" transparent placeholder="Customer Intelligence Team" />
              </div>

              
              
              <div className="InputItems">
                <label for="days">Sprint's length (days): </label>
                <Input id="days" type="number" transparent placeholder="14" />
              </div>
            </div>

            <div className="Section">
              <label>Team members: </label>
              
              
              <TeamMembersList />
            </div>

            
            
            {/* <Divider /> */}
            <Form.Button className="button">Create</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateTeamForm;
