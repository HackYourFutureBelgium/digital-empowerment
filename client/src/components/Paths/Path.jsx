import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import PathForm from './PathForm';
import ConfirmationDialog from '../ConfirmationDialog';

class Path extends Component {
  state = {
    confirmingDeletion: false,
    updatingPath: false,
    duplicatingPath: false
  };

  promptConfirmDeletion = (e) => {
    e.stopPropagation();
    this.setState({ confirmingDeletion: true });
  }

  cancelDeletion = () => {
    this.setState({ confirmingDeletion: false });
  };

  startUpdates = (e) => {
    e.stopPropagation();
    this.setState({ updatingPath: true });
  }

  cancelUpdates = () => {
    this.setState({ updatingPath: false });
  }

  startDuplication = (e) => {
    e.stopPropagation();
    this.setState({ duplicatingPath: true });
  }

  cancelDuplication = () => {
    this.setState({ duplicatingPath: false });
  }

  duplicatePath = (path) => {
    this.props.duplicate({ ...path, modules: this.props.path.modules });
    this.setState({ duplicatingPath: false });
  }

  updatePath = (id, path) => {
    this.props.update(id, path);
    this.setState({ updatingPath: false });
  }

  deletePath = () => {
    this.props.delete(this.props.path);
  }

  render() {
    const { confirmingDeletion, updatingPath, duplicatingPath } = this.state;
    const { path, choose } = this.props;

    return (
      <article className="paths paths__path-wrapper">
        <ConfirmationDialog
          isOpen={confirmingDeletion}
          onClose={this.cancelDeletion}
          cancel={this.cancelDeletion}
          accept={this.deletePath}
          title="Confirm deletion"
          text={`Are you sure you want to delete path "${path.title}"`}
        />
        <PathForm
          path={path}
          isShown={updatingPath}
          onClose={this.cancelUpdates}
          submit={this.updatePath}
        />
        <PathForm
          isShown={duplicatingPath}
          onClose={this.cancelDuplication}
          submit={this.duplicatePath}
        />
        <button type="button" onClick={() => choose(path)} className="path button--seamless">
          {path.title}
          <div className="paths__actions">
            <i><Icon icon="duplicate" onClick={this.startDuplication} /></i>
            <i><Icon icon="edit" onClick={this.startUpdates} /></i>
            <i><Icon icon="trash" onClick={this.promptConfirmDeletion} /></i>
          </div>
        </button>
      </article>
    );
  }
}

Path.propTypes = {
  path: PropTypes.shape({
    title: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  choose: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  duplicate: PropTypes.func.isRequired
};

export default Path;
