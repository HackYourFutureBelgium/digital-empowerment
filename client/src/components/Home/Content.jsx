import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ lang }) => (
  <p>Content in {lang}</p>
);

Content.propTypes = {
  lang: PropTypes.string.isRequired
};

export default Content;
