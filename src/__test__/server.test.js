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
        expect(res.body.model).toEqual('civic');
      });
  });

  test('POST multiple cars to /api/cars/all', () => {
    return superagent.post(`:${testPort}/api/cars/all`)
      .send(mockResource)
      .then((res) => {
        expect(res.status).toEqual(201);
      });
  });

  // test.only('should return 400 error for bad request', () => {
  //   return superagent.post(`:${testPort}/api/car`)
  //     .send('test')
  //     .then((res) => {
  //       console.log(res);
  //       expect(res.status).toEqual(400);
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
        console.log(res.text);
        const parse = JSON.parse(res.text);
        expect(parse.make).toEqual(mockResource.make);
        expect(parse.model).toEqual(mockResource.model);
        expect(parse.year).toEqual(mockResource.year);
        expect(res.status).toEqual(200);
      });
  });

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
//     return superagent.delete(`${testPort}/api/car`)
//       .then((res) => {
//         console.log(res);
//       });
//   });
// });
