import serverless from 'serverless-http';
import { createApp } from './ping-service';

const functionName = 'ping';

export const handler = async (
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context
): Promise<AWSLambda.APIGatewayProxyResult> => {
  const app = await createApp(functionName);

  const handler = serverless(app);
  return await handler(event, context);
};
