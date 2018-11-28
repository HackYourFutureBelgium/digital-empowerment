import React, { Component } from 'react';
import { NonIdealState } from '@blueprintjs/core';
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
    modulesAreLoading: true,
    requests: {
    },
    fetchRequestFailed: false
  };

  constructor(props) {
    super(props);
    NProgress.start();
  }

  async componentDidMount() {
    const { pathId } = this.props.match.params;
    const path = await pathsAPI.getPath(pathId).catch(() => {
      this.setState({ fetchRequestFailed: true });
    });
    await this.setState({
      path,
      activeModuleId: (path.modules.length === 0) ? null : path.modules[0]._id,
      modules: path.modules || [],
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

  renderEmptyState = () => (
    <NonIdealState
      title="No modules yet"
      description={(
        <p>
          This learning path does not have any modules yet<br />
          As soon as you create one, it will displayed here.
        </p>
      )}
      action={<button type="button" className="button" onClick={this.showModuleFrom}>create one now</button>}
    />
  )

  renderErrorState = () => (
    <NonIdealState
      title="Something went wrong"
      icon="error"
      description={(
        <p>
          A problem occurred while fetching learning paths. This is
          likely due to a problem with your internet connection.<br />
        </p>
      )}
    />
  )

  render() {
    const {
      modulesAreLoading, modules, moduleFormShown, path, fetchRequestFailed
    } = this.state;

    if (modulesAreLoading) return <p />;

    const $modules = modules
      .sort((m1, m2) => m2.createdAt - m1.createdAt)
      .map(this.renderModule);

    let $nonIdealState;
    if (modules.length === 0) $nonIdealState = this.renderEmptyState();
    else if (fetchRequestFailed) $nonIdealState = this.renderErrorState();

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
        {$nonIdealState}
        <div className="modules">
          {$modules}
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
