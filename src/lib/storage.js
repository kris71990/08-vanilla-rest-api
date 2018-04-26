'use strict';

const logger = require('./logger');

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
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create new item - schema required'));
    if (!id) return reject(new Error('Cannot find item - id required'));
    if (!memory[schema]) memory[schema] = {};
    const item = memory[schema][id];

    if (!item) {
      return reject(new Error('item not found'));
    }
    return resolve(item);
  });
};

storage.fetchAll = function fetchAll(schema) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot find items - schema required'));
    if (!memory[schema]) return reject(new Error('Could not find any items of this schema'));
    
    const items = memory[schema];
    return resolve(items);
  });
};

storage.delete = function del(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot find items - schema required'));
    if (!id) return reject(new Error('Could not find item - id required'));
    const item = memory[schema][id];

    if (!item) {
      return reject(new Error('item does not exist'));
    } 
    memory[schema][item.id] = null;
    return resolve('Item deleted');
  });
};
