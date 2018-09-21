import { combineReducers } from 'redux';
import TeamReducer from './team/TeamReducer';
import UserReducer from './user/UserReducer';
import SprintReducer from './sprint/SprintReducer';

const rootReducer = combineReducers({
  TeamReducer,
  UserReducer,
  SprintReducer
});

export default rootReducer;
