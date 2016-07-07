function dynamicPartial(path, partial) {
  console.log(path, partial)
  return `${path}/${partial}`;
};

module.exports = {
  dynamicPartial
};