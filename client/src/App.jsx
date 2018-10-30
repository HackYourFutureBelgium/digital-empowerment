import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Modules from './components/Modules';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path=":path(modules|)" component={Modules} />
      <Route render={() => <p>Page not found</p>} />
    </Switch>
  </BrowserRouter>
);

export default App;
