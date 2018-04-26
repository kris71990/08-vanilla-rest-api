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

  router.post('/api/cars/all', (req, res) => {
    logger.log(logger.INFO, 'CAR-ROUTE - POST /api/cars/all');

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
        logger.log(logger.INFO, `in get: ${JSON.stringify(item)}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(item));
        res.end();
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
      });
    return undefined;
  }); 

  // router.del('/api/car', (req, res) => {
  //   logger.log(logger.INFO, 'CAR-ROUTE - DELETE /api/car');

  //   try {
  //     storage.delete('Car', req.url.query.id)
  //       .then((message) => {
  //         res.writeHead(201, { 'Content-Type': 'text/plain' });
  //         res.write(message);
  //         res.end();
  //         return undefined;
  //       });
  //   } catch (err) {
  //     logger.log(logger.ERROR, `CAR-ROUTE - Bad request ${err}`);
  //     res.writeHead(400, { 'Content-Type': 'text/plain' });
  //     res.write('Bad request for Delete');
  //     res.end();
  //     return undefined;
  //   }
  //   return undefined;
  // });
  router.get('/api/cars/all', (req, res) => {
    storage.fetchAll('Car')
      .then((items) => {
        logger.log(logger.INFO, `in get: ${JSON.stringify(items)}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(items));
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
