import * as lambda from 'aws-lambda';
// import * as AWS from 'aws-sdk';


/**
 *
 * @param event
 */
export async function handler(event: lambda.APIGatewayProxyEventV2) {
  console.log(event);

  return { statusCode: 200, body: 'PASSING' };
};