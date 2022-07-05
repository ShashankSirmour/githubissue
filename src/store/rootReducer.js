import { combineReducers } from 'redux';
import { issueReducer } from './issue';

export default combineReducers({
  issue: issueReducer,
});
