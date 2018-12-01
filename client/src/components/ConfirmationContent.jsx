import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';


const ConfirmationContent = ({
  cancel, accept, isLoading, message
}) => (
  <div className="confirmation-content">
    {message}
    <div className="confirmation-content__actions">
      <Button type="button" onClick={cancel}>Cancel</Button>
      <Button type="button" intent="danger" onClick={accept} loading={isLoading}>Delete</Button>
    </div>
  </div>
);

ConfirmationContent.defaultProps = {
  isLoading: false
};

ConfirmationContent.propTypes = {
  isLoading: PropTypes.bool,
  cancel: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  message: PropTypes.element.isRequired
};

export default ConfirmationContent;
