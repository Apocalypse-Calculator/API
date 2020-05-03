import { UserRepository } from '~/src/storage';
import { AuthService } from '~/src/services/auth';
import httpMocks from 'node-mocks-http';
import { ValidLoginRequest, MongoUser } from './fixtures/data';
import { login } from '../login';

describe('login user handler', () => {
  const getEmailSpy = jest.spyOn(UserRepository, 'getByEmail');
  const serializeSpy = jest.spyOn(UserRepository, 'serialize');
  const verifyPassword = jest.spyOn(AuthService, 'verifyPassword');
  const signTokenSpy = jest.spyOn(AuthService, 'signToken');

  it('WHEN credentials valid, it returns jwt token', async () => {
    getEmailSpy.mockResolvedValueOnce(MongoUser);
    verifyPassword.mockResolvedValueOnce(true);
    serializeSpy.mockReturnValueOnce(MongoUser);
    signTokenSpy.mockReturnValue('jwt-signed-token');

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/login',
      params: {},
      body: ValidLoginRequest,
    });

    const response = httpMocks.createResponse();
    request.login = () => {};
    await login(request, response);

    const code = response._getStatusCode();
    const headers = response._getHeaders();
    expect(code).toBe(200);
    expect(headers.jwt).toBe('jwt-signed-token');
  });

  it('WHEN wrong credentials, it returns errors ', async () => {
    getEmailSpy.mockResolvedValueOnce(MongoUser);
    verifyPassword.mockResolvedValue(false);

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/login',
      params: {},
      body: ValidLoginRequest,
    });

    const response = httpMocks.createResponse();
    request.login = () => {};
    await login(request, response);

    const code = response._getStatusCode();
    const headers = response._getHeaders();
    expect(code).toBe(401);
    expect(headers).not.toHaveProperty('jwt');
  });
});
