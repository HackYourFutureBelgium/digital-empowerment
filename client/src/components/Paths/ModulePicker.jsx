import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, FormGroup, InputGroup
} from '@blueprintjs/core';

class ModulePicker extends Component {
  state = {
    selectedPath: 'default',
    selectedModules: []
  };

  setSelected = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  get selectedModules() {
    return this.state.selectedModules.map(m => m._id);
  }

  render() {
    const { allPaths, pathsLoading } = this.props;
    const { selectedPath } = this.state;

    if (pathsLoading) return <p />;

    const $pathOptions = allPaths
      .sort((p1, p2) => p1.title.localeCompare(p2.title))
      .map(p => <option key={p._id} value={p._id}>{p.title}</option>);

    return (
      <>
        <FormGroup label="Copy modules from learning path:" labelFor="path-list" labelInfo="">
          <select
            id="path-list"
            value={selectedPath}
            onChange={this.setSelected}
            name="selectedPath"
          >
            <option value="default">-- no path selected --</option>
            { $pathOptions }
          </select>
        </FormGroup>
        {/*
        <FormGroup label="Choose a module to copy" labelFor="path-list" labelInfo="">
          <select
            id="path-list"
            value={pathNames}
            onChange={this.setSelected}
            name="selectedPath"
          >
            <option value="">-- no module selected --</option>
          </select>
        </FormGroup>
        */}
      </>
    );
  }
}

ModulePicker.defaultProps = {
  allPaths: []
};

ModulePicker.propTypes = {
  allPaths: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }))
  })),
  pathsLoading: PropTypes.bool.isRequired
};

export default ModulePicker;
