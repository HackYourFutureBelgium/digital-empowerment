import React from 'react';
import PropTypes from 'prop-types';
import copy from './copy';

import dbsfReport from '../../assets/dbsf-report.pdf';

/* eslint-disable react/no-danger */
const Content = ({ lang }) => (
  <div lang={lang} className="b3-running-text">
    <h4>{copy.title[lang]}</h4>

    <p dangerouslySetInnerHTML={{ __html: copy.aboutHobo[lang] }} />
    <br />

    <p dangerouslySetInnerHTML={{ __html: copy.aboutDigitalEmpowerment[lang] }} />
    <p dangerouslySetInnerHTML={{ __html: copy.aboutDigitalEmpowermentNumbers[lang] }} />
    <p>
      <a href={dbsfReport} download>
        {lang === 'fr' && 'Télécharge le dossier du DBSF'}
        {lang === 'nl' && 'Download het DBSF dossier'}
      </a>
    </p>
    <br />

    <p dangerouslySetInnerHTML={{ __html: copy.aboutPlatform[lang] }} />
    <p dangerouslySetInnerHTML={{ __html: copy.aboutDevelopers[lang] }} />
    <br />

    <p dangerouslySetInnerHTML={{ __html: copy.financing[lang] }} />
  </div>
);

Content.propTypes = {
  lang: PropTypes.string.isRequired
};

export default Content;
