'use strict';

const logger = require('./logger');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

const storage = module.exports = {};
const memory = {};

storage.create = function create(schema, item) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create new item - schema required'));
    if (!item) return reject(new Error('Cannot create new item - item required'));

    if (!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    logger.log(logger.INFO, 'Storage = created a new item');
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return reject(new Error('Cannot create new item - schema required'));
  if (!id) return reject(new Error('Cannot find item - id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then((buffer) => {
      try {
        const item = JSON.parse(buffer.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, err);
    });
};

// return new Promise((resolve, reject) => {
//   if (!schema) return reject(new Error('Cannot create new item - schema required'));
//   if (!id) return reject(new Error('Cannot find item - id required'));
//   if (!memory[schema]) memory[schema] = {};
//   const item = memory[schema][id];

//   if (!item) {
//     return reject(new Error('item not found'));
//   }
//   return resolve(item);
// });
// };

storage.fetchAll = function fetchAll(schema) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot find items - schema required'));
    if (!memory[schema]) return reject(new Error('Could not find any items of this schema'));
    
    const items = memory[schema];
    return resolve(items);
  });
};

storage.delete = function del(schema, id) {
  logger.log(logger.INFO, 'delete');
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot find items - schema required'));
    if (!id) return reject(new Error('Could not find item - id required'));
    let item = memory[schema][id];

    if (!item) {
      return reject(new Error('item does not exist'));
    } 
    item = null;
    return resolve('Item deleted');
  });
};
