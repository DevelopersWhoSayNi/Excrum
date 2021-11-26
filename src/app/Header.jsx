import React from 'react';
import logo from './logo.svg';
import { Container, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu fixed='top'>
      <Container className="App-header">
        <Link to="/">
          <Menu.Item as='a' header>
            <Image size='mini' src={logo} className="App-logo" style={{ marginRight: '0.5em' }} />
            &lt;Excrum/&gt;
            </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
};

export default Header;
