import * as lambda from 'aws-lambda';
// import * as succeeded from '../badges/';
import * as AWS from 'aws-sdk';

const codebuild = new AWS.CodeBuild();

/**
 *
 * @param event
 */
export async function handler(event: lambda.APIGatewayProxyEventV2, _context: any) {
  console.log(`event: ${JSON.stringify(event)}`);

  const projectName = event.queryStringParameters?.projectName; // 'PipelineCustomStageprodTest-Fdei5bm2ulR6';
  const onlyUrl = event.queryStringParameters?.url;

  const builds = await codebuild.listBuildsForProject({
    projectName: projectName || '',
  }).promise();

  console.log(`lastBuildStatus: ${JSON.stringify(builds)}`);

  const lastBuildId = builds.ids?.[0] || '';

  const region = process.env.AWS_REGION;
  const account = process.env.ACCOUNT || '981237193288';

  if (onlyUrl === 'true') {
    return {
      statusCode: 301,
      headers: {
        Location: `https://${region}.console.aws.amazon.com/codesuite/codebuild/${account}/projects/${projectName}/build/${lastBuildId}`,
      },
    };
  }

  const lastBuild = await codebuild.batchGetBuilds({
    ids: [lastBuildId],
  }).promise();

  console.log(`lastBuild: ${JSON.stringify(lastBuild)}`);

  const lastBuildStatus = lastBuild.builds?.[0].buildStatus;

  console.log(`lastBuildStatus: ${lastBuildStatus}`);

  let imagePath = './badges/failed.svg';

  switch (lastBuildStatus) {
    case 'SUCCEEDED': {
      imagePath = './badges/succeeded.svg';
      break;
    }
    case 'FAILED': {
      imagePath = './badges/failed.svg';
      break;
    }
    case 'IN_PROGRESS': {
      imagePath = './badges/in_progress.svg';
      break;
    }
    case 'STOPPED': {
      imagePath = './badges/stopped.svg';
      break;
    }
    case 'FAULT': {
      imagePath = './badges/failed.svg';
      break;
    }
    case 'TIMED_OUT': {
      imagePath = './badges/failed.svg';
      break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // const image = require('./alps.png');
  const image = fs.readFileSync(imagePath);

  return {
    statusCode: 200,
    headers:
    {
      'Content-Type': 'image/svg+xml',
    },
    // body: 'PASSING',
    body: image.toString('base64'),
    isBase64Encoded: true,
  };
};