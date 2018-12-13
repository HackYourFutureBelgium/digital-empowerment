import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import User from '../../models/User';

const Home = ({ user }) => (
  <div>
    <div className="container user-container">
      <Header user={user} />
    </div>
  </div>
);

Home.defaultProps = {
  user: null
};

Home.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default Home;
