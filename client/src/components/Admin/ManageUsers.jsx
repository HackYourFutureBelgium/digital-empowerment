import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NonIdealState, InputGroup, Button, Tag
} from '@blueprintjs/core';
import NProgress from 'nprogress';
import Header from '../Header';
import { IS_LOADING, INACTIVE, HAS_ERRORED } from '../../constants';
import * as api from '../../api/users';
import User from '../../models/User';

import '../../assets/css/users.css';

class ManageUsers extends Component {
  state = {
    users: [],
    searchQuery: '',
    requestStates: {
      fetchUsers: IS_LOADING
    }
  };

  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    api.getUsers()
      .then(async (users) => {
        await this.setState({ users: users.map(u => new User(u)) || [] });
        this.setRequestState({ fetchUsers: INACTIVE });
      })
      .catch(() => this.setRequestState({ fetchUsers: HAS_ERRORED }))
      .finally(() => NProgress.done());
  }

  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  )

  search = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  clearSearch = () => {
    if (this.searchInput) this.searchInput.value = '';
    this.setState({ searchQuery: '' });
  }

  startAddUser = () => {

  }

  render() {
    const { users, searchQuery, requestStates } = this.state;
    const { user: currentUser } = this.props;

    if (requestStates.fetchUsers === IS_LOADING) return <p />;

    const filteredUsers = users.filter((user) => {
      const { email, role } = user;
      return (email.toLowerCase().includes(searchQuery.toLowerCase())
        || role.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const $users = filteredUsers.map(user => <li key={user.id}>{user.email}</li>);

    return (
      <div className="container user-container">
        <Header user={currentUser} />
        <header className="user-container__header">
          <h2>Active users</h2>
          <div className="user-container__header__actions">
            <Button type="button" icon="plus" intent="primary" onClick={this.startAddUser}>new user</Button>
            <InputGroup
              rightElement={(<Tag minimal round>{filteredUsers.length}</Tag>)}
              type="search"
              leftIcon="search"
              onChange={this.search}
              inputRef={(c) => { this.searchInput = c; }}
            />
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
