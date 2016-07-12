const schema = {
  user: 'users',
  message: 'string',
  channel: 'channels'
};

const seed = [
  {
    user: {name: 'john'},
    message: 'hi',
    channel: {name: 'general'}
  },

  {
    user: {name: 'jane'},
    message: 'hi john',
    channel: {name: 'general'}
  },

  {
    user: {name: 'pete'},
    message: 'random message',
    channel: {name: 'random'}
  },

  {
    user: {name: 'john'},
    message: 'I need help',
    channel: {name: 'help'}
  }
];

module.exports = {
  schema,
  seed
};