import { combineReducers } from 'redux';
import { curriculumReducer } from './curriculum';

export default combineReducers({
  curriculum: curriculumReducer,
});
