function dynamicPartial(path, partial) {
  return `${path}/${partial}`;
};

module.exports = {
  dynamicPartial
};