'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');

const Router = module.exports = function router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function put(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function del(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route() {
  return (req, res) => {
    Promise.all([urlParser(req), bodyParser(req)])
      .then(() => {
        if (typeof this.route[req.method][req.url.pathname] === 'function') {
          this.route[req.method][req.url.pathname](req, res);
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('400 - Route not found');
        res.end();
      })
      .catch((err) => {
        if (err instanceof SyntaxError) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('404 - Route not found'); 
          res.end();
          return;
        }
        logger.log(logger.ERROR, JSON.stringify(err));
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('400 - Bad request');
        res.end();
      });
  };
};