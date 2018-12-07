import React from 'react';
import {
  FormGroup, InputGroup, Button, Card, Icon
} from '@blueprintjs/core';
import NProgress from 'nprogress';
import APIComponent from '../APIComponent';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import Header from '../Header';

import '../../assets/css/password-reset.css';

class ConfirmPasswordReset extends APIComponent {
  state = {
    password: '',
    confirmationPassword: '',
    passwordHasBeenReset: false,
    error: null,
    requestStates: {
      confirmPasswordReset: INACTIVE
    }
  };

  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  setField = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  confirmPasswordReset = (e) => {
    e.preventDefault();
    const { password, confirmationPassword } = this.state;
    if (password !== confirmationPassword) return this.setState({ error: 'Your passwords don\'t match' });

    this.setState({ error: null });
    this.setRequestState({ confirmPasswordReset: IS_LOADING });

    const { token } = this.props.match.params;
    return this.api.users.confirmPasswordReset(token, password)
      .then((r) => {
        if (r.status !== 204) {
          this.setRequestState({ confirmPasswordReset: INACTIVE });
          return this.setState({
            fatalError: 'This password reset request is either invalid or has expired'
          });
        }
        this.setState({ passwordHasBeenReset: true });
        return this.setRequestState({ confirmPasswordReset: INACTIVE });
      })
      .catch(() => this.setRequestState({ confirmPasswordReset: HAS_ERRORED }));
  }

  render() {
    const {
      requestStates, password, confirmationPassword, error, passwordHasBeenReset, fatalError
    } = this.state;

    const resetLoading = requestStates.confirmPasswordReset === IS_LOADING;

    return (
      <Card elevation={2} className="password-reset">
        <Header />
        <form onSubmit={this.confirmPasswordReset}>
          <h4 className="password-reset__title">Reset your password</h4>
          <FormGroup label="New password" labelFor="password">
            <InputGroup type="password" id="password" name="password" value={password} onChange={this.setField} required />
          </FormGroup>
          <FormGroup label="Confirm new password" labelFor="confirm-password">
            <InputGroup type="password" id="confirm-password" name="confirmationPassword" value={confirmationPassword} onChange={this.setField} required />
          </FormGroup>
          { (error || fatalError) && <p className="danger">{error || fatalError}</p>}
          { passwordHasBeenReset
            && <p className="success"><Icon icon="tick-circle" />Your password was reset and you can now use it to login.</p>
          }
          { !fatalError && !passwordHasBeenReset
            && <Button type="submit" intent="primary" loading={resetLoading}>update password</Button>
          }
        </form>
      </Card>
    );
  }
}

export default ConfirmPasswordReset;
