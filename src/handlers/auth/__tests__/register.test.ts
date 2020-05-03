import { UserRepository } from '~/src/storage';
import { registerUser } from '../register';
import { ValidUserRequest, MongoUser } from './fixtures/data';
import httpMocks from 'node-mocks-http';
import { AuthService } from '~/src/services/auth';

describe('register handlers', () => {
  const serializeSpy = jest.spyOn(UserRepository, 'serialize');
  const createSpy = jest.spyOn(UserRepository, 'create');
  const authSpy = jest.spyOn(AuthService, 'hashPassword');

  afterEach(jest.resetAllMocks);
  it('WHEN valid data, should register user', async () => {
    serializeSpy.mockReturnValueOnce(MongoUser);
    createSpy.mockResolvedValueOnce(MongoUser);
    authSpy.mockResolvedValueOnce('hashed');

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/register',
      params: {},
      body: ValidUserRequest,
    });

    const response = httpMocks.createResponse();
    await registerUser(request, response);

    const data = response._getJSONData();
    const code = response._getStatusCode();

    expect(createSpy).toBeCalledWith({
      ...ValidUserRequest,
      password: 'hashed',
    });

    expect(code).toBe(201);
    expect(data).toMatchObject({ success: true, user: MongoUser });
  });

  it('WHEN missing email in request, it returns an error', async () => {
    const body = { ...ValidUserRequest };
    delete body.email;

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/register',
      params: {},
      body,
    });

    const resp = httpMocks.createResponse();
    await registerUser(request, resp);

    const data = resp._getJSONData();
    const code = resp._getStatusCode();

    expect(code).toBe(422);
    expect(data).toMatchObject({
      success: false,
      errors: ['email is required'],
    });
  });

  it('WHEN missing passwords in request, it returns an error', async () => {
    const body = { ...ValidUserRequest };
    delete body.password;
    delete body.password_confirm;

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/register',
      params: {},
      body,
    });

    const resp = httpMocks.createResponse();
    await registerUser(request, resp);

    const data = resp._getJSONData();
    const code = resp._getStatusCode();

    expect(code).toBe(422);
    expect(data).toMatchObject({
      success: false,
      errors: ['password is required', 'password confirmation is required'],
    });
  });

  it('WHEN passwords mismatch, it returns error', async () => {
    const body = { ...ValidUserRequest };
    body.password = 'mistmatched';

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/register',
      params: {},
      body,
    });

    const resp = httpMocks.createResponse();
    await registerUser(request, resp);

    const data = resp._getJSONData();
    const code = resp._getStatusCode();

    expect(code).toBe(422);
    expect(data).toMatchObject({
      success: false,
      errors: ['password does not match password confirmation'],
    });
  });

  it('WHEN creating user throws error, it returns error message', async () => {
    createSpy.mockRejectedValueOnce(new Error('create user error'));

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/users/register',
      params: {},
      body: ValidUserRequest,
    });

    const response = httpMocks.createResponse();
    await registerUser(request, response);

    const data = response._getJSONData();
    const code = response._getStatusCode();

    expect(code).toBe(500);
    expect(data).toMatchObject({ success: false, error: 'create user error' });
  });
});
