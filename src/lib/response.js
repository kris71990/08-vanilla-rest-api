'use strict';

const response = module.exports = {};

response.sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
  return undefined;
};

response.sendText = (res, status, text) => {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.write(text);
  res.end();
  return undefined;
};
