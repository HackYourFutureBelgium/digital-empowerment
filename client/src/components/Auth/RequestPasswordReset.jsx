import React, { Component } from 'react';
import {
  FormGroup, InputGroup, Button, Card
} from '@blueprintjs/core';
import Header from '../Header';
import * as api from '../../api/users';

import '../../assets/css/password-reset.css';

class RequestPasswordReset extends Component {
  state = {
    email: '',
    resetLoading: false
  };

  setEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  }

  render() {
    const { resetLoading, email } = this.state;

    return (
      <Card elevation={2} className="password-reset">
        <Header />
        <h3>Reset your password</h3>
        <form onSubmit={this.login}>
          <FormGroup label="Registered email" labelFor="login-email">
            <InputGroup type="email" id="login-email" value={email} onChange={this.setEmail} required />
          </FormGroup>
          <Button type="submit" intent="primary" loading={resetLoading}>reset password</Button>
        </form>
      </Card>
    );
  }
}

export default RequestPasswordReset;
