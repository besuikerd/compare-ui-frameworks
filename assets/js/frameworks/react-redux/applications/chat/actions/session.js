export const actionTypes = {
  connect: 'CONNECT',
  disconnect: 'DISCONNECT'
};

function connect(channel, user){
  return {
    type: actionTypes.connect,
    channel,
    user
  };
}

function disconnect(){
  return {
    type: actionTypes.disconnect
  };
}

export default {
  connect,
  disconnect
}