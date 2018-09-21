import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UpdateUserAuthStatus } from '../UserActions';
import { Modal, Header, Button, Form } from 'semantic-ui-react';
import BackgroundImage from '../ExactOfficeBG.jpg';
import CreateUser from './CreateUser';

class UserCreateForm extends Component {
  state = {
    navigateTo: false,
    userID: null,
    name: null,
    email: null,
    password: null
  };

  register = () => {
    this.validateInput();
    const userInfo = {
      userID: this.state.userID,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    CreateUser(userInfo)
      .then(() => {
        this.props.UpdateUserAuthStatus(true);
        this.navigateTo('/profile');
      })
      .catch(response => {
        console.log('failed to register' + response);
      });
    // this.props.UpdateUserAuthStatus(true);
    // this.setState({ redirectToDashboard: true });
  };

  validateInput = () => {
    // if(this.state.userID)
  };

  navigateTo = routeName => this.setState({ navigateTo: routeName });

  userIdInput = e => this.setState({ userID: e.target.value });
  nameInput = e => this.setState({ name: e.target.value });
  emailInput = e => this.setState({ email: e.target.value });
  passwordInput = e => this.setState({ password: e.target.value });

  render() {
    const { navigateTo } = this.state;
    if (navigateTo) {
      return <Redirect to={navigateTo} />;
    }

    return (
      <div
        style={{ backgroundImage: `url(${BackgroundImage})`, height: '660px' }}
      >
        <Modal
          open
          onClose={() => this.navigateTo('/')}
          dimmer="blurring"
          style={{ height: '42%' }}
        >
          <Modal.Content>
            <Form>
              <Header>Register new user</Header>
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

export default connect(
  null,
  { UpdateUserAuthStatus }
)(UserCreateForm);
