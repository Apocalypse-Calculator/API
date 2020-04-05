import serverless from 'serverless-http';
import createApp from './authorizing';

const functionName = 'users';

export const handler = async (event, context) => {
  const app = await createApp(functionName);

  const handler = serverless(app);
  const result = await handler(event, context);
  return result;
};
