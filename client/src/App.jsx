import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paths from './components/Paths';
import Modules from './components/Modules';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:path(|paths|index)" component={Paths} />
      <Route path="/modules" component={Modules} />
      <Route render={() => <p>Page not found</p>} />
    </Switch>
  </BrowserRouter>
);

export default App;
