import React, { Component } from 'react';
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

  renderPath = (path) => {
    return (
      <article key={path._id}>
        {path.title}
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

export default Paths;
