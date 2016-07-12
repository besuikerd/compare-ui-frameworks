import { observable } from 'mobx';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import io from 'socket.io-client';

import LoginModel from './LoginModel';

export default class Store {
  @observable
  messages = null;

  @observable
  user = null;

  @observable
  channel = null;

  @observable
  channels = null;

  @observable
  textInput = null;

  @autobind
  login(loginModel){
    loginModel.loading = true;

    const {
      username: name,
      password
    } = loginModel;

    $.get(`/api/users/find?query=${JSON.stringify({name, password})}`).then(users => {
      if(users.length == 1){
        this.user = users[0];
        loginModel.error = null;
        this.loadChannels().then(() => {
          this.joinChannel(this.channels[0]);
        });
      } else{
        loginModel.error = 'Invalid credentials';
      }
      loginModel.loading = false;
    });
  }

  @autobind
  loadChannels(){
    return $.get('/api/channels').then(channels => {
      this.channels = channels;
    })
  }

  @autobind
  joinChannel(channel){
    this.leaveChannel();
    this.channel = channel;
    const query = {channel: channel._id};
    $.get(`/api/messages/find?query=${JSON.stringify(query)}`).then(messages => {
      this.messages = messages;
    })
  }

  @autobind
  leaveChannel(){
    if(this.channel != null){

    }
  }

  @autobind
  logout(){
    this.user = null;
  }
}