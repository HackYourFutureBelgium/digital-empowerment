import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableModules = ({ modules, finishReorder, renderModule }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reordered = reorder(modules, result.source.index, result.destination.index);
    finishReorder(reordered);
  };

  const renderDraggable = (provided, module, index) => (
    <Draggable key={module._id} draggableId={module._id} index={index}>
      {innerProvided => (
        <div
          ref={innerProvided.innerRef}
          {...innerProvided.draggableProps}
        >
          {renderModule(module, innerProvided.dragHandleProps)}
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="modules">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {modules.map((module, index) => (
                renderDraggable(provided, module, index)
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

DraggableModules.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  finishReorder: PropTypes.func.isRequired,
  renderModule: PropTypes.func.isRequired
};

export default DraggableModules;
