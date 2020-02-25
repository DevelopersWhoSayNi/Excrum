import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import UserCreateForm from '../../views/newUser/UserCreateForm';

class CreateNewMember extends Component {
  constructor(props) {
    super(props);
    this.state = { openNewMemberModal: false };

    this.handleModalDisplay = this.handleModalDisplay.bind(this);
  }

  handleModalDisplay(val) {
    this.setState({ openNewMemberModal: val });
  }

  createNewMember(props) {}

  render() {
    return (
      <div onClick={e => this.handleModalDisplay(true)}>
        <Icon size="big" color="green" name="add user" />
        <p>Add New</p>
        <UserCreateForm
          handleModalDisplay={this.handleModalDisplay}
          openNewMemberModal={this.state.openNewMemberModal}
          createNewMember={this.createNewMember}
        />
      </div>
    );
  }
}

export default CreateNewMember;
