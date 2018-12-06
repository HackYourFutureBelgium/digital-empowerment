import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Dialog,
  FormGroup,
  InputGroup,
  Button
} from '@blueprintjs/core';
import APIComponent from '../APIComponent';
import { cookies } from '../../constants';
import * as api from '../../api/users';

import '../../assets/css/login.css';

class Login extends APIComponent {
  state = {
    loginLoading: false,
    email: '',
    password: ''
  };

  login = (e) => {
    e.preventDefault();
    this.setState({ loginLoading: true });

    const { email, password } = this.state;
    const { completeLogin } = this.props;
    api.login(email, password)
      .then((res) => {
        cookies.set('auth', res.token);
        delete res.token;
        cookies.set('user', res);
        this.setState({ loginLoading: false });
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
          <form onSubmit={this.login} className="login-form">
            <FormGroup label="Email" labelFor="login-email">
              <InputGroup type="email" id="login-email" name="email" value={email} onChange={this.setField} required />
            </FormGroup>
            <FormGroup label="Password" labelFor="login-password">
              <InputGroup type="password" id="login-password" name="password" value={password} onChange={this.setField} required />
            </FormGroup>
            <div className="login-form__actions">
              <Link to="/reset-password">Forgot your password?</Link>
              <Button type="submit" intent="primary" loading={loginLoading}>Log in</Button>
            </div>
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
