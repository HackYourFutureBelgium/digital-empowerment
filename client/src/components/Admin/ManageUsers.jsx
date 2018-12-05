import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../models/User';

class ManageUsers extends Component {
  render() {
    return (
      <div className="container">

      </div>
    );
  }
}

ManageUsers.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default ManageUsers;
