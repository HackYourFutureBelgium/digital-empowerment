import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Popover, Card, Collapse, Button
} from '@blueprintjs/core';
import { INACTIVE, IS_LOADING, CONTENT_TYPES } from '../../constants';
import ModuleForm from './ModuleForm';
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
        <Card interactive={!isOpen} onClick={() => openModule(module._id)} elevation={2} className="module">
          <ModuleForm
            isShown={updatingModule}
            onClose={this.hideModuleForm}
            submit={this.updateModule}
            requestStatus={requestStates.updateModule}
            module={module}
          />
          <h5 className="module__title">{module.title}</h5>
          <Collapse isOpen={isOpen} keepChildrenMounted>
            <div className="module__contents bp3-running-text">
              <ul className="module__contents__stages">
                <li>
                  Explanation
                  <Collapse isOpen={activeStage === CONTENT_TYPES.EXPLANATION} keepChildrenMounted>
                    <div dangerouslySetInnerHTML={{ __html: module.explanation }} />
                    <Button type="button" onClick={() => this.setActiveStage(CONTENT_TYPES.EXERCISE)}>start exercise</Button>
                  </Collapse>
                </li>
                <li>
                  Exercise
                  <Collapse isOpen={activeStage === CONTENT_TYPES.EXERCISE} keepChildrenMounted>
                    <div dangerouslySetInnerHTML={{ __html: module.exercise }} />
                    <Button type="button" onClick={() => this.setActiveStage(CONTENT_TYPES.EVALUATION)}>next</Button>
                  </Collapse>
                </li>
                <li>
                  Evaluation
                  <Collapse isOpen={activeStage === CONTENT_TYPES.EVALUATION} keepChildrenMounted>
                    <div dangerouslySetInnerHTML={{ __html: module.evaluation }} />
                    <Button type="button" onClick={() => completeModule(module._id)}>finish!</Button>
                  </Collapse>
                </li>
              </ul>
            </div>
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
