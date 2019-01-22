import React, { Component } from 'react';
import { Form, Input, Segment, Divider, Icon } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import TeamMembersList from '../../team/teamCreate/TeamMembersList';
require('../Sprint.css');

class CreateSprintForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      dateTime: '',
      datesRange: ''
    };
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div className="MainForm">
        <Segment padded>
          <Form>
            <label>Create Sprint: </label>
            <Input transparent placeholder=" 2" />

            <Divider />

            <label>Number of weeks in sprint:</label>
            <div className="Section">
              <label>Team members: </label>
              <TeamMembersList />
            </div>

            <Divider />

            <div className="Section">
              <div className="iterationSection">
                <div className="iterationBlock">
                  <label>Sprint number: </label>
                  <br />
                  <Input
                    className="iterationInput"
                    transparent
                    placeholder="0102"
                  />
                </div>

                <div className="iterationBlock">
                  <label>iteration path: </label>
                  <br />
                  <Input
                    className="iterationInput"
                    transparent
                    placeholder="ExactOnline\Fintech\Fintech\Sprint 2019-0405"
                  />
                </div>
              </div>

              <div className="iterationBlock">
                <label>Start and End date </label>
                <DatesRangeInput
                  transparent
                  className="DateRangeInput"
                  clearable
                  name="datesRange"
                  placeholder="From - To"
                  value={this.state.datesRange}
                  iconPosition="left"
                  onChange={this.handleChange}
                />
              </div>
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

export default CreateSprintForm;
