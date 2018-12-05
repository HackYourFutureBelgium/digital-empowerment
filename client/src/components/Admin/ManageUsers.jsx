import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NonIdealState, InputGroup, Button, Tag
} from '@blueprintjs/core';
import Header from '../Header';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import * as api from '../../api/users';
import User from '../../models/User';

import '../../assets/css/users.css';

class ManageUsers extends Component {
  state = {
    users: [],
    requestStates: {
      fetchUsers: IS_LOADING
    }
  };

  componentDidMount() {
    api.getUsers()
      .then(async (users) => {
        await this.setState({ users: users.map(u => new User(u)) || [] });
        this.setRequestState({ fetchUsers: INACTIVE });
      })
      .catch(() => this.setRequestState({ fetchUsers: HAS_ERRORED }));
  }

  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  )

  startAddUser = () => {

  }

  render() {
    const { users, requestStates } = this.state;
    const { user: currentUser } = this.props;

    if (requestStates.fetchUsers === IS_LOADING) return <p />;

    console.log(users);
    const $users = users.map(user => <li key={user.id}>{user.email}</li>);

    return (
      <div className="container user-container">
        <Header user={currentUser} />
        <header className="user-container__header">
          <h2>Active users</h2>
          <div className="user-container__header__actions">
            { currentUser && (
              <Button type="button" icon="plus" intent="primary" onClick={this.startAddUser}>new user</Button>
            )}
          </div>
        </header>
        <ul className="users">
          {$users}
        </ul>
      </div>
    );
  }
}

ManageUsers.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default ManageUsers;
