import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Header from '../Header';
import User from '../../models/User';

import dbsfReport from '../../assets/dbsf-report.pdf';

const Home = ({ user }) => (
  <div>
    <div className="container user-container">
      <Header user={user} />
      <a href={dbsfReport} className="link--seamless" download><Button>download the DBSF report</Button></a>
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
