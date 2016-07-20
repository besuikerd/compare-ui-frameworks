function parseString(str){
  if(str.length == 0){
    throw new Error('empty string');
  }
  return str;
}

function parseBoolean(str){ //if a form value is passed, the checkbox was checked
  return str !== 'false';
}

function parseInt(str){
  const number = window.parseInt(str);
  if(isNaN(number)){
    throw new Error(`failed to parse ${str} to int`);
  } else{
    return number;
  }
}

function parseFloat(str){
  const number = window.parseInt(str);
  if(isNaN(number)){
    throw new Error(`failed to parse ${str} to int`);
  } else{
    return number;
  }
}

module.exports = {
  string: parseString,
  boolean: parseBoolean,
  int: parseInt,
  float: parseFloat
};