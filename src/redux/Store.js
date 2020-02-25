import { createStore } from 'redux';
import rootReducer from './Reducers';

export default function ConfigureStore(initialState) {
  return createStore(rootReducer, { ...initialState });
}
