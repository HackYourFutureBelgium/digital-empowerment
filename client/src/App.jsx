import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import { cookies } from './constants';
import Paths from './components/Paths';
import Modules from './components/Modules';
import NotFound from './components/404';

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
  constructor() {
    super();
    const user = cookies.get('user');
    this.state = {
      user: user || null
    };
    cookies.addChangeListener(this.authStateChanged);
  }

  authStateChanged = (cookie) => {
    if (!cookie || cookie.name !== 'user') return null;
    // user logged out
    if (!cookie.value) return this.setState({ user: null });
    const user = JSON.parse(cookie.value);
    return this.setState({ user: user || null });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/:path(|paths|path|index)" render={props => <Paths {...props} user={user} />} />
          <Route path="/paths/:pathId" user={user} render={props => <Modules {...props} user={user} />} />
          <Route component={NotFound} user={user} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
