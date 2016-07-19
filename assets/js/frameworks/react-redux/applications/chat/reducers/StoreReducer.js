import store, {actionTypes} from '../actions/store';
import _ from 'lodash';
import $ from 'jquery';

export const initialState = {
  messages: [],
  user: null,
  users: [],
  channel: null,
  channels: [],
  textInput: ''
};

export default function StoreReducer(state = initialState, action){
  switch(action.type){
    case actionTypes.setUser:
      const { user } = action;
      return Object.assign({}, state, {user});
    case actionTypes.setUsers:
      const { users } = action;
      return Object.assign({}, state, {users});
    case actionTypes.setChannel:
      const { channel } = action;
      return Object.assign({}, state, {channel});
    case actionTypes.setChannels:
      const { channels } = action;
      return Object.assign({}, state, {channels});
    case actionTypes.setTextInput:
      const { textInput } = action;
      return Object.assign({}, state, {textInput});
    case actionTypes.setMessages:
      const { messages } = action;
      return Object.assign({}, state, {messages});
    case actionTypes.messageSent:
      const { message } = action;
      if(message.channel._id === state.channel._id){
        const messages = state.messages.concat(message);
        return Object.assign({}, state, {messages});
      }
      return state;
    case actionTypes.sendMessage: {
      const {
        textInput,
        user,
        channel
      } = state;

      $.post('/api/messages', {
        channel: channel._id,
        user: user._id,
        message: textInput
      });

      const update = {
        textInput: ''
      };
      return Object.assign({}, state, update);
    }
    default:
      return state;
  }
}