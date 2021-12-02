import React from 'react';
import logo from './logo.svg';
import { Container, Image, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu fixed='top'>
      <Container className="App-header">
        <Menu.Item as={Link} to="/" header>
          <Image size='mini' src={logo} className="App-logo" style={{ marginRight: '0.5em' }} />
          &lt;Excrum/&gt;
          </Menu.Item>
        
        <Menu.Item as={Link} className="menu-item" activeClassName='active' to="/createTeam">Create Team</Menu.Item>
        <Menu.Item as={Link} className="menu-item" activeClassName='active' to="/createSprint">Create Sprint</Menu.Item>
        <Menu.Item as={Link} className="menu-item" activeClassName='active' to="/Sprints">Sprint Overview</Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
