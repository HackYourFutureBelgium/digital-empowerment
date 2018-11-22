import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as api from '../../api/paths';

import '../../assets/css/paths.css';

class Paths extends Component {
  state = {
    paths: []
  };

  async componentDidMount() {
    const paths = await api.getPaths().catch(err => console.error(err));
    this.setState({ paths });
  }

  choosePath = (path) => {
    this.props.history.push(`/path/${path._id}`);
  }

  renderPath = (path) => {
    return (
      <article className="paths__path-wrapper" key={path._id}>
        <button type="button" onClick={() => this.choosePath(path)} className="path button--seamless">
          {path.title}
        </button>
      </article>
    );
  }

  render() {
    const { paths } = this.state;

    const $paths = paths.map(this.renderPath);

    return (
      <main className="container path-container">
        <header className="path-container__header">
          <h2>Using a web browser</h2>
          <div className="path-container__header__actions">
            <button type="button" className="button" onClick={this.createPath}>Add path</button>
            <input type="search" className="input" placeholder="search for paths" />
          </div>
        </header>
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
