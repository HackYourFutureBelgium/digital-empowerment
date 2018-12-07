import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from '@blueprintjs/core';
import APIComponent from '../APIComponent';
import ConfirmationContent from '../ConfirmationContent';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import User from '../../models/User';

class UserRow extends APIComponent {
  state = {
    deletingUser: false,
    requestStates: {
      updateUser: INACTIVE,
      deleteUser: INACTIVE
    }
  }

  updateUserRole = (e) => {
    this.setRequestState({ updateUser: IS_LOADING });

    const { id } = this.props.user;
    const { updateUser } = this.props;
    this.api.users.update(id, { role: e.currentTarget.value })
      .then(async (updatedUser) => {
        const user = new User(updatedUser);
        await updateUser(user);
        this.setRequestState({ updateUser: INACTIVE });
      })
      .catch(() => this.setRequestState({ updateUser: HAS_ERRORED }));
  }

  deleteUser = () => {
    this.setRequestState({ deleteUser: IS_LOADING });

    const { id } = this.props.user;
    const { deleteUser } = this.props;
    this.api.users.delete(id)
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
    const { requestStates, deletingUser } = this.state;
    const { user } = this.props;

    const userIsUpdating = requestStates.updateUser === IS_LOADING;

    return (
      <tr>
        <td>{user.email}</td>
        <td>
          <div className="bp3-select">
            <select
              defaultValue={user.role}
              onChange={this.updateUserRole}
              disabled={userIsUpdating}
            >
              <option value="user">User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </td>
        <td>
          <Popover
            enforceFocus={false}
            isOpen={deletingUser}
            onClose={this.cancelUserDeletion}
            position="bottom-right"
            popoverClassName="bp3-popover-content-sizing"
          >
            <Button icon="trash" minimal onClick={this.startDeletingUser} disabled={userIsUpdating} />
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
