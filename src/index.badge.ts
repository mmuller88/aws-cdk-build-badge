import * as lambda from 'aws-lambda';
// import * as succeeded from '../badges/';
// import * as AWS from 'aws-sdk';


/**
 *
 * @param event
 */
export async function handler(event: lambda.APIGatewayProxyEventV2, _context: any) {
  console.log(event);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // const image = require('./alps.png');
  const image = fs.readFileSync('./badges/alps.png');

  return {
    statusCode: 200,
    headers:
    {
      'Content-Type': 'image/png',
    },
    // body: 'PASSING',
    body: image.toString('base64'),
    isBase64Encoded: true,
  };
};