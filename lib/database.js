const nedb = require('nedb');



function load(path, inMemory, callback){
  const tables = require('require-dir')('./tables');
  const tableNames = Object.keys(tables);
  const options = inMemory ? {} : {
    filename: `${path}/${tableName}.db`
  };

  function loadTables(tables, cb){
    const db = {};
    function loadTable(i){
      if(i < tableNames.length){
        const tableName = tableNames[i];
        const table = new nedb(options);
        table.loadDatabase((err) => {
          if(!err){
            db[tableName] = table;
            if(inMemory){
              const seedData = tables[tableName];
              table.insert(seedData, (err, newDocs) => console.log('inserted', newDocs));
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