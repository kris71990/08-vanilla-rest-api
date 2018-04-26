'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { make: 'honda', model: 'civic', year: 2012 };
const mockResource2 = { make: 'suburu', model: 'forester', year: 2010 };
let mockId = null;
let invalidid = 1234;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('POST request to /api/car', () => {
  test('POSTS creation of new car', () => {
    return superagent.post(`:${testPort}/api/car`)
      .send(mockResource)
      .then((res) => {
        mockId = res.body.id;
        expect(res.status).toEqual(201);
        expect(res.body.model).toEqual('civic');
      });
  });

  test('POST multiple cars', () => {
    return superagent.post(`:${testPort}/api/cars/all`)
      .send(JSON.stringify(mockResource))
      .send(JSON.stringify(mockResource2))
      .then((res) => {
        console.log(res.body);
        expect(res.status).toEqual(201);
      });
  });

  // test('should return 400 error for bad request', () => {
  //   return superagent.post(`:${testPort}/api/car`)
  //     .send(null)
  //     .then((res) => {
  //       console.log(res);
  //       expect(res.status).toEqual(404);
  //     });
  // });
});

describe('GET request from api/car', () => {
  test('should respond with data from requested endpoint', () => {
    return superagent.get(`:${testPort}/api/car?id=${mockId}`)
      .then((res) => {
        const parse = JSON.parse(res.text);
        expect(parse.make).toEqual(mockResource.make);
        expect(parse.model).toEqual(mockResource.model);
        expect(parse.year).toEqual(mockResource.year);
        expect(res.status).toEqual(200);
      });
  });

  test('GET all should return entire schema', () => {
    return superagent.get(`:${testPort}/api/cars/all`)
      .then((res) => {
        const parse = JSON.parse(res.text);
        expect(Object.keys(parse)).toHaveLength(2);
        expect(res.status).toEqual(200);
      });
  });

  // test('GET with invalid id', () => {
  //   return superagent.get(`:${testPort}/api/car?id=${invalidid}`)
  //     .then((res) => {
  //       console.log(res.status);
  //     });
  // });

  // test('shoud return 404 error if id does not exist', () => {
  //   return superagent.get(`:${testPort}/api/car?id=12345`)
  //     .then((res) => {
  //       console.log(res.status);
  //       expect(res.status).toEqual(404);
  //     });
  // });
});

// describe('delete', () => {
//   test('should return message', () => {
//     return superagent.delete(`${testPort}/api/car?id=${mockId}`)
//       .then((res) => {
//       });
//   });
// });
