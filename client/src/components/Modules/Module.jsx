import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Popover, Card, Collapse
} from '@blueprintjs/core';
import APIComponent from '../APIComponent';
import { INACTIVE, IS_LOADING, CONTENT_TYPES } from '../../constants';
import ModuleForm from './ModuleForm';
import ModuleStages from './ModuleStages';
import ConfirmationContent from '../ConfirmationContent';

class Module extends APIComponent {
  state = {
    confirmingDeletion: false,
    updatingModule: false,
    activeStage: CONTENT_TYPES.EXPLANATION,
    requestStates: {
      updateModule: INACTIVE,
      deleteModule: INACTIVE
    }
  }

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
    const updatedModule = await this.api.modules.update(id, body);
    await this.setRequestState({ updateModule: INACTIVE });
    await this.props.updateModule(updatedModule);
    this.hideModuleForm();
  }

  deleteModule = async () => {
    const { deleteModule, module } = this.props;
    this.setRequestState({ deleteModule: IS_LOADING });
    await this.api.modules.delete(module._id);
    deleteModule(module._id);
  }

  render() {
    const {
      confirmingDeletion, updatingModule, requestStates, activeStage
    } = this.state;
    const {
      module, isOpen, openModule, completeModule, user, disabled, dragHandleProps
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
        <Card
          interactive={!isOpen && !disabled}
          onClick={() => openModule(module._id)}
          elevation={(disabled) ? 0 : 2}
          className={`module${disabled ? ' module--disabled' : ''}`}
        >
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
          { user && <i {...dragHandleProps} className="drag-icon"><Icon icon="menu" /></i>}
          { user && <i><Icon icon="edit" onClick={this.showModuleForm} /></i>}
          { user && (
            <Popover
              enforceFocus={false}
              isOpen={confirmingDeletion}
              onClose={this.cancelDeletion}
              position="bottom-right"
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
          )}
        </div>
      </article>
    );
  }
}

Module.defaultProps = {
  user: null,
  dragHandleProps: null
};

Module.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  dragHandleProps: PropTypes.shape({}),
  disabled: PropTypes.bool.isRequired,
  openModule: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  deleteModule: PropTypes.func.isRequired,
  updateModule: PropTypes.func.isRequired,
  completeModule: PropTypes.func.isRequired,
  user: PropTypes.shape({})
};

export default Module;
