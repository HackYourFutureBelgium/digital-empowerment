import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  FormGroup,
  InputGroup,
  Button
} from '@blueprintjs/core';
import cookies from '../../constants';
import * as api from '../../api/user';

import '../../assets/css/login.css';

class Login extends Component {
  state = {
    loginLoading: false,
    email: '',
    password: ''
  };

  login = () => {
    this.setState({ loginLoading: true });

    const { email, password } = this.state;
    const { completeLogin } = this.props;
    api.login(email, password)
      .then((res) => {
        cookies.set('auth', res.token);
        delete res.token;
        cookies.set('user', res);
        completeLogin();
      })
      .catch(error => console.error(error));
  };

  setField = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  render() {
    const { loginLoading, email, password } = this.state;
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
            <Button type="submit" intent="primary" onClick={this.login} loading={loginLoading}>Log in</Button>
          </form>
        </div>
      </Dialog>
    );
  }
}

Login.propTypes = {
  cancelLogin: PropTypes.func.isRequired,
  completeLogin: PropTypes.func.isRequired
};

export default Login;
