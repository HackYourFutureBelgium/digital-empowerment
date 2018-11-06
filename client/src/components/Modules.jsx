import React, { Component } from 'react';
import { getModules } from '../api/modules';

import '../assets/css/modules.css';

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
    ]
  };

  componentDidMount() {
    getModules().then((modules) => {
      // this.setState({ modules });
    });
  }

  render() {
    const { modules } = this.state;

    return (
      <div className="container">
        <h2>Using a web browser</h2>
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
