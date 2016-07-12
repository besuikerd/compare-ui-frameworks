'use strict';

const requireDir = require('require-dir');
const express = require('express');
const router = express.Router();
const typeParser = require('../lib/type-parser');
const tables = requireDir('../lib/tables');
const escape = require('escape-html');
const database = require('../lib/database');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (app) => {
  Object.keys(tables).forEach(tableName => {
    const table = tables[tableName];
    const schema = table.schema;

    const namespace = app.io.of(`/${tableName}`);
    namespace.on('connection', (socket) => {
      const query = socket.request._query;
      namespace.emit('connected', query);
      socket.on('disconnect', () => namespace.emit('disconnected', query));
    });

    function parseEntity(req, res){
      const params = req.body;
      const obj = {};
      let success = true;
      Object.keys(schema).forEach((key) => {
        const param = params[key];
        if(param === undefined){
          if(schema[key] == 'boolean'){ //
            obj[key] = false;
          } else{
            success = false;
            req.flash('warning', `missing parameter ${key}`);
          }
        } else{
          try{
            if(database.isPrimitive(schema[key])){
              obj[key] = typeParser[schema[key]](param);
            } else{
              obj[key] = param;
            }
          } catch(e){
            req.flash('warning', e.message);
            success = false;
          }
        }
      });
      if(success){
        return obj;
      }
    }

    router.get(`/${tableName}`, (req, res) => {
      req.db[tableName].find({}, (err, docs) => {
        if(err) {
          res.render('error', {error: err});
        } else{
          database.resolveDependencies(req.db, table.schema, docs).then(docs => res.json(docs));
        }
      })
    });

    router.get(`/${tableName}/new`, (req, res) => {
      req.db[tableName].find({}).sort({created_at: 1}).execAsync().then(docs => {
        const dependencies = database.getDependencies(table.schema);
        Promise.reduce(dependencies, (deps, dep) => {
          return req.db[dep].findAsync({}).then(depItems => {
            //omit timestamps
            const ommitedDepItems = _.map(depItems, (dep) => _.omit(dep, ['created_at', 'last_modified']));

            const obj = {};
            obj[dep] = ommitedDepItems;
            return Object.assign({}, deps, obj);
          });
        }, {}).then(deps => {
          res.render('crud/new', {
            schema: table.schema,
            name: tableName,
            entities: docs,
            dependencies: deps
          });
        });
      });
    });

    router.get(`/${tableName}/find`, (req, res) => {
      console.log('params', req.params);
      const query = req.param('query');
      if(query === undefined){
        res.render('error', {error: new Error('No query object parameter sent')});
      } else{
        try{
          const parsed = JSON.parse(query)
          req.db[tableName].find(parsed, (err, docs) => {
            if(err) {
              res.render('error', {error: err});
            } else{
              database.resolveDependencies(req.db, schema, docs).then(docs => res.json(docs));
            }
          })
        } catch(e){
          res.render('error', {error: e});
        }
      }
    });

    router.get(`/${tableName}/findOne`, (req, res) => {
      console.log('params', req.params);
      const query = req.param('query');
      if(query === undefined){
        res.render('error', {error: new Error('No query object parameter sent')});
      } else{
        try{
          const parsed = JSON.parse(query);
          req.db[tableName].findOne(parsed, (err, docs) => {
            if(err) {
              res.render('error', {error: err});
            } else{
              res.json(docs)
            }
          })
        } catch(e){
          res.render('error', {error: e});
        }
      }
    });


    router.post(`/${tableName}`, (req, res) => {
      const obj = parseEntity(req,res);
      if(obj){
        const timestamp = new Date();
        console.log('date', timestamp)
        obj.created_at = timestamp;
        obj.last_modified = timestamp;

        req.db[tableName].insert(obj);
        req.io.of(`/${tableName}`).emit('create', obj);
        req.flash('info_unsafe', `added <pre>${escape(JSON.stringify(obj))}</pre> to ${tableName}`);
      }
      res.redirect(`${tableName}/new`);
    });

    router.delete(`/${tableName}/:id`, (req, res) => {
      const _id = req.params['id'];

      const obj = req.db[tableName].findOne({_id}, (err, obj) => {
        if(err) throw err;
        req.db[tableName].remove({_id: req.params['id']}, (err) => {
          if(err) throw err;
          req.io.of(`/${tableName}`).emit('delete', obj);
          req.flash('info_unsafe', `removed <pre>${escape(JSON.stringify(obj))}</pre> from ${tableName}`);
          res.redirect(`/api/${tableName}/new`);
        });
      });
    });

    router.put(`/${tableName}/:id`, (req, res) => {
      const obj = parseEntity(req, res);
      if(obj) {
        obj.last_modified = new Date();
        req.flash('info_unsafe', `updated  <pre>${escape(JSON.stringify(obj))}</pre> in ${tableName}`)
        req.db[tableName].update({_id: req.params['id']}, obj);
        req.io.of(`/${tableName}`).emit('update', obj);
      }
      res.redirect(`/api/${tableName}/new`);
    })
  });

  return router;
};