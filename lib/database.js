const nedb = require('nedb');



function load(path, inMemory, callback){
  const tables = require('require-dir')('./tables');
  const tableNames = Object.keys(tables);

  function loadTables(tables, cb){
    const db = {};
    function loadTable(i){
      if(i < tableNames.length){
        const tableName = tableNames[i];
        const options = inMemory ? {} : {
          filename: `${path}/${tableName}.db`
        };
        const table = new nedb(options);
        table.loadDatabase((err) => {
          if(!err){
            db[tableName] = table;
            if(inMemory){
              const seedData = tables[tableName].seed;
              table.insert(seedData);
            }
            loadTable(i + 1, cb)
          }
        })
      } else{
        cb(db);
      }
    }
    loadTable(0);
  }

  loadTables(tables, (db) => callback(null, db));
}

module.exports = {
  load
};