'use strict';

const uuid = require('uuid');
const logger = require('../lib/logger');

module.exports = class {
  constructor(make, model, year) {
    this.id = uuid();
    this.make = make;
    this.model = model;
    this.year = year;
    logger.log(logger.INFO, `CAR - Created new instance of car: ${JSON.stringify(this)}`);
  }
};
