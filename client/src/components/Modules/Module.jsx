import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationDialog from '../ConfirmationDialog';

Modal.setAppElement('#root');

class Module extends Component {
  state = {
    confirmingDeletion: false
  }

  confirmDeletion = () => {
    this.setState({ confirmingDeletion: true });
  };

  cancelDeletion = () => {
    this.setState({ confirmingDeletion: false });
  };

  deleteModule = () => {
    this.setState({ confirmingDeletion: false });
  }

  render() {
    const { confirmingDeletion } = this.state;
    const { module } = this.props;
    return (
      <article className="module">
        <ConfirmationDialog
          isOpen={confirmingDeletion}
          onClose={this.cancelDeletion}
          cancel={this.cancelDeletion}
          accept={this.deleteModule}
          title="Confirm deletion"
          text={`Are you sure you want to delete module "${module.title}"`}
        />
        <h3 className="module__title">{module.title}</h3>
        <div className="module__actions">
          <i><FontAwesomeIcon icon={faEdit} /></i>
          <i><FontAwesomeIcon icon={faTrash} onClick={this.confirmDeletion} /></i>
        </div>
      </article>
    );
  }
}

Module.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export default Module;
