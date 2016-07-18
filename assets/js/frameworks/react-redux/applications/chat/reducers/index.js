import { combineReducers } from 'redux';

import login from './LoginReducer';
import store from './StoreReducer';


export default combineReducers({
  login,
  store
});