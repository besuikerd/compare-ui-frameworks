import $ from 'jquery';
import store from './store';

export const actionTypes = {
  setUserName: 'SET_USERNAME',
  setPassword: 'SET_PASSWORD',
  setError: 'SET_ERROR',
  setLoading: 'SET_LOADING',
  login: 'LOGIN'
};

function setUsername(username){
  return {
    type: actionTypes.setUserName,
    username
  }
}

function setPassword(password){
  return {
    type: actionTypes.setPassword,
    password
  }
}

function setError(error){
  return {
    type: actionTypes.setError,
    error
  }
}

function setLoading(loading){
  return {
    type: actionTypes.setLoading,
    loading
  }
}

function login(){
  return (dispatch, getState) => {
    const {
      username,
      password
    } = getState().login;

    dispatch(setLoading(true));
    return dispatch(authenticate(username, password))
      .catch(error => dispatch(setError(error.message)))
      .then(() => {
        dispatch(setLoading(false))
        dispatch(store.initialize())
      });
  }
}

function authenticate(username, password){
  return (dispatch, getState) => {
    return $.get(`/api/users/find?query=${JSON.stringify({name: username, password})}`).then(users => {
      if (users.length === 1) {
        dispatch(store.setUser(users[0]));
      } else {
        throw new Error('invalid credentials');
      }
    });
  }
}


export default {
  setUsername,
  setPassword,
  setError,
  setLoading,
  login
}