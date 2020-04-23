import { User } from '~/src/models';

export const create = async (options: any) => {
  const { email } = options;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`email ${email} already registered`);
  }
  return await User.create(options);
};
