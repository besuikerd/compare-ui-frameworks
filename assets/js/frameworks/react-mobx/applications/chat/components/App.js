import { Component } from 'react';
import { observer } from 'mobx-react';

import Login from './Login';
import Chat from './Chat';


@observer
export default class App extends Component{
  render(){
    const {
      loginModel,
      store
    } = this.props;


    if(store.user == null){
      return <Login {...{loginModel, login: store.login}}/>
    } else{
      return <Chat {...{store}}/>
    }
  }
}