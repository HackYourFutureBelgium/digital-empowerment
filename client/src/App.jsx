import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import Paths from './components/Paths';
import Modules from './components/Modules';
import Login from './components/Auth/Login';
import NotFound from './components/404';

FocusStyleManager.onlyShowFocusOnTabs();

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:path(|paths|path|index)" component={Paths} />
      <Route path="/paths/:pathId" component={Modules} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
