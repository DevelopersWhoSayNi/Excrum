import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="App-header-main">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <p className="App-title"> &lt;Excrum/&gt;</p>
      </header>
    </div>
  );
};

export default Header;
