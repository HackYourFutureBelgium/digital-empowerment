import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popover, Card } from '@blueprintjs/core';
import { INACTIVE, IS_LOADING } from '../../constants';
import ModuleForm from './ModuleForm';
import ConfirmationContent from '../ConfirmationContent';
import * as api from '../../api/modules';

class Module extends Component {
  state = {
    confirmingDeletion: false,
    updatingModule: false,
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

  updateModule = async (id, body) => {
    this.setRequestState({ updateModule: IS_LOADING });
    const updatedModule = await api.updateModule(id, body);
    await this.props.updateModule(updatedModule);
    this.hideModuleForm();
  }

  deleteModule = async (e) => {
    e.stopPropagation();

    const { deleteModule, module } = this.props;
    this.setRequestState({ deleteModule: IS_LOADING });
    await api.deleteModule(module._id);
    deleteModule(module._id);
  }

  render() {
    const { confirmingDeletion, updatingModule, requestStates } = this.state;
    const { module, isOpen, openModule } = this.props;

    return (
      <Card interactive={!isOpen} onClick={openModule} elevation={2} className={`module${isOpen ? ' open' : ''}`}>
        <ModuleForm
          isShown={updatingModule}
          onClose={this.hideModuleForm}
          submit={this.updateModule}
          requestStatus={requestStates.updateModule}
          module={module}
        />
        <h5 className="module__title">{module.title}</h5>
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
      </Card>
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
  updateModule: PropTypes.func.isRequired
};

export default Module;
