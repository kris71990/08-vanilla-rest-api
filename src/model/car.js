'use strict';

const uuid = require('uuid');
const logger = require('../lib/logger');

module.exports = class {
  constructor(make, model, year, color) {
    this.id = uuid();
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    logger.log(logger.INFO, `CAR - Created new instance of car: ${JSON.stringify(this)}`);
  }
};
