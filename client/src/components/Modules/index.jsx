import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Module from './Module';
import ModuleForm from './ModuleForm';
import * as pathsAPI from '../../api/paths';
import * as modulesAPI from '../../api/modules';

import '../../assets/css/modules.css';

class Modules extends Component {
  state = {
    path: null,
    modules: [],
    moduleFormShown: false,
    activeModuleId: null,
    modulesAreLoading: true
  };

  async componentDidMount() {
    const { pathId } = this.props.match.params;
    const path = await pathsAPI.getPath(pathId);
    await this.setState({
      path,
      activeModuleId: (path.modules.length === 0) ? null : path.modules[0]._id,
      modules: path.modules,
      modulesAreLoading: false
    });
    NProgress.done();
  }

  createModule = (module) => {
    const pathId = this.state.path._id;
    modulesAPI.createModule(pathId, module).then((newModule) => {
      this.setState(previousState => ({
        newTitle: '',
        modules: [...previousState.modules, newModule],
        moduleFormShown: false
      }));
    });
  };

  updateModule = (id, module) => {
    modulesAPI.updateModule(id, module).then((updatedModule) => {
      this.setState((previousState) => {
        const modules = [...previousState.modules];
        const index = modules.findIndex(mod => mod._id === id);
        modules[index] = updatedModule;
        return { modules };
      });
    });
  };

  deleteModule = (module) => {
    modulesAPI.deleteModule(module._id).then(() => {
      this.setState((previousState) => {
        const modules = [...previousState.modules].filter(mod => mod._id !== module._id);
        return { modules };
      });
    });
  }

  openModule = (id) => {
    const { activeModuleId } = this.state;
    if (id === activeModuleId) return;
    this.setState({ activeModuleId: id });
  }

  showModuleFrom = () => {
    this.setState({ moduleFormShown: true });
  }

  hideModuleForm = () => {
    this.setState({ moduleFormShown: false });
  }

  renderModule = module => (
    <Module
      key={module._id}
      module={module}
      openModule={() => this.openModule(module._id)}
      isOpen={this.state.activeModuleId === module._id}
      deleteModule={this.deleteModule}
      updateModule={this.updateModule}
    />
  );

  render() {
    const {
      modulesAreLoading, modules, moduleFormShown, path
    } = this.state;

    if (modulesAreLoading) return <p />;

    const $modules = modules
      .sort((m1, m2) => m2.createdAt - m1.createdAt)
      .map(this.renderModule);

    return (
      <div className="container module-container">
        <header className="module-container__header">
          <h2>{path.title}</h2>
          <button type="button" className="button" onClick={this.showModuleFrom}>Add module</button>
        </header>
        <ModuleForm
          isShown={moduleFormShown}
          onClose={this.hideModuleForm}
          submit={this.createModule}
        />
        <div className="modules">
          { modules.length > 0
            ? $modules
            : <p>There are no modules yet</p>
          }
        </div>
      </div>
    );
  }
}

Modules.propTypes = {
  // eslint-disable-next-line
  match: PropTypes.object.isRequired
};

export default Modules;
