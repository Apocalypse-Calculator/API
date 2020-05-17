import serverless from 'serverless-http';
import createApp from './calculation-service';
import AWSLambda from 'aws-lambda';

const name = 'calculations';

export const handler = async (
  event: AWSLambda.APIGatewayEvent,
  context: AWSLambda.Context
): Promise<AWSLambda.APIGatewayProxyResult> => {
  const app = await createApp(name);

  const handler = serverless(app);
  return await handler(event, context);
};
