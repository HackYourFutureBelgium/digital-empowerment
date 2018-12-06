import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, FormGroup, InputGroup
} from '@blueprintjs/core';
import { IS_LOADING } from '../../constants';

class UserForm extends Component {
  state = {
    email: '',
    role: 'user'
  }

  setField = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, role } = this.state;
    const { submit } = this.props;
    submit({ email, role });
  }

  render() {
    const { email, role } = this.state;
    const { isShown, onClose, requestStatus } = this.props;

    return (
      <Dialog
        isOpen={isShown}
        onClose={onClose}
        className="dialog user-form"
        title="Invite a new user"
      >
        <div className="bp3-dialog-body">
          <form onSubmit={this.onSubmit}>
            <FormGroup label="Email" labelFor="user-email" labelInfo="(required)">
              <InputGroup id="user-email" name="email" value={email} onChange={this.setField} />
            </FormGroup>
            <FormGroup label="Role" labelFor="user-role" labelInfo="(administrators have access to user management)">
              <div className="bp3-select">
                <select
                  value={role}
                  onChange={this.setField}
                  id="user-role"
                  name="role"
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </FormGroup>
            <Button type="submit" intent="primary" loading={requestStatus === IS_LOADING}>
              invite user
            </Button>
          </form>
        </div>
      </Dialog>
    );
  }
}

UserForm.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestStatus: PropTypes.number.isRequired
};

export default UserForm;
