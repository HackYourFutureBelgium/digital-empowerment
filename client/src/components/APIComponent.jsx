import React from 'react';
import ModuleAPI from '../api/Module';
import PathAPI from '../api/Path';
import UserAPI from '../api/User';

const api = {
  modules: new ModuleAPI(),
  paths: new PathAPI(),
  users: new UserAPI()
};

class APIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.api = api;
  }

  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  );
}

export default APIComponent;
