import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { ActionStandardCard } from '@components/moleculer';

function DraggableActionStandardCard({
  draggableId,
  index,
  data,
  onIndentOrOutdent,
  onDelete,
  onInputValueChange,
}) {
  const [draggable, setDraggable] = useState(true);

  return (
    <Draggable
      isDragDisabled={!draggable}
      draggableId={draggableId}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ width: '100%' }}
        >
          <ActionStandardCard
            setDraggable={setDraggable}
            onIndentOrOutdent={onIndentOrOutdent}
            onDelete={onDelete}
            index={index}
            data={data}
            onInputValueChange={onInputValueChange}
          />
        </div>
      )}
    </Draggable>
  );
}

DraggableActionStandardCard.defaultProps = {
  onIndentOrOutdent: () => {},
  onDelete: () => {},
  onInputValueChange: () => {},
};
DraggableActionStandardCard.propTypes = {
  draggableId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onIndentOrOutdent: PropTypes.func,
  onDelete: PropTypes.func,
  onInputValueChange: PropTypes.func,
  data: PropTypes.object.isRequired,
};

export default memo(DraggableActionStandardCard);
