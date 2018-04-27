'use strict';

const logger = require('./logger');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';
    req.on('data', (data) => {
      message += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(message);
        logger.log(logger.INFO, `${req.method} request parsed and sent to server`);
        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });

    req.on('error', (err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
      reject(err);
    });
    return undefined;
  });
};
