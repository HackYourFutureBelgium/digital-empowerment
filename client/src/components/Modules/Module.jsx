import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
        <Modal
          isOpen={confirmingDeletion}
          onRequestClose={this.cancelDeletion}
          className="modal modal--confirmation"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal__title">Confirm deletion</h2>
          <p>Are you sure you want to delete module &quot;{module.title}&quot;? </p>
          <div className="modal--confirmation__actions">
            <button className="button" type="button" onClick={this.cancelDeletion}>Cancel</button>
            <button className="button" type="button" onClick={this.deleteModule}>Delete</button>
          </div>
        </Modal>
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
