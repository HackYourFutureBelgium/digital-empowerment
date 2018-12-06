import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import User from '../../models/User';

class UserRow extends Component {
  state = {
    updatingUser: false,
    deletingUser: false
  }

  startUpdatingUser = () => {
    this.setState({ updatingUser: true });
  }

  cancelUserUpdates = () => {
    this.setState({ updatingUser: false });
  }

  startDeletingUser = () => {
    this.setState({ deletingUser: true });
  }

  cancelUserDeletion = () => {
    this.setState({ deletingUser: false });
  }

  render() {
    const { updatingUser, deletingUser } = this.state;
    const { user } = this.props;

    return (
      <tr>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <Button icon="edit" minimal onClick={this.startUpdatingUser} />
          <Button icon="trash" minimal onClick={this.startDeletingUser} />
        </td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserRow;
