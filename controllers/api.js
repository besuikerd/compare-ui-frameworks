'use strict';

const requireDir = require('require-dir');
const express = require('express');
const router = express.Router();
const typeParser = require('../lib/type-parser');
const tables = requireDir('../lib/tables');
const escape = require('escape-html');

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
            obj[key] = typeParser[schema[key]](param)
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
          // req.io.of(`/${tableName}`.emit('read', docs));
          res.json(docs);
        }
      })
    });

    router.get(`/${tableName}/new`, (req, res) => {
      req.db[tableName].find({}, (err, docs) => {
        res.render('crud/new', {
          schema: table.schema,
          name: tableName,
          entities: docs
        });
      });
    });

    router.post(`/${tableName}`, (req, res) => {
      const obj = parseEntity(req,res);
      if(obj){
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
    })

    router.put(`/${tableName}/:id`, (req, res) => {
      const obj = parseEntity(req, res);
      if(obj) {
        console.log(obj);
        req.flash('info_unsafe', `updated  <pre>${escape(JSON.stringify(obj))}</pre> to ${tableName}`)
        req.db[tableName].update({_id: req.params['id']}, obj);
        req.io.of(`/${tableName}`).emit('update', obj);
      }
      res.redirect(`/api/${tableName}/new`);
    })
  });

  return router;
}