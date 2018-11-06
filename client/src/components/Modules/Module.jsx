import React from 'react';
import PropTypes from 'prop-types';

const Module = ({ module }) => (
  <article className="module">
    <h3 className="module__title">{module.title}</h3>
  </article>
);

Module.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export default Module;
