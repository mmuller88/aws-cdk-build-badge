import * as lambda from 'aws-lambda';
import * as AWS from 'aws-sdk';

const codebuild = new AWS.CodeBuild();

export async function handler(event: lambda.APIGatewayProxyEventV2) {
  console.debug(`event: ${JSON.stringify(event)}`);

  const projectName = event.queryStringParameters?.projectName || process.env.DEFAULT_PROJECT_NAME;
  const onlyUrl = event.queryStringParameters?.url;

  if (!projectName || projectName === '') {
    throw 'projectName in query parameter is not existing or empty!';
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');

  let builds;
  try {
    builds = await codebuild.listBuildsForProject({
      projectName: projectName || '',
    }).promise();
  } catch (e) {
    return {
      statusCode: 200,
      headers:
      {
        'Content-Type': 'image/svg+xml',
      },
      body: fs.readFileSync('./badges/not_found.svg').toString('base64'),
      isBase64Encoded: true,
    };
  }

  console.debug(`lastBuildStatus: ${JSON.stringify(builds)}`);

  const lastBuildId = builds.ids?.[0] || '';

  const region = process.env.AWS_REGION;
  const account = process.env.ACCOUNT;

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

  console.debug(`lastBuild: ${JSON.stringify(lastBuild)}`);

  const lastBuildStatus = lastBuild.builds?.[0].buildStatus;

  console.debug(`lastBuildStatus: ${lastBuildStatus}`);

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

  return {
    statusCode: 200,
    headers:
    {
      'Content-Type': 'image/svg+xml',
    },
    body: fs.readFileSync(imagePath).toString('base64'),
    isBase64Encoded: true,
  };
};