'use strict';

const logger = require('../lib/logger');
const Car = require('../model/car');
const storage = require('../lib/storage');

module.exports = function carRoute(router) {
  router.post('/api/car', (req, res) => {
    logger.log(logger.INFO, 'CAR-ROUTE - POST /api/car');

    try {
      const newCar = new Car(req.body.make, req.body.model, req.body.year);
      storage.create('Car', newCar)
        .then((car) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(car));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `CAR-ROUTE - Bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request for POST');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/car', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('No id - request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Car', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(item));
        res.end();
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
      });
    return undefined;
  }); 
  return undefined;
};
