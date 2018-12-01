import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, FormGroup, InputGroup
} from '@blueprintjs/core';
import { IS_LOADING } from '../../constants';

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
    const {
      isShown, onClose, path, requestStatus
    } = this.props;
    const { title } = this.state;

    return (
      <Dialog
        isOpen={isShown}
        onClose={onClose}
        className="dialog path-form"
        title="New path name"
      >
        <div className="bp3-dialog-body">
          <form onSubmit={this.onSubmit}>
            <FormGroup label="Title" labelFor="path-title" labelInfo="(required)">
              <InputGroup id="path-title" value={title} onChange={this.setTitle} />
            </FormGroup>
            <div className="path-form__actions">
              <Button type="submit" intent="primary" loading={requestStatus === IS_LOADING}>
                {path ? 'update path' : 'create path'}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
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
  }),
  requestStatus: PropTypes.number.isRequired
};

export default PathForm;
