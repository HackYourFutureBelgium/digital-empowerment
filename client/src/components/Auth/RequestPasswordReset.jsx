import React from 'react';
import {
  FormGroup, InputGroup, Button, Card
} from '@blueprintjs/core';
import NProgress from 'nprogress';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import Header from '../Header';
import * as api from '../../api/users';

import '../../assets/css/password-reset.css';

class RequestPasswordReset extends React.Component {
  state = {
    email: '',
    emailSent: false,
    requestStates: {
      requestPasswordReset: INACTIVE
    }
  };

  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  setEmail = (e) => {
    this.setState({ email: e.currentTarget.value });
  }

  requestPasswordReset = () => {
    this.setRequestState({ requestPasswordReset: IS_LOADING });

    const { email } = this.state;
    api.requestPasswordReset(email)
      .then(() => {
        this.setState({ emailSent: true });
        this.setRequestState({ requestPasswordReset: INACTIVE });
      })
      .catch(() => this.setRequestState({ requestPasswordReset: HAS_ERRORED }));
  }

  render() {
    const { requestStates, email, emailSent } = this.state;

    const resetLoading = requestStates.requestPasswordReset === IS_LOADING;

    return (
      <Card elevation={2} className="password-reset">
        <Header />
        {emailSent
          ? (
            <p>Email sent</p>
          )
          : (
            <form onSubmit={this.requestPasswordReset}>
              <FormGroup label="Registered email" labelFor="login-email">
                <InputGroup type="email" id="login-email" value={email} onChange={this.setEmail} required />
              </FormGroup>
              <Button type="submit" intent="primary" loading={resetLoading}>reset password</Button>
            </form>
          )
        }
      </Card>
    );
  }
}

export default RequestPasswordReset;
