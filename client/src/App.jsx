import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NProgress from 'nprogress';
import Paths from './components/Paths';
import Modules from './components/Modules';

const App = () => {
  const FancyRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(routeProps) => {
        NProgress.start();
        return <Component {...routeProps} />;
      }}
    />
  );

  return (
    <BrowserRouter>
      <Switch>
        <FancyRoute exact path="/:path(|paths|path|index)" component={Paths} />
        <FancyRoute path="/paths/:pathId" component={Modules} />
        <FancyRoute render={() => <p>Page not found</p>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
