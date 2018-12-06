import React from 'react';

class APIComponent extends React.Component {
  setRequestState = newStatus => (
    this.setState(prevState => ({
      requestStates: { ...prevState.requestStates, ...newStatus }
    }))
  );
}

export default APIComponent;
