import faker from 'faker';
import { User } from '~/src/types';

const password = faker.internet.password();
export const ValidUserRequest = {
  email: faker.internet.email(),
  password,
  password_confirm: password,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  display_name: faker.internet.userName(),
  location: {
    city: faker.address.city(),
    country: faker.address.country(),
  },
};

export const MongoUser = {
  email: ValidUserRequest.email,
  password: ValidUserRequest.password,
  firstName: ValidUserRequest.first_name,
  lastName: ValidUserRequest.last_name,
  displayName: ValidUserRequest.display_name,
  location: ValidUserRequest.location,
} as User;

export const ValidLoginRequest = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
