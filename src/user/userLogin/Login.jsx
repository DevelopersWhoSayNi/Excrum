import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UpdateUserAuthStatus } from '../UserActions';
import { Modal, Header, Button, Form, Message } from 'semantic-ui-react';
import BackgroundImage from '../ExactOfficeBG.jpg';
import Authenticate from './Authenticate';

class Login extends Component {
  state = {
    navigateTo: false,
    error: null,
    email: null,
    password: null
  };

  login = () => {
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    Authenticate(userInfo)
      .then(Response => {
        if (Response.Authenticated === true) {
          this.props.UpdateUserAuthStatus(true);
          this.navigateTo(this.getReturnPathName());
        } else {
          this.setState({ error: 'Wrong credentials' });
        }
      })
      .catch(() => {
        this.setState({ error: 'Failed to authenticate' });
      });
  };

  emailInput = e => this.setState({ email: e.target.value });
  passwordInput = e => this.setState({ password: e.target.value });

  getReturnPathName = () => {
    if (this.props.location.state) {
      return this.props.location.state.from.pathname;
    } else {
      return '/';
    }
  };

  navigateTo = routeName => this.setState({ navigateTo: routeName });

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
          style={{ height: '33%' }}
        >
          <Modal.Content>
            <Form>
              {/* <p>You must log in to view the page at {from.pathname}</p> */}
              <Header>Login</Header>
              <Form.Field>
                <label>Email</label>
                <input
                  pattern=".+@exact.com"
                  size="30"
                  required
                  placeholder="e.g:  Your.fullName@exact.com"
                  onChange={this.emailInput}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  required
                  onChange={e => this.passwordInput(e)}
                />
              </Form.Field>
              <Form.Field>
                {this.state.error ? (
                  <Message color="red">{this.state.error}</Message>
                ) : null}
                <Button.Group floated="right">
                  <Button positive type="submit" onClick={e => this.login(e)}>
                    Log in
                  </Button>
                  <Button.Or />
                  <Button onClick={() => this.navigateTo('register')}>
                    Register
                  </Button>
                </Button.Group>
              </Form.Field>
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
)(Login);
