import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Content from './Content';
import User from '../../models/User';

import hoboLogo from '../../assets/images/logo-caw-hobo.png';
import dbsfLogo from '../../assets/images/logo-dbsf.png';
import okbeLogo from '../../assets/images/logo-okbe.png';
import '../../assets/css/home.css';

class Home extends React.Component {
  state = {
    lang: 'fr'
  };

  componentDidMount() {
    document.title = 'Home | Digital Empowerment';
  }

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
          <h2>
            {lang === 'fr' && 'Bienvenue sur Digital Empowerment'}
            {lang === 'nl' && 'Welkom op Digital Empowerment'}
          </h2>
          <div className="home-header__language-selector">
            <div className="bp3-select bp3-minimal">
              <select defaultValue={lang} onChange={this.updateLanguage}>
                <option value="nl">Nederlands</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </header>
        <div className="home-content-wrapper">
          <Content lang={lang} />
          <div className="home-logos">
            <a href="http://hobosite.be" target="_blank" rel="noopener noreferrer">
              <img src={hoboLogo} alt="HOBO + CAW logo" />
            </a>
            <a href="http://openknowledge.be" target="_blank" rel="noopener noreferrer">
              <img src={okbeLogo} alt="Open Knowledge Belgium logo" />
            </a>
            <a href="http://dt.bosa.be" target="_blank" rel="noopener noreferrer">
              <img src={dbsfLogo} alt="DBSF logo" />
            </a>
          </div>
        </div>
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
