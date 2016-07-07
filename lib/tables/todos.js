'use strict';

const schema = {
  task: 'string',
  finished: 'boolean'
};

const seed = [
  {
    task: 'Do something',
    finished: false
  },

  {
    task: 'Mow lawn',
    finished: true
  },

  {
    task: 'Groceries',
    finished: true
  }
];


module.exports = {
  seed,
  schema
};