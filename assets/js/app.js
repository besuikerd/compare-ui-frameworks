const io = require('socket.io-client');


const tables = ['todos', 'users', 'messages', 'channels'];

tables.forEach(table => {
  const socket = io.connect(`/${table}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 60000,
    reconnectionAttempts: 60
  });

  socket.on('create', (obj) => console.log(`[${table}] created`, obj));
  socket.on('update', (obj) => console.log(`[${table}] updated`, obj));
  socket.on('delete', (obj) => console.log(`[${table}] deleted`, obj));
  socket.on('connected', (obj) => console.log(`[${table}] connected`, obj));
  socket.on('disconnected', (obj) => console.log(`[${table}] disconnected`, obj));
});

