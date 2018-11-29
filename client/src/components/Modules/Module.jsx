import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Popover, Card, Collapse
} from '@blueprintjs/core';
import { INACTIVE, IS_LOADING, CONTENT_TYPES } from '../../constants';
import ModuleForm from './ModuleForm';
import ModuleStages from './ModuleStages';
import ConfirmationContent from '../ConfirmationContent';
import * as api from '../../api/modules';

class Module extends Component {
  state = {
    confirmingDeletion: false,
    updatingModule: false,
    activeStage: CONTENT_TYPES.EXPLANATION,
    requestStates: {
      updateModule: INACTIVE,
      deleteModule: INACTIVE
    }
  }

  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  )

  confirmDeletion = () => {
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

  setActiveStage = (activeStage) => {
    this.setState({ activeStage });
  }

  updateModule = async (id, body) => {
    this.setRequestState({ updateModule: IS_LOADING });
    const updatedModule = await api.updateModule(id, body);
    await this.props.updateModule(updatedModule);
    this.hideModuleForm();
  }

  deleteModule = async () => {
    const { deleteModule, module } = this.props;
    this.setRequestState({ deleteModule: IS_LOADING });
    await api.deleteModule(module._id);
    deleteModule(module._id);
  }

  render() {
    const {
      confirmingDeletion, updatingModule, requestStates, activeStage
    } = this.state;
    const {
      module, isOpen, openModule, completeModule
    } = this.props;

    return (
      <article className="module-wrapper">
        <ModuleForm
          isShown={updatingModule}
          onClose={this.hideModuleForm}
          submit={this.updateModule}
          requestStatus={requestStates.updateModule}
          module={module}
        />
        <Card interactive={!isOpen} onClick={() => openModule(module._id)} elevation={2} className="module">
          <h4 className="module__title">{module.title}</h4>
          <Collapse isOpen={isOpen} keepChildrenMounted>
            <ul className="module__stages">
              <ModuleStages
                module={module}
                completeModule={completeModule}
                setActiveStage={this.setActiveStage}
                activeStage={activeStage}
              />
            </ul>
          </Collapse>
        </Card>
        <div className="module__wrapper__actions">
          { module.isCompleted && (
            <span className="completion-indicator">
              <Icon intent="success" icon="tick-circle" />Completed
            </span>
          )}
          <i><Icon icon="edit" onClick={this.showModuleForm} /></i>
          <Popover
            enforceFocus={false}
            isOpen={confirmingDeletion}
            onClose={this.cancelDeletion}
            position="top-right"
            popoverClassName="bp3-popover-content-sizing"
          >
            <i><Icon icon="trash" onClick={this.confirmDeletion} /></i>
            <ConfirmationContent
              message={<p>Are you sure you want to delete this module? This cannot be undone.</p>}
              cancel={this.cancelDeletion}
              accept={this.deleteModule}
              isLoading={requestStates.deleteModule === IS_LOADING}
            />
          </Popover>
        </div>
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
  completeModule: PropTypes.func.isRequired
};

export default Module;
