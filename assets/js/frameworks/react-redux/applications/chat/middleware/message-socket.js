import io from 'socket.io-client';

import session, {actionTypes} from '../actions/session'
import store from '../actions/store';



export default function(){
  let socket = null;

  return ({dispatch}) => next => action => {
    switch(action.type){
      case actionTypes.connect:
        const { channel, user } = action;
        if(socket !== null){
          socket.disconnect();
        }

        if(channel !== null){
          socket = io.connect(`/messages?channel=${channel._id}&user=${user._id}`, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 60000,
            reconnectionAttempts: 60
          });

          socket.on('create', (message) => {
            dispatch(store.messageSent(message))
          });

          socket.on('connected', (socket) => {
            if(socket.user !== undefined && socket.channel !== undefined && socket.channel === channel._id){
              dispatch(store.userConnected(socket.user, channel));
            }
          });

          socket.on('disconnected', (socket) => {
            if(socket.user !== undefined && socket.channel !== undefined && socket.channel === channel._id){
              dispatch(store.userDisconnected(socket.user, channel));
            }
          });
        }
        break;
      case actionTypes.disconnect:
        if(socket !== null){
          socket.disconnect();
          socket = null;
        }
      default:
        return next(action);
    }
  }
}