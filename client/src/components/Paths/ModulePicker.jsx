import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, FormGroup, InputGroup
} from '@blueprintjs/core';

class ModulePicker extends Component {
  render() {
    const { pathNames } = this.props;
    return (
      <>
        <FormGroup label="Copy modules from learning path:" labelFor="path-list" labelInfo="">
          <select
            id="path-list"
            value={pathNames}
            onChange={this.setSelected}
            name="selectedPath"
          >
            <option value="">-- no path selected --</option>
            {}
          </select>
        </FormGroup>
      </>
    );
  }
}

ModulePicker.propTypes = {

};

export default ModulePicker;
