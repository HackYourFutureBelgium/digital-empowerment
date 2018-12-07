import React from 'react';
import ModuleAPI from '../api/Module';

const api = {
  modules: new ModuleAPI()
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
