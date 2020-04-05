import { UserModel } from '../models';

const getUserById = async (id) => {
  return await UserModel.findById(id).exec();
};

const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email }).exec();
};

const createUser = async ({
  email,
  password,
  providerId,
  provider,
  displayName,
  location,
}) => {
  return new Promise(async (resolve, reject) => {
    console.log({
      email,
      password,
      providerId,
      provider,
      displayName,
      location,
    });
    const user = await UserModel.findOne({ email });
    if (user) {
      reject(`email ${email} is already registered`);
    }
    resolve(
      await UserModel.create({
        email,
        password,
        provider,
        providerId,
        displayName,
        location,
      })
    );
  });
};

const getUserByProviderId = async (providerId) => {
  return await await UserModel.findOne({ providerId }).exec();
};

const UserRepository = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserByProviderId,
};

export { UserRepository };
