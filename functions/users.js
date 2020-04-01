import serverless from 'serverless-http';
import createApp from './authorizing';

const functionName = 'users';

const app = createApp(functionName);

exports.handler = serverless(app);
