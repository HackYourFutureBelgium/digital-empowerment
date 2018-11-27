import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paths from './components/Paths';
import Modules from './components/Modules';
import NotFound from './components/404';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|paths|path|index)" component={Paths} />
      <Route path="/paths/:pathId" component={Modules} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
