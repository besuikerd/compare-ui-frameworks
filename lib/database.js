const nedb = require('nedb');
const _ = require('lodash');
const Promise = require('bluebird');
Promise.promisifyAll(nedb.prototype);

function load(path, inMemory){
  const tables = require('require-dir')('./tables');
  const tableNames = determineLoadOrder(tables);

  const db = {};
  return Promise.reduce(tableNames, (__, tableName) => {
    const options = inMemory ? {} : {
      filename: `${path}/${tableName}.db`
    };
    const table = new nedb(options);
    return table.loadDatabaseAsync().then(() => {
      db[tableName] = table;
      if(inMemory){
        const schema = tables[tableName].schema;
        const seed = tables[tableName].seed;
        const toResolve = _.chain(schema)
          .pickBy(_.negate(isPrimitive))
          .toPairs()
          .value();

        let toInsert = Promise.resolve(seed);
        if(toResolve.length > 0){
          toInsert = Promise.reduce(toResolve, (seed, [column, table]) => {
            return Promise.map(seed, obj => {
              return db[table].findOneAsync(obj[column]).then(dep => {
                if(dep === null){
                  throw new Error(`could not find ${JSON.stringify(obj[column])} in ${table}`)
                }
                const override = {};
                override[column] = dep._id;
                const newObj = Object.assign({}, obj, override)
                return newObj
              });
            });
          }, seed);
        }
        return toInsert.then((seed) => table.insertAsync(seed));
      } else{
        return Promise.resolve(null);
      }
    })
  }, null).then(() => db);
}


function determineLoadOrder(tables){

  const dependencies =
    _.mapValues(tables, (table, tableName) =>
      _.filter(table.schema, _.negate(isPrimitive))
    );

  const split = _.chain(dependencies)
    .toPairs()
    .groupBy(([k,v]) => v.length == 0 ? 'independent' : 'dependent')
    .value();

  const loadOrder = _.map(split.independent, ([k]) => k);
  const toResolve = _.cloneDeep(split.dependent);

  while(toResolve.length > 0){
    const index = _.findIndex(toResolve, ([name, deps])=> _.every(deps, dep => _.includes(loadOrder, dep)));
    if(index == -1){
      throw new Error('could not resolve load order for database tables, are there cyclic dependencies, or invalid table names?')
    } else{
      const resolved = toResolve[index];
      loadOrder.push(resolved[0]);
      toResolve.splice(index, 1)
    }
  }
  return loadOrder
}

const primitives = ['string', 'int', 'boolean'];
function isPrimitive(tpe) {
  return _.includes(primitives, tpe);
}

module.exports = {
  load
};