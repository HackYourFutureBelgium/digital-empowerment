import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Button } from '@blueprintjs/core';

Modal.setAppElement('#root');

const ConfirmationDialog = ({
  isOpen, onClose, cancel, accept, title, text, isLoading
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="modal modal--confirmation"
    overlayClassName="modal-overlay"
  >
    <h2 className="modal__title">{title}</h2>
    <p>{text}</p>
    <div className="modal--confirmation__actions">
      <Button type="button" onClick={cancel}>Cancel</Button>
      <Button type="button" onClick={accept} loading={isLoading}>Delete</Button>
    </div>
  </Modal>
);

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ConfirmationDialog;
