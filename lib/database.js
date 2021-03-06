const nedb = require('nedb');
const _ = require('lodash');
const Promise = require('bluebird');
Promise.promisifyAll(nedb.prototype);

const Cursor = require('nedb/lib/cursor')
Promise.promisifyAll(Cursor.prototype);

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
        return toInsert.then((seed) => {
          const timestamp = new Date();
          const timestamps = {
            created_at: timestamp,
            last_modified: timestamp
          };
          const seedWithTimestamps= _.map(seed, obj => Object.assign({}, obj, timestamps));
          table.insertAsync(seedWithTimestamps)
        });
      } else{
        return Promise.resolve(null);
      }
    })
  }, null).then(() => db);
}

function getDependencies(schema){
  return _.filter(schema, _.negate(isPrimitive))
}

function resolveDependencies(db, schema, objects){
  const dependencies = _.chain(schema)
    .omitBy(isPrimitive)
    .value();

  return Promise.reduce(Object.keys(dependencies), (deps, field) => {
    const dependencyTable = schema[field];

    return db[dependencyTable].findAsync({}).then(depItems => {
      depItems = _.chain(depItems)
        .map((dep) => [dep._id, _.omit(dep, ['created_at', 'last_modified'])])
        .fromPairs()
        .value();

      const obj = {};
      obj[dependencyTable] = depItems;
      return Object.assign({}, deps, obj);
    });
  }, {}).then(tables => {
      return _.map(objects, (obj) => {
        const resolvedDependencies = _.chain(dependencies)
          .map((table, field) => {
            return [field, tables[table][obj[field]]]
          })
          .fromPairs()
          .value();
        return Object.assign({}, obj, resolvedDependencies);
      })
    });
}

function determineLoadOrder(tables){

  const dependencies =
    _.mapValues(tables, (table, tableName) => getDependencies(table.schema));

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
  load,
  getDependencies,
  resolveDependencies,
  isPrimitive
};