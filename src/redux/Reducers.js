import { combineReducers } from 'redux';
import TeamReducer from './TeamReducer';
import UserReducer from './UserReducer';
import SprintReducer from './SprintReducer';

const rootReducer = combineReducers({
  TeamReducer,
  UserReducer,
  SprintReducer
});

export default rootReducer;
