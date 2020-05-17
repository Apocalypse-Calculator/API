import serverless from 'serverless-http';
import createApp from './guest-service';
import AWSLambda from 'aws-lambda';

const name = 'guests';

export const handler = async (
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context
): Promise<AWSLambda.APIGatewayProxyResult> => {
  const app = await createApp(name);

  const handler = serverless(app);
  return await handler(event, context);
};
