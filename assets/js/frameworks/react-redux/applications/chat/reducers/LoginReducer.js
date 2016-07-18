import store from '../actions/store';
import login, {actionTypes} from '../actions/login';

export const initialState = {
  username: '',
  password: '',
  loading: false,
  error: null
};

export default function LoginReducer(state = initialState, action){
  switch(action.type){
    case actionTypes.setUserName:
      const {username} = action;
      return Object.assign({}, state, {username});
    case actionTypes.setPassword:
      const {password} = action;
      return Object.assign({}, state, {password});
    case actionTypes.setLoading:
      const {loading} = action;
      return Object.assign({}, state, {loading});
    case actionTypes.setError:
      const {error} = action;
      return Object.assign({}, state, {error});
    default:
      return state;
  }
}