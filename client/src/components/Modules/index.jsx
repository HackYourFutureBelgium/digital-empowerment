import React, { Component } from 'react';
import Modal from 'react-modal';
import { getModules } from '../../api/modules';

import '../../assets/css/modules.css';

Modal.setAppElement('#root');

class Modules extends Component {
  state = {
    modules: [
      {
        _id: 1,
        title: 'Home page'
      },
      {
        _id: 2,
        title: 'Google results'
      }
    ],
    inputModalShown: false,
    newTitle: ''
  };

  componentDidMount() {
    getModules().then((modules) => {
      // this.setState({ modules });
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
      <div className="container modules-container">
        <h2>Using a web browser</h2>
        <button type="button" className="button" onClick={this.showInputModal}>Add module</button>
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
        </Modal>
        <div className="modules">
          { modules.length > 0
            ? modules.map(module => (
              <article className="module" key={module._id}>
                <h3 className="module__title">{module.title}</h3>
              </article>
            ))
            : <p>There are no modules yet</p>
          }
        </div>
      </div>
    );
  }
}

export default Modules;
