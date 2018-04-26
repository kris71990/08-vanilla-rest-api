'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { make: 'honda', model: 'civic', year: 2012 };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('POST request to /api/car', () => {
  test('should respond with creation of new car', () => {
    return superagent.post(`:${testPort}/api/car`)
      .send(mockResource)
      .then((res) => {
        mockId = res.body.id;
        expect(res.status).toEqual(201);
      });
  });
});
