import React, { Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getModules } from './api/modules';
import Modules from './components/Modules';

class App extends Component {
  componentDidMount() {
    getModules().then((modules) => {
      console.log(modules);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path=":path(modules|)" component={Modules} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
