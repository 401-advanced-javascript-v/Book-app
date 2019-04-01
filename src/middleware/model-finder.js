
'use strict';
/**
 * Model Finder Middleware
 * @module middleware/model-finder
 */
module.exports = (req, res, next) => {
  const dataBase = process.env.DB === 'pg' ? 'pg' : 'mongo';
  req.model = require(`../models/${dataBase}-model.js`);
  console.log(req.model);
  next();
};
