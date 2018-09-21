import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h1 className="App-title">Excrum!</h1>
        <h4>
          simple to use application combined with TFS, facilitating the scrum
          teams of Exact.
        </h4>
      </header>
    </div>
  );
};

export default Header;
