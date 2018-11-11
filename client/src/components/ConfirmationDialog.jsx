import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ConfirmationDialog = ({
  isOpen, onClose, cancel, accept, title, text
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
      <button className="button" type="button" onClick={cancel}>Cancel</button>
      <button className="button" type="button" onClick={accept}>Delete</button>
    </div>
  </Modal>
);

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ConfirmationDialog;
