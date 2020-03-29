import serverless from 'serverless-http';
import createApp from './app';

const functionName = 'server';

const app = createApp(functionName);

exports.handler = serverless(app);
