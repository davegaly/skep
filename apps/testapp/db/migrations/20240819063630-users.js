'use strict';

const dbManager = require("../../../../helpers/dbManager");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  let tableFields = {};
  tableFields.id = { type: 'int', primaryKey: true, autoIncrement: true };
  tableFields.email = 'string';
  tableFields.password = 'string';
  tableFields.displayName = 'string';

  tableFields = dbManager.AddSystemFields(tableFields);

  return db.createTable('users', tableFields);
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 4
};
