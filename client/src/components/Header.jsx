import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core';
import Login from './Auth/Login';

import '../assets/css/app-header.css';

class Header extends Component {
  state = {
    isLoggingIn: false
  };

  startLogin = () => {
    this.setState({ isLoggingIn: true });
  }

  cancelLogin = () => {
    this.setState({ isLoggingIn: false });
  }

  render() {
    const { isLoggingIn } = this.state;

    return (
      <Navbar className="app-header" fixedToTop>
        { isLoggingIn
          && <Login cancelLogin={this.cancelLogin} />
        }
        <NavbarGroup align="left">
          <NavbarHeading>Digital Empowerment</NavbarHeading>
          <NavbarDivider />
          <Link to="/"><Button minimal icon="home" text="Home" /></Link>
          <Link to="/paths"><Button minimal icon="path-search" text="Paths" /></Link>
          <Button minimal icon="log-in" text="Log in" onClick={this.startLogin} />
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default Header;
