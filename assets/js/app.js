const io = require('socket.io-client');

const socket = io.connect('/todos', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 60000,
  reconnectionAttempts: 60
});

socket.on('create', (obj) => console.log('created', obj));
socket.on('update', (obj) => console.log('updated', obj));
socket.on('delete', (obj) => console.log('deleted', obj));
socket.on('connected', (obj) => console.log('connected', obj));
socket.on('disconnected', (obj) => console.log('disconnected', obj));