/* eslint-disable no-case-declarations */
import {
  ADD_NEW_CURRICULUM,
  CHANGE_INPUT_VALUE,
  DELETE_CURRICULUM,
  IMPORT_CURRICULUM_DATA,
  UPDATE_CURICULUM,
} from '@store/actionTypes';
import { getNewCurriculum } from '@utils/function';

const initialState = {
  data: [{ ...getNewCurriculum() }],
  maxIndentation: 5,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_NEW_CURRICULUM:
      return { ...state, data: [...state.data, { ...getNewCurriculum() }] };

    case DELETE_CURRICULUM:
      const newData = [...state.data];
      const { id: deleteId, index: deleteIndex } = action.payload;
      const { id, childCount } = newData[deleteIndex];
      if (id !== deleteId) {
        return state;
      }
      newData.splice(deleteIndex, childCount + 1);
      return {
        ...state,
        data: [...newData],
      };
    case IMPORT_CURRICULUM_DATA:
      return { ...initialState, data: [...action.payload] };

    case CHANGE_INPUT_VALUE:
      const data = [...state.data];
      const { index: changeIndex, text } = action.payload;
      data[changeIndex] = { ...data[changeIndex], text };
      return { ...state, data };
    case UPDATE_CURICULUM:
      const updateMap = action.payload;
      return {
        ...state,
        data: state.data.map((d) => (updateMap[d.id] ? updateMap[d.id] : d)),
      };
    default:
      return state;
  }
};
