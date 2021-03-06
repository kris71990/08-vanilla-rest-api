'use strict';

const logger = require('./logger');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

const storage = module.exports = {};
const memory = {};

storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create new item - schema required'));
  if (!item) return Promise.reject(new Error('Cannot create new item - item required'));
  if (!memory[schema]) memory[schema] = {};
  const json = JSON.stringify(item);

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'Storage - created a new resource');
      return item;
    })
    .catch(err => Promise.reject(err));
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('Cannot create new item - schema required'));
  if (!id) return Promise.reject(new Error('Cannot find item - id required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((buffer) => {
      try {
        const car = JSON.parse(buffer.toString());
        return car;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};

storage.fetchAll = function fetchAll(schema) {
  if (!schema) return Promise.reject(new Error('Cannot find items - schema required'));
  if (!memory[schema]) return Promise.reject(new Error('Could not find any items of this schema'));

  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      try {
        const arr = files.map(file => file.toString());
        return arr;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
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
