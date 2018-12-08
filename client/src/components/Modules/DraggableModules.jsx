import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class DraggableModules extends Component {
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { modules, finishReorder } = this.props;
    const reordered = this.reorder(modules, result.source.index, result.destination.index);
    finishReorder(reordered);
  }

  renderModule = (snapshot, provided, module, index) => {
    const { renderModule } = this.props;
    return (
      <Draggable key={module._id} draggableId={module._id} index={index}>
        {(innerProvided, innerSnapshot) => (
          <div
            ref={innerProvided.innerRef}
            {...innerProvided.draggableProps}
            {...innerProvided.dragHandleProps}
            /* style={getItemStyle(
              innerSnapshot.isDragging,
              innerProvided.draggableProps.style
            )} */
          >
            {renderModule(module)}
          </div>
        )}
      </Draggable>
    );
  };

  render() {
    const { modules } = this.props;

    return (
      <div className="modules">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {modules.map((module, index) => (
                  this.renderModule(snapshot, provided, module, index)
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

DraggableModules.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  finishReorder: PropTypes.func.isRequired,
  renderModule: PropTypes.func.isRequired
};

export default DraggableModules;
