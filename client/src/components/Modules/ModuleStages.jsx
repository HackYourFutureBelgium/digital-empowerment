import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Collapse } from '@blueprintjs/core';
import { CONTENT_TYPES } from '../../constants';

const ModuleStages = ({
  activeStage, setActiveStage, completeModule, module
}) => (
  <Fragment>
    <li>
      <div className="module__stages__title">
        <i><Icon iconSize={10} icon="circle" /></i>
        <h5>Explanation</h5>
      </div>
      <Collapse className="module__stages__stage" isOpen={activeStage === CONTENT_TYPES.EXPLANATION} keepChildrenMounted>
        <div className="editor-output bp3-running-text" dangerouslySetInnerHTML={{ __html: module.explanation }} />
        <Button type="button" onClick={() => setActiveStage(CONTENT_TYPES.EXERCISE)}>start exercise</Button>
      </Collapse>
    </li>
    <li>
      <div className="module__stages__title">
        <i><Icon iconSize={10} icon="circle" /></i>
        <h5>Exercise</h5>
      </div>
      <Collapse className="module__stages__stage" isOpen={activeStage === CONTENT_TYPES.EXERCISE} keepChildrenMounted>
        <div className="editor-output bp3-running-text" dangerouslySetInnerHTML={{ __html: module.exercise }} />
        <Button type="button" onClick={() => setActiveStage(CONTENT_TYPES.EVALUATION)}>next</Button>
      </Collapse>
    </li>
    <li>
      <div className="module__stages__title">
        <i><Icon iconSize={10} icon="circle" /></i>
        <h5>Evaluation</h5>
      </div>
      <Collapse className="module__stages__stage" isOpen={activeStage === CONTENT_TYPES.EVALUATION} keepChildrenMounted>
        <div className="editor-output bp3-running-text" dangerouslySetInnerHTML={{ __html: module.evaluation }} />
        <Button type="button" onClick={() => completeModule(module._id)}>finish!</Button>
      </Collapse>
    </li>
  </Fragment>
);

ModuleStages.propTypes = {
  module: PropTypes.shape({}).isRequired,
  activeStage: PropTypes.string.isRequired,
  setActiveStage: PropTypes.func.isRequired,
  completeModule: PropTypes.func.isRequired
};

export default ModuleStages;
