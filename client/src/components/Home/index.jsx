import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Header from '../Header';
import Content from './Content';
import User from '../../models/User';

import dbsfReport from '../../assets/dbsf-report.pdf';
import '../../assets/css/home.css';

class Home extends React.Component {
  state = {
    lang: 'nl'
  };

  updateLanguage = (e) => {
    this.setState({ lang: e.currentTarget.value });
  }

  render() {
    const { user } = this.props;
    const { lang } = this.state;

    return (
      <div className="container home-container">
        <Header user={user} />
        <header className="home-header">
          <h2>Welcome to Digital Empowerment</h2>
          <div className="home-header__language-selector">
            <div className="bp3-select bp3-minimal">
              <select defaultValue={lang} onChange={this.updateLanguage}>
                <option value="nl">Nederlands</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </header>
        <Content lang={lang} />
        <a href={dbsfReport} className="link--seamless" download><Button>download the DBSF report</Button></a>
      </div>
    );
  }
}

Home.defaultProps = {
  user: null
};

Home.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default Home;
