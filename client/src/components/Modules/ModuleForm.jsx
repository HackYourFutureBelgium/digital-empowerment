import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import { Button } from '@blueprintjs/core';
import { IS_LOADING } from '../../constants';

import 'react-quill/dist/quill.snow.css';

Modal.setAppElement('#root');

const editorOptions = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    // [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' }, { list: 'bullet' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: { matchVisual: false }
};

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
        [EXPLANATION]: props.module ? (props.module[EXPLANATION] || '') : '',
        [EXERCISE]: props.module ? (props.module[EXERCISE] || '') : '',
        [EVALUATION]: props.module ? (props.module[EVALUATION] || '') : ''
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

  handleContentSelection = (type) => {
    this.setState({ currentlyEditing: this.CONTENT_TYPES[type] });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, contents } = this.state;
    const { submit, module } = this.props;
    module ? submit(module._id, { title, ...contents }) : submit({ title, ...contents });
  }

  render() {
    const {
      isShown, onClose, module, requestStatus
    } = this.props;
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
            Contents for the {currentlyEditing} step:
            <ReactQuill
              value={contents[currentlyEditing]}
              onChange={this.handleContentChange}
              modules={editorOptions}
            />
            <div className="module-form__contents__selection">
              { Object.keys(this.CONTENT_TYPES).map(type => (
                <button
                  onClick={() => this.handleContentSelection(type)}
                  key={type}
                  type="button"
                  className={`link${this.CONTENT_TYPES[type] === currentlyEditing ? ' active' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="module-form__actions">
            <Button type="submit" loading={requestStatus === IS_LOADING}>
              {module ? 'Update module' : 'Add module'}
            </Button>
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
  }),
  requestStatus: PropTypes.number.isRequired
};

export default ModuleForm;
