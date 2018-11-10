import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModuleForm from './ModuleForm';
import ConfirmationDialog from '../ConfirmationDialog';

class Module extends Component {
  state = {
    confirmingDeletion: false,
    updatingModule: false
  }

  confirmDeletion = () => {
    this.setState({ confirmingDeletion: true });
  };

  cancelDeletion = () => {
    this.setState({ confirmingDeletion: false });
  };

  showModuleForm = () => {
    this.setState({ updatingModule: true });
  }

  hideModuleForm = () => {
    this.setState({ updatingModule: false });
  }

  updateModule = (body, id) => {
    this.props.updateModule(body, id);
    this.hideModuleForm();
  }

  deleteModule = () => {
    const { deleteModule, module } = this.props;
    deleteModule(module);
  }

  render() {
    const { confirmingDeletion, updatingModule } = this.state;
    const { module, isOpen, openModule } = this.props;
    return (
      <article className={`module${isOpen ? ' open' : ''}`} onClick={openModule}>
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
          module={module}
        />
        <h3 className="module__title">{module.title}</h3>
        { isOpen && (
          <div className="module__contents">
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
          <i><FontAwesomeIcon icon={faEdit} onClick={this.showModuleForm} /></i>
          <i><FontAwesomeIcon icon={faTrash} onClick={this.confirmDeletion} /></i>
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
  updateModule: PropTypes.func.isRequired
};

export default Module;
