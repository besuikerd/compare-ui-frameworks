const database = require('./database');

function dynamicPartial(path, tpe) {
  return database.isPrimitive(tpe) ? `${path}/${tpe}` : 'input/entity';
};

function json(obj){
  return JSON.stringify(obj);
}

function equals(a, b){
  console.log('comparing', a, b)
  return a === b;
}

module.exports = {
  dynamicPartial,
  json,
  equals
};