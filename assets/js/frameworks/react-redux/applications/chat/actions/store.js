import $ from 'jquery';
import _ from 'lodash';
import session from './session';
import Promise from 'bluebird';

const idGen = (() => {
  let i = 0;
  return () => i++;
})();

export const actionTypes = {
  setUser: 'SET_USER',
  setUsers: 'SET_USERS',
  setChannel: 'SET_CHANNEL',
  setChannels: 'SET_CHANNELS',
  setMessages: 'SET_MESSAGES',
  setTextInput: 'SET_TEXT_INPUT',
  userConnected: 'USER_CONNECTED',
  userDisconnected: 'USER_DISCONNECTED',
  messageSent: 'MESSAGE_SENT',
  sendMessage: 'SEND_MESSAGE'
};


function setUser(user){
  return {
    type: actionTypes.setUser,
    user
  }
}

function setUsers(users){
  return {
    type: actionTypes.setUsers,
    users
  };
}

function setChannel(channel){
  return{
    type: actionTypes.setChannel,
    channel
  }
}

function setChannels(channels){
  return {
    type: actionTypes.setChannels,
    channels
  };
}

function setMessages(messages){
  return {
    type: actionTypes.setMessages,
    messages
  };
}

function setTextInput(textInput){
  return {
    type: actionTypes.setTextInput,
    textInput
  };
}

function sendMessage(){
  return {
    type: actionTypes.sendMessage
  }
}

function userConnected(userId, channel){
  return (dispatch, getState) => {
    const {
      channel: currentChannel,
      user,
      users
    } = getState().store;

    if(channel._id === currentChannel._id && userId && !_.some(users, u => u._id === userId)){
      const query = {_id: userId};
      $.get(`/api/users/find?query=${JSON.stringify(query)}`).then(([joinedUser]) => {
        dispatch(setUsers(users.concat(joinedUser)));
        if(userId !== user._id){
          dispatch(messageSent({
            _id: `message_${idGen()}`,
            message: `${joinedUser.name} joined #${channel.name}`,
            user: { name: `bot@${channel.name}`, _id: `user_${idGen()}`},
            channel: channel
          }));
        }
      });
    }
  };
}


function userDisconnected(userId, channel){
  return (dispatch, getState) => {
    const {
      channel: currentChannel,
      user,
      users
    } = getState().store;
    if(channel._id === currentChannel._id && userId){
      const leavingUser = _.find(users, u => u._id === userId);
      if(leavingUser){
        dispatch(setUsers(users.filter(u => u._id !== userId)));
        if(userId !== user._id){
          dispatch(messageSent({
            _id: `message_${idGen()}`,
            message: `${leavingUser.name} left #${channel.name}`,
            user: { name: `bot@${channel.name}`, _id: `user_${idGen()}`},
            channel: channel
          }))
        }
      }
    }
  }
}

function initialize(){
  return (dispatch, getState) =>
    dispatch(loadChannels())
      .then(() => dispatch(joinChannel(getState().store.channels[0])))
}


function loadChannels() {
  return (dispatch, getState) =>
    $.get('/api/channels').then(channels => {
      dispatch(setChannels(channels))
    });
}


function joinChannel(channel){
  return (dispatch, getState) => {
    dispatch(leaveChannel())
      .then(() => {
        dispatch(setChannel(channel));
        return dispatch(loadUsers())
          .then(() => dispatch(loadMessages()))
          .then(() => dispatch(connectSocket()));
      });
  }
}

function leaveChannel(){
  return (dispatch, getState) => {
    const {
      channel
    } = getState().store;

    if(channel !== null){
      dispatch(setChannel(null));
      dispatch(session.disconnect());
    }
    return Promise.resolve(null);
  }
}

function loadUsers(){
  return (dispatch, getState) => {
    const {
      channel
    } = getState().store;
    return $.get('/api/messages/sockets').then(sockets => {
      const userIds = _.flatMap(sockets, socket =>
        socket.channel === channel._id && socket.user ? [socket.user] : []
      );

      const query = {_id: {$in: userIds}};
      return $.get(`/api/users/find?query=${JSON.stringify(query)}`).then(users => {
        dispatch(setUsers(users))
      });
    });
  }
}

function loadMessages(){
  return (dispatch, getState) => {
    const {
      channel
    } = getState().store;

    const query = {channel: channel._id};
    return $.get(`/api/messages/find?query=${JSON.stringify(query)}`).then(messages => {
      dispatch(setMessages(messages))
    });
  }
}

function connectSocket(){
  return (dispatch, getState) => {
    const {
      channel,
      user
    } = getState().store;
    dispatch(session.connect(channel, user));
  }
}

function messageSent(message){
  return {
    type: actionTypes.messageSent,
    message
  };
}

function logout(){
  return (dispatch, getState) => {
    dispatch(session.disconnect());
    dispatch(setUser(null));
  }
}


export default {
  setUser,
  setUsers,
  userConnected,
  userDisconnected,
  setChannel,
  setChannels,
  initialize,
  messageSent,
  logout,
  joinChannel,
  setTextInput,
  sendMessage
};