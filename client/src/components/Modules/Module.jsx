import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import ModuleForm from './ModuleForm';
import ConfirmationDialog from '../ConfirmationDialog';

class Module extends Component {
  state = {
    confirmingDeletion: false,
    updatingModule: false
  }

  confirmDeletion = (e) => {
    e.stopPropagation();
    this.setState({ confirmingDeletion: true });
  };

  cancelDeletion = () => {
    this.setState({ confirmingDeletion: false });
  };

  showModuleForm = (e) => {
    e.stopPropagation();
    this.setState({ updatingModule: true });
  }

  hideModuleForm = () => {
    this.setState({ updatingModule: false });
  }

  updateModule = async (body, id) => {
    await this.props.updateModule(body, id);
    this.hideModuleForm();
  }

  deleteModule = () => {
    const { deleteModule, module } = this.props;
    deleteModule(module);
  }

  render() {
    const { confirmingDeletion, updatingModule } = this.state;
    const {
      module, isOpen, openModule, updateStatus
    } = this.props;

    return (
      <article className="module-wrapper">
        <ConfirmationDialog
          isOpen={confirmingDeletion}
          onClose={this.cancelDeletion}
          cancel={this.cancelDeletion}
          accept={this.deleteModule}
          title="Confirm deletion"
          text={`Are you sure you want to delete module "${module.title}"`}
        />
        <ModuleForm
          isShown={updatingModule}
          onClose={this.hideModuleForm}
          submit={this.updateModule}
          requestStatus={updateStatus}
          module={module}
        />
        <button type="button" onClick={openModule} className={`module button--seamless${isOpen ? ' open' : ''}`}>
          <h3 className="module__title">{module.title}</h3>
          { isOpen && (
            <div className="module__contents bp3-running-text">
              <div className="module__contents__stage">
                Explanation:
                <div dangerouslySetInnerHTML={{ __html: module.explanation }} />
              </div>

              <div className="module__contents__stage">
                Exercise:
                <div dangerouslySetInnerHTML={{ __html: module.exercise }} />
              </div>

              <div className="module__contents__stage">
                Evaluation:
                <div dangerouslySetInnerHTML={{ __html: module.evaluation }} />
              </div>
            </div>
          )}
          <div className="module__actions">
            <i><Icon icon="edit" onClick={this.showModuleForm} /></i>
            <i><Icon icon="trash" onClick={this.confirmDeletion} /></i>
          </div>
        </button>
      </article>
    );
  }
}

Module.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  openModule: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  deleteModule: PropTypes.func.isRequired,
  updateModule: PropTypes.func.isRequired,
  updateStatus: PropTypes.number.isRequired,
  deleteStatus: PropTypes.number.isRequired
};

export default Module;
