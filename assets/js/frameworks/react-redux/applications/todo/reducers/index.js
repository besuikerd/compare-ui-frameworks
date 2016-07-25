import { combineReducers } from 'redux';

import store from './store';
import todos from './todos';

export default combineReducers({
  todos,
  store
});