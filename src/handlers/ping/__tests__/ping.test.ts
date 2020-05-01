import httpMocks from 'node-mocks-http';
import * as db from '~/src/storage/connection';

const spy = jest.spyOn(db, 'dbConnectionStatus');

import { ping } from '..';
import { ItemDefinition } from '~/src/models';

describe('ping handler', () => {
  beforeEach(() => {
    spy.mockReset();
  });
  it('should respond with status 200 OK when db connected', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/ping',
      params: {},
    });

    spy.mockReturnValueOnce('connected');

    const response = httpMocks.createResponse();
    await ping(request, response);

    const data = response._getJSONData();
    const code = response._getStatusCode();
    expect(data).toMatchObject({ status: { db: 'connected' } });
    expect(code).toBe(200);
  });

  it('should return error status when db is not connected', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/ping',
      params: {},
    });

    spy.mockReturnValueOnce('disconnected');

    const response = httpMocks.createResponse();
    await ping(request, response);

    const data = response._getJSONData();
    const code = response._getStatusCode();
    expect(data).toMatchObject({ status: { db: 'disconnected' } });
    expect(code).toBe(500);
  });
});
