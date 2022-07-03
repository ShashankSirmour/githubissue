import {
  ADD_NEW_CURRICULUM,
  CHANGE_INPUT_VALUE,
  DELETE_CURRICULUM,
  IMPORT_CURRICULUM_DATA,
  INDENT_CURICULUM,
  MOVE_CURICULUM,
  OUTDENT_CURICULUM,
  UPDATE_CURICULUM,
} from '@store/actionTypes';

export const addNewCurriculum = () => ({
  type: ADD_NEW_CURRICULUM,
});

export const deleteCurriculum = (id, index) => ({
  type: DELETE_CURRICULUM,
  payload: { id, index },
});

export const importData = (data) => ({
  type: IMPORT_CURRICULUM_DATA,
  payload: data,
});

export const changeInputValue = (text, index) => ({
  type: CHANGE_INPUT_VALUE,
  payload: { text, index },
});

export const indentCurriculum = (index) => ({
  type: INDENT_CURICULUM,
  payload: { index },
});

export const outdentCurriculum = (index) => ({
  type: OUTDENT_CURICULUM,
  payload: { index },
});

export const updateCurriculum = (updateData) => ({
  type: UPDATE_CURICULUM,
  payload: updateData,
});

export const moveCurriculum = (sourceIndex, destinationIndex) => ({
  type: MOVE_CURICULUM,
  payload: { sourceIndex, destinationIndex },
});
