import React, { Component } from 'react';
import { getModules } from '../api/modules';

class Modules extends Component {
  state = {
    modules: []
  };

  componentDidMount() {
    getModules().then((modules) => {
      this.setState({ modules });
    });
  }

  render() {
    const { modules } = this.state;

    if (modules.length > 0) {
      return (
        <ul>
          {modules.map(module => <li key={module._id}>{module.title}</li>)}
        </ul>
      );
    }

    return (
      <p>There are no modules yet</p>
    );
  }
}

export default Modules;
