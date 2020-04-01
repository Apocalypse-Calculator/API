import serverless from 'serverless-http';
import createApp from './pinging';

const functionName = 'ping';

const app = createApp(functionName);

exports.handler = serverless(app);
