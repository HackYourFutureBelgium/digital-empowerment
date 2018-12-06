import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from '@blueprintjs/core';
import ConfirmationContent from '../ConfirmationContent';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import User from '../../models/User';
import * as api from '../../api/users';

class UserRow extends Component {
  state = {
    updatingUser: false,
    deletingUser: false,
    requestStates: {
      updateUser: INACTIVE,
      deleteUser: INACTIVE
    }
  }

  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  )

  startUpdatingUser = () => {
    this.setState({ updatingUser: true });
  }

  cancelUserUpdates = () => {
    this.setState({ updatingUser: false });
  }

  deleteUser = () => {
    this.setRequestState({ deleteUser: IS_LOADING });

    const { id } = this.props.user;
    const { deleteUser } = this.props;
    api.deleteUser(id)
      .then(() => deleteUser(id))
      .catch(() => this.setRequestState({ deleteUser: HAS_ERRORED }));
  }

  startDeletingUser = () => {
    this.setState({ deletingUser: true });
  }

  cancelUserDeletion = () => {
    this.setState({ deletingUser: false });
  }

  render() {
    const { requestStates, updatingUser, deletingUser } = this.state;
    const { user } = this.props;

    return (
      <tr>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <Button icon="edit" minimal onClick={this.startUpdatingUser} />
          <Popover
            enforceFocus={false}
            isOpen={deletingUser}
            onClose={this.cancelUserDeletion}
            position="bottom-right"
            popoverClassName="bp3-popover-content-sizing"
          >
            <Button icon="trash" minimal onClick={this.startDeletingUser} />
            <ConfirmationContent
              message={(
                <p>
                  Are you sure you want to delete this user?
                  They will lose access to the application.
                </p>
              )}
              cancel={this.cancelUserDeletion}
              accept={this.deleteUser}
              isLoading={requestStates.deleteUser === IS_LOADING}
            />
          </Popover>
        </td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default UserRow;
