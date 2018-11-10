import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

Modal.setAppElement('#root');

class ModuleForm extends Component {
  CONTENT_TYPES = {
    EXPLANATION: 'explanation',
    EXERCISE: 'exercise',
    EVALUATION: 'evaluation'
  };

  constructor(props) {
    super(props);
    const { EXPLANATION, EXERCISE, EVALUATION } = this.CONTENT_TYPES;
    this.state = {
      title: props.module ? props.module.title : '',
      contents: {
        [EXPLANATION]: props.module ? props.module[EXPLANATION] : '',
        [EXERCISE]: props.module ? props.module[EXERCISE] : '',
        [EVALUATION]: props.module ? props.module[EVALUATION] : ''
      },
      currentlyEditing: EXPLANATION
    };
  }

  setTitle = (e) => {
    this.setState({ title: e.currentTarget.value });
  }

  handleContentChange = (contents) => {
    const { currentlyEditing } = this.state;
    this.setState(prevState => ({
      contents: {
        ...prevState.contents,
        [currentlyEditing]: contents
      }
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, contents } = this.state;
    const { submit, module } = this.props;
    module ? submit({ ...module, title, ...contents }) : submit({ title, ...contents });
  }

  render() {
    const { isShown, onClose, module } = this.props;
    const { title, contents, currentlyEditing } = this.state;

    return (
      <Modal
        isOpen={isShown}
        onRequestClose={onClose}
        className="modal module-form"
        overlayClassName="modal-overlay"
      >
        { module
          ? <h2 className="modal__title">Update module</h2>
          : <h2 className="modal__title">Add a new module</h2>
        }
        <form onSubmit={this.onSubmit}>
          <label htmlFor="module-title" className="module-form__field">
            Title:
            <input type="text" className="input" id="module-title" value={title} onChange={this.setTitle} />
          </label>
          <div className="module-form__field module-form__contents">
            Contents:
            <ReactQuill value={contents[currentlyEditing]} onChange={this.handleContentChange} />
          </div>
          <div className="module-form__actions">
            <input type="submit" className="button" value={module ? 'Update module' : 'Add module'} />
          </div>
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
    title: PropTypes.string,
    contents: PropTypes.shape({})
  })
};

export default ModuleForm;
