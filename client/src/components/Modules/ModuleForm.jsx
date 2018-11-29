import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import {
  Button, Dialog, FormGroup, InputGroup, Tab, Tabs
} from '@blueprintjs/core';
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

  ContentEditor = (currentlyEditing) => {
    const { contents } = this.state;
    return (
      <ReactQuill
        value={contents[currentlyEditing]}
        onChange={this.handleContentChange}
        modules={editorOptions}
      />
    );
  }

  render() {
    const {
      isShown, onClose, module, requestStatus
    } = this.props;
    const { title, currentlyEditing } = this.state;

    return (
      <Dialog
        isOpen={isShown}
        onClose={onClose}
        className="dialog module-form"
        title={module ? 'Update module' : 'Add new module'}
      >
        <div className="bp3-dialog-body">
          <form onSubmit={this.onSubmit}>
            <FormGroup label="Title" labelFor="module-title" labelInfo="(required)">
              <InputGroup id="module-title" value={title} onChange={this.setTitle} />
            </FormGroup>
            <Tabs className="editor-selector" id="editor-selector" onChange={this.handleContentSelection} selected={currentlyEditing}>
              {Object.keys(CONTENT_TYPES).map(type => (
                <Tab
                  key={type}
                  id={type}
                  title={type}
                  panel={this.ContentEditor(currentlyEditing)}
                />
              ))}
              <Tabs.Expander />
            </Tabs>
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
