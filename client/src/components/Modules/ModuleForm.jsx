import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class ModuleForm extends Component {
  state = {
    title: ''
  };

  setTitle = (e) => {
    this.setState({ title: e.currentTarget.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title } = this.state;
    const { submit } = this.props;
    submit({ title });
  }

  render() {
    const { isShown, onClose, module } = this.props;
    const { title } = this.state;

    return (
      <Modal
        isOpen={isShown}
        onRequestClose={onClose}
        className="modal modal--confirmation"
        overlayClassName="modal-overlay"
      >
        { module
          ? <h2 className="modal__title">Update module</h2>
          : <h2 className="modal__title">Add a new module</h2>
        }
        <form onSubmit={this.onSubmit}>
          <label htmlFor="module-title">
            Title:
            <input type="text" id="module-title" value={title} onChange={this.setTitle} />
          </label>
          <input type="submit" className="button" value={module ? 'Update module' : 'Add module'} />
        </form>
      </Modal>
    );
  }
}

ModuleForm.defaultProps = {
  module: null
};

ModuleForm.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  })
};

export default ModuleForm;
