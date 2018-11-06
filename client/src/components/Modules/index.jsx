import React, { Component } from 'react';
import Modal from 'react-modal';
import Module from './Module';
import * as api from '../../api/modules';

import '../../assets/css/modules.css';

Modal.setAppElement('#root');

class Modules extends Component {
  state = {
    modules: [],
    inputModalShown: false,
    newTitle: ''
  };

  componentDidMount() {
    api.getModules().then((modules) => {
      this.setState({ modules });
    });
  }

  createModule = () => {
    const { newTitle } = this.state;
    api.createModule({ title: newTitle }).then((newModule) => {
      this.setState(previousState => ({
        newTitle: '',
        modules: [...previousState.modules, newModule],
        inputModalShown: false
      }));
    });
  };

  deleteModule = (module) => {
    api.deleteModule(module._id).then(() => {

    });
  }

  showInputModal = () => {
    this.setState({ inputModalShown: true });
  }

  closeInputModal = () => {
    this.setState({ inputModalShown: false });
  }

  setTitle = (e) => {
    this.setState({ newTitle: e.currentTarget.value });
  }

  render() {
    const { modules, inputModalShown, newTitle } = this.state;

    return (
      <div className="container module-container">
        <header className="module-container__header">
          <h2>Using a web browser</h2>
          <button type="button" className="button" onClick={this.showInputModal}>Add module</button>
        </header>
        <Modal
          isOpen={inputModalShown}
          onRequestClose={this.closeInputModal}
          className="modal modal--new-module"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal__title">Add a new module</h2>
          <label htmlFor="module-title">
            Title:
            <input type="text" id="module-title" value={newTitle} onChange={this.setTitle} />
          </label>
          <button type="button" className="button" onClick={this.createModule}>Add module</button>
        </Modal>
        <div className="modules">
          { modules.length > 0
            ? modules.map(module => (
              <Module key={module._id} module={module} deleteModule={this.deleteModule} />
            ))
            : <p>There are no modules yet</p>
          }
        </div>
      </div>
    );
  }
}

export default Modules;
