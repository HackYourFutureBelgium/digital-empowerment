import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import { cookies } from './constants';
import Paths from './components/Paths';
import Modules from './components/Modules';
import ManageUsers from './components/Admin/ManageUsers';
import NotFound from './components/404';
import User from './models/User';

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
  constructor() {
    super();
    const user = cookies.get('user');
    this.state = {
      user: user ? new User(user) : null
    };
    cookies.addChangeListener(this.authStateChanged);
  }

  authStateChanged = (cookie) => {
    if (!cookie || cookie.name !== 'user') return;
    // user logged out
    if (!cookie.value) {
      window.location.href = '/';
      return;
    }
    const user = JSON.parse(cookie.value);
    this.setState({ user: user ? new User(user) : null });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/:path(|paths|path|index)" render={props => <Paths {...props} user={user} />} />
          <Route path="/paths/:pathId" user={user} render={props => <Modules {...props} user={user} />} />
          { user && user.isAdmin
            && <Route path="/manage-users" render={props => <ManageUsers {...props} user={user} />} />
          }
          <Route component={NotFound} user={user} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
