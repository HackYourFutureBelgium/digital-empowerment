import React, { Component } from 'react';
import * as api from '../../api/paths';

class Paths extends Component {
  state = {
    paths: []
  };

  async componentDidMount() {
    const paths = await api.getPaths().catch(err => console.error(err));
    this.setState({ paths });
  }

  render() {
    const { paths } = this.state;

    const $paths = paths.map(path => <p key={path._id}>{path.title}</p>);
    return $paths;
  }
}

export default Paths;
