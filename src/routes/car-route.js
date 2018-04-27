'use strict';

const logger = require('../lib/logger');
const Car = require('../model/car');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function carRoute(router) {
  router.post('/api/car', (req, res) => {
    logger.log(logger.INFO, 'CAR-ROUTE - POST /api/car');

    try {
      const newCar = new Car(req.body.make, req.body.model, req.body.year);
      storage.create('Car', newCar)
        .then((car) => {
          response.sendJSON(res, 201, car);
        });
    } catch (err) {
      response.sendText(res, 400, 'Bad request for POST');
      logger.log(logger.ERROR, `CAR-ROUTE - Bad request ${err}`);
    }
    return undefined;
  });

  router.post('/api/cars/all', (req, res) => {
    logger.log(logger.INFO, 'CAR-ROUTE - POST /api/cars/all');

    try {
      const newCar = new Car(req.body.make, req.body.model, req.body.year);
      storage.create('Car', newCar)
        .then((car) => {
          response.sendJSON(res, 201, car);
        });
    } catch (err) {
      response.sendText(res, 400, 'Bad request for POST');
      logger.log(logger.ERROR, `CAR-ROUTE - Bad request ${err}`);
    }
    return undefined;
  });

  router.get('/api/car', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 400, 'No id - request requires and id');
      return undefined;
    }

    storage.fetchOne('Car', req.url.query.id)
      .then((car) => {
        logger.log(logger.INFO, `in get: ${JSON.stringify(car)}`);
        response.sendJSON(res, 200, car);
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        response.sendText(res, 404, 'No id - request requires and id');
      });
    return undefined;
  }); 

  router.get('/api/cars/all', (req, res) => {
    storage.fetchAll('Car')
      .then((cars) => {
        logger.log(logger.INFO, `in get: ${JSON.stringify(cars)}`);
        response.sendJSON(res, 200, cars);
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
      });
    return undefined;
  }); 

  router.del('/api/car', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 400, 'No id - request requires and id');
      return undefined;
    }

    logger.log(logger.INFO, 'CAR-ROUTE - DELETE /api/car');

    try {
      storage.delete('Car', req.url.query.id)
        .then((message) => {
          response.sendText(res, 204, message);
        });
    } catch (err) {
      logger.log(logger.ERROR, `CAR-ROUTE - Bad request ${err}`);
      response.sendText(res, 400, 'Bad request for delete');
    }
    return undefined;
  });
  return undefined;
};
