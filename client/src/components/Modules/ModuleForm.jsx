import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Button, Dialog } from '@blueprintjs/core';
import { IS_LOADING, CONTENT_TYPES } from '../../constants';

import 'react-quill/dist/quill.snow.css';

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
  constructor(props) {
    super(props);
    const { EXPLANATION, EXERCISE, EVALUATION } = CONTENT_TYPES;
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
    this.setState({ currentlyEditing: CONTENT_TYPES[type] });
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
      <Dialog
        isOpen={isShown}
        onClose={onClose}
        className="dialog module-form"
        title={module ? 'Update module' : 'Add new module'}
      >
        <div className="bp3-dialog-body">
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
                { Object.keys(CONTENT_TYPES).map(type => (
                  <button
                    onClick={() => this.handleContentSelection(type)}
                    key={type}
                    type="button"
                    className={`link${CONTENT_TYPES[type] === currentlyEditing ? ' active' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="module-form__actions">
              <Button type="submit" intent="primary" loading={requestStatus === IS_LOADING}>
                {module ? 'update module' : 'create module'}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
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
