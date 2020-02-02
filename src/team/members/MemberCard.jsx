import React, { Component } from 'react';
import { Modal, Header, Button, Form, Image } from 'semantic-ui-react';
import UserImageModal from '../../user/userCreate/UserImageModal';

class MemberCard extends Component {
  constructor() {
    super();

    this.state = {
      navigateTo: false,
      userID: null,
      name: null,
      email: null,
      password: null,
      userImage: null
    };

    this.SaveNewUserProfilePhoto = this.SaveNewUserProfilePhoto.bind(this);
  }

  register = () => {
    //   this.validateInput();
    //   const userInfo = {
    //     userID: this.state.userID,
    //     name: this.state.name,
    //     email: this.state.email,
    //     password: this.state.password,
    //     photo: this.state.userImage
    //   };

    //   CreateUser(userInfo)
    //     .then(Response => {
    //       this.props.UpdateUserAuthStatus(Response);
    //       this.navigateTo('/profile');
    //     })
    //     .catch(response => {
    //       console.log('failed to register' + response);
    //     });

    //   // this.props.UpdateUserAuthStatus(true);
    //   // this.setState({ redirectToDashboard: true });
    // };

    // validateInput = () => {
    //   // if(this.state.userID)

    console.log('registring');
  };

  navigateTo = routeName => this.setState({ navigateTo: routeName });

  userIdInput = e => this.setState({ userID: e.target.value });
  nameInput = e => this.setState({ name: e.target.value });
  emailInput = e => this.setState({ email: e.target.value });
  passwordInput = e => this.setState({ password: e.target.value });

  SaveNewUserProfilePhoto(photo) {
    if (photo) {
      this.setState({ userImage: photo });
    }
  }

  handleModalDisplay = v => {
    this.props.handleModalDisplay(v);
  };

  render() {
    return (
      <div>
        <Modal
          open={this.props.openNewMemberModal}
          onClose={() => this.handleModalDisplay(false)}
          dimmer="blurring"
        >
          <Modal.Content>
            <Form>
              <Header>Create new member</Header>
              <Image
                size="medium"
                src={this.state.userImage}
                label={
                  <UserImageModal
                    handleSave={this.SaveNewUserProfilePhoto}
                    currentImage={this.state.userImage}
                    headerMessage="Select a new profile pictuer"
                  />
                }
              />
              <br />
              <br />
              <br />
              <br />
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="e.g:  Your.fullName@exact.com"
                  pattern=".+@exact.com"
                  size="30"
                  required
                  onChange={e => this.emailInput(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Employee ID</label>
                <input
                  placeholder="e.g:  ABCD123456"
                  onChange={e => this.userIdInput(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Display Name</label>
                <input onChange={e => this.nameInput(e)} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  required
                  onChange={e => this.passwordInput(e)}
                />
              </Form.Field>
              <Button.Group floated="right">
                <Button positive type="submit" onClick={this.register}>
                  Register
                </Button>
                <Button.Or />
                <Button onClick={() => this.navigateTo('login')}>Login</Button>
              </Button.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default MemberCard;
