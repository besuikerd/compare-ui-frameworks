const schema = {
  name: 'string',
  password: 'string'
};

const seed = [
  {
    name: 'besuikerd',
    password: 'pass'
  },

  {
    name: 'john',
    password: 'pass'
  },

  {
    name: 'jane',
    password: 'pass'
  }
]

module.exports = {
  schema,
  seed
}