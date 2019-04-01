'use strict';
/**
 * require a memory model
 */
const BookShelfModel = require('../../models/mongo-model.js');

/**
 * build schema file for categories
 */
const schema = {
  _id: {required:true},
  name: {required:true},
};

/**
 * define class Bookshelf as a extend of Model
 */
class BookShelfModel extends MongoModel {}

module.exports = new BookShelfModel(schema);