import { Component } from 'react';
import $ from 'jquery';

import Loading from './Loading';


function setValue(callback){
  return (e) => {
    callback(e.target.value);
  }
}

function onSubmit(callback){
  return (e) => {
    e.preventDefault();
    callback();
  }
}

export default ({
  username,
  password,
  loading,
  error,
  setUsername,
  setPassword,
  login
}) => {
  return <div className="chat-login">

    <Loading visible={loading}/>

    { error ? <span className="alert alert-warning">{error}</span> : null }

    <form className="pure-form pure-form-stacked" onSubmit={onSubmit(login)}>
      <fieldset>
        <label>
          Username
          <input type="text" value={username} onChange={setValue(setUsername)} autoFocus={true}/>
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={setValue(setPassword)}/>
        </label>
      </fieldset>
      <button className="pure-button pure-button-primary">Login</button>
    </form>
  </div>;
}