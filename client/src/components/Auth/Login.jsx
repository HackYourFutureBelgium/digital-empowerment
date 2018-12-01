import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Dialog,
  FormGroup,
  InputGroup,
  Button
} from '@blueprintjs/core';
import * as api from '../../api/user';

import '../../assets/css/login.css';

class Login extends Component {
  state = {
    isLoggingIn: false,
    email: '',
    password: ''
  };

  login = async () => {

  };

  setField = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  render() {
    const { isLoggingIn, email, password } = this.state;
    const { cancelLogin } = this.props;

    return (
      <Dialog
        isOpen
        onClose={cancelLogin}
        title="Log in"
        className="dialog"
      >
        <div className="bp3-dialog-body">
          <form>
            <FormGroup label="Email" labelFor="login-email">
              <InputGroup type="email" id="login-email" name="email" value={email} onChange={this.setField} required />
            </FormGroup>
            <FormGroup label="Password" labelFor="login-password">
              <InputGroup type="password" id="login-password" name="password" value={password} onChange={this.setField} required />
            </FormGroup>
            <Button type="submit" intent="primary" onClick={this.login} loading={isLoggingIn}>Log in</Button>
          </form>
        </div>
      </Dialog>
    );
  }
}

Login.propTypes = {
  cancelLogin: PropTypes.func.isRequired
};

export default Login;
