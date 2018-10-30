import React, { Component} from 'react';
import { getModules } from './api/modules';

class App extends Component {
  componentDidMount() {
    getModules().then((modules) => {
      console.log(modules);
    })
  }

  render() {
    return (
      <h1>Digital Empowerment</h1>
    );
  }
}

export default App;
