import { Component } from 'react';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import $ from 'jquery';

import Loading from './Loading';

@observer
export default class Login extends Component{
  @autobind
  onChangeUsername(e){
    this.props.loginModel.username = e.target.value;
  }

  @autobind
  onChangePassword(e){
    this.props.loginModel.password = e.target.value;
  }

  @autobind
  login(e){
    e.preventDefault();
    const {
      login,
      loginModel
    } = this.props;

    login(loginModel);
  }

  render(){
    const {
      username,
      password,
      loading,
      error
    } = this.props.loginModel;
    
    return <div className="chat-login">
      
      
      <Loading visible={loading}/>

      { error ? <span className="alert alert-warning">{error}</span> : null }

      <form className="pure-form pure-form-stacked" onSubmit={this.login}>
        <fieldset>
          <label>
            Username
            <input type="text" value={username} onChange={this.onChangeUsername} autoFocus={true}/>
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={this.onChangePassword}/>
          </label>


        </fieldset>
        <button className="pure-button pure-button-primary">Login</button>
      </form>
    </div>
  }
}