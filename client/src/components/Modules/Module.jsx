import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Module = ({ module }) => (
  <article className="module">
    <h3 className="module__title">{module.title}</h3>
    <div className="module__actions">
      <i><FontAwesomeIcon icon={faEdit} /></i>
      <i><FontAwesomeIcon icon={faTrash} /></i>
    </div>
  </article>
);

Module.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export default Module;
