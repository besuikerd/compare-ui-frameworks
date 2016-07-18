import { Component } from 'react';
import { connect } from 'react-redux';

import login from '../actions/login';

import Login from '../components/Login';

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    setUsername(username){ dispatch(login.setUsername(username)) },
    setPassword(password){ dispatch(login.setPassword(password)) },
    doLogin(){ dispatch(login.login()) }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class LoginContainer extends Component{
  render(){
    const {
      doLogin,
      setUsername,
      setPassword,
      login
    } = this.props;
    
    return <Login {...{login: doLogin, setUsername, setPassword, ...login}} />
  }
}