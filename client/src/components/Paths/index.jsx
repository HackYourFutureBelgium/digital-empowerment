import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import Path from './Path';
import PathForm from './PathForm';
import * as api from '../../api/paths';

import '../../assets/css/paths.css';

class Paths extends Component {
  state = {
    paths: [],
    searchQuery: '',
    creatingPath: false,
    pathsAreLoading: true
  };

  async componentDidMount() {
    const paths = await api.getPaths().catch(err => console.error(err));
    await this.setState({
      paths,
      pathsAreLoading: false
    });
    NProgress.done();
  }

  choosePath = (path) => {
    this.props.history.push(`/paths/${path._id}`);
  }

  search = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  }

  createPath = async (path) => {
    const newPath = await api.createPath(path).catch(err => console.error(err));
    this.setState(previousState => ({
      paths: [...previousState.paths, newPath],
      creatingPath: false
    }));
  }

  updatePath = async (id, path) => {
    const updatedPath = await api.updatePath(id, path).catch(err => console.error(err));
    this.setState((previousState) => {
      const paths = [...previousState.paths];
      const index = paths.findIndex(p => p._id === id);
      paths[index] = updatedPath;
      return { paths };
    });
  }

  deletePath = async (path) => {
    await api.deletePath(path._id).catch(err => console.error(err));
    this.setState((previousState) => {
      const paths = [...previousState.paths].filter(p => p._id !== path._id);
      return { paths };
    });
  }

  duplicatePath = (path) => {
    const { title, modules } = path;
    this.createPath({ title, modules });
  }

  startPathCreation = () => {
    this.setState({ creatingPath: true });
  }

  cancelPathCreation = () => {
    this.setState({ creatingPath: false });
  }

  renderPath = path => (
    <Path
      key={path._id}
      path={path}
      choose={this.choosePath}
      update={this.updatePath}
      delete={this.deletePath}
      duplicate={this.duplicatePath}
    />
  );

  render() {
    const {
      paths, pathsAreLoading, searchQuery, creatingPath
    } = this.state;

    if (pathsAreLoading) return <p />;

    const $paths = paths
      .filter(path => path.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(this.renderPath);

    return (
      <main className="container path-container">
        <header className="path-container__header">
          <h2>Using a web browser</h2>
          <div className="path-container__header__actions">
            <button type="button" className="button" onClick={this.startPathCreation}>Add path</button>
            <input type="search" className="input" onChange={this.search} value={searchQuery} placeholder="search for paths" />
          </div>
        </header>
        <PathForm
          isShown={creatingPath}
          onClose={this.cancelPathCreation}
          submit={this.createPath}
        />
        <div className="paths">
          {$paths}
        </div>
      </main>
    );
  }
}

Paths.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object.isRequired
};

export default withRouter(Paths);
