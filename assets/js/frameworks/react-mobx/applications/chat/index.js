import url from 'url';

import 'stylesheets/chat.scss';

import App from './components/App';

import Store from './model/Store';
import LoginModel from './model/LoginModel';

const store = new Store();
const loginModel = new LoginModel();


const params = url.parse(window.location.href, true).query;
if(params.username){
  loginModel.username = params.username;
}
if(params.password){
  loginModel.password = params.password;
}
if(params.username && params.password){
  store.login(loginModel);
}


export default () => <App {...{store, loginModel}}/>