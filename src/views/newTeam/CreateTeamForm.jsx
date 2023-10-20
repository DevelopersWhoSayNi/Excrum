import React, { Component } from 'react';
import { Form, Input, Segment, Divider } from 'semantic-ui-react';
import TeamMembersList from '../../components/members/TeamMembersList';
require('../../css/Team.css');

class CreateTeamForm extends Component {
  render() {
    return (
      
      <div className="MainForm">
        <h1 className="dashboardTitle">Create Team</h1>
        <Segment padded className="createTeamForm">
          <Form action="" className="createTeam">
            <div className="Section">

              <Form.Field inline>
                <label className="form-label" >Team Name:</label>
                <Input className="form-input" id="name" type="text" placeholder="Customer Intelligence Team" />
              </Form.Field>

              <br/>
              <br/>

              <Form.Field inline>
                <label className="form-label">Sprint's length (days): </label>
                <Input className="form-input" id="days" type="number" placeholder="14" />
              </Form.Field>

            </div>

            <Form.Field inline>
            <div className="Section">
              <label className="form-label">Team members: </label>
                          
              
              <TeamMembersList />
            </div>
            </Form.Field>
            
            {/* <Divider /> */}
            <Form.Button className="button" floated="right">Submit</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateTeamForm;
