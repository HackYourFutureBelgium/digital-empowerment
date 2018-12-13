import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core';
import { cookies } from '../constants';
import Login from './Auth/Login';
import User from '../models/User';

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

  completeLogin = () => {
    this.setState({ isLoggingIn: false });
    if (this.props.location.pathname.includes('reset-password')) {
      this.props.history.push('/');
    }
  }

  doLogout = () => {
    cookies.remove('auth');
    cookies.remove('user');
  }

  render() {
    const { isLoggingIn } = this.state;
    const { user } = this.props;

    return (
      <Navbar className="app-header" fixedToTop>
        { isLoggingIn
          && <Login cancelLogin={this.cancelLogin} completeLogin={this.completeLogin} />
        }
        <NavbarGroup align="left">
          <NavbarHeading><Link to="/">Digital Empowerment</Link></NavbarHeading>
          <NavbarDivider />
          <Link to="/"><Button minimal icon="home" text="Home" /></Link>
          <Link to="/paths"><Button minimal icon="path-search" text="Paths" /></Link>
          { user && user.isAdmin
            && <Link to="/manage-users"><Button minimal icon="people" text="Manage users" /></Link>
          }
          { user
            ? <Button minimal icon="log-out" text="Log out" onClick={this.doLogout} />
            : <Button minimal icon="log-in" text="Log in" onClick={this.startLogin} />
          }
        </NavbarGroup>
      </Navbar>
    );
  }
}

Header.defaultProps = {
  user: null
};

Header.propTypes = {
  user: PropTypes.instanceOf(User),
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
