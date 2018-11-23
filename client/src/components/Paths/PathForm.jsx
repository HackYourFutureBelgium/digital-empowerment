import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class PathForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.path ? props.path.title : ''
    };
  }

  setTitle = (e) => {
    this.setState({ title: e.currentTarget.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title } = this.state;
    const { submit, path } = this.props;
    path ? submit(path._id, { title }) : submit({ title });
  }

  render() {
    const { isShown, onClose, path } = this.props;
    const { title } = this.state;

    return (
      <Modal
        isOpen={isShown}
        onRequestClose={onClose}
        className="modal path-form"
        overlayClassName="modal-overlay"
      >
        <h2 className="modal__title">New path name</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="path-title" className="path-form__field">
            Title:
            <input type="text" className="input" id="path-title" value={title} onChange={this.setTitle} />
          </label>
          <div className="path-form__actions">
            <input type="submit" className="button" value={path ? 'Update path' : 'Add path'} />
          </div>
        </form>
      </Modal>
    );
  }
}

PathForm.defaultProps = {
  path: null
};

PathForm.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  path: PropTypes.shape({
    title: PropTypes.string
  })
};

export default PathForm;
