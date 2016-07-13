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
  users = [];

  @observable
  channel = null;

  @observable
  channels = null;

  @observable
  textInput = '';

  socket = null;


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
  setTextInput(textInput){
    this.textInput = textInput;
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
      $.get('/api/messages/sockets').then(sockets => {
        const userIds = _.flatMap(sockets, socket =>
          socket.channel == channel._id && socket.user ? [socket.user] : []
        );
        const query = {_id: {$in: userIds}};
        $.get(`/api/users/find?query=${JSON.stringify(query)}`).then(users => {
          this.messages = messages;
          this.users = users;
        })
      });

      this.messages = messages;
    });

    this.socket = io.connect(`/messages?channel=${channel._id}&user=${this.user._id}`, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 60000,
      reconnectionAttempts: 60
    });

    this.socket.on('create', (message) => {
      if(message.channel._id === channel._id){
        this.messages.push(message);
      }
    });


    let idGen = (() => {
      let i = 0;
      return () => i++;
    })();

    this.socket.on('connected', (socket) => {
      if(socket.channel === channel._id && socket.user && !_.some(this.users, u => u._id === socket.user)){
        const query = {_id: socket.user};
        $.get(`/api/users/find?query=${JSON.stringify(query)}`).then(([user]) => {
          this.users.push(user);
          this.messages.push({
            _id: `message_${idGen()}`,
            message: `${user.name} joined #${channel.name}`,
            user: { name: `bot@${channel.name}`, _id: `user_${idGen()}`},
            channel
          })
        });
      }
    });

    this.socket.on('disconnected', (socket) => {
      if(socket.channel === channel._id && socket.user){
        const [user] = _.remove(this.users, u => u._id === socket.user);
        if(user){
          this.messages.push({
            _id: `message_${idGen()}`,
            message: `${user.name} left #${channel.name}`,
            user: { name: `bot@${channel.name}`, _id: `user_${idGen()}`},
            channel
          })
        }
      }
    });
  }

  @autobind
  leaveChannel(){
    this.messages = null;
    if(this.channel != null){
      if(this.socket != null){
        this.socket.disconnect();
      }
    }
  }

  @autobind
  sendMessage(){
    const message = this.textInput;
    this.textInput = "";
    $.post('/api/messages', {
      channel: this.channel._id,
      user: this.user._id,
      message
    });
  }


  @autobind
  logout(){
    this.leaveChannel();
    this.user = null;
  }
}