import React from 'react';
import PropTypes from 'prop-types';

const StaticModules = ({ modules, renderModule }) => {
  const $modules = modules.map(renderModule);
  return (
    <div className="modules">
      {$modules}
    </div>
  );
};

StaticModules.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderModule: PropTypes.func.isRequired
};

export default StaticModules;
