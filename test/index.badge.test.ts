/* eslint-disable @typescript-eslint/no-require-imports */
import * as AWS from '../__mocks__/aws-sdk';
import { handler } from '../src/index.badge';

const codebuild = new AWS.CodeBuild();

describe('test index.badge.ts lambda', () => {
  describe('failure when', () => {
    test('queryStringParameters.projectName is not existing', async () => {
      mockedApiEvent.queryStringParameters.projectName = undefined;
      await handler(mockedApiEvent).catch((reason: any) => {
        console.log(`reason: ${reason}`);
        expect(JSON.stringify(reason)).toContain('projectName in query parameter is not existing or empty!');
      });
    });
    test('queryStringParameters is not existing', async () => {
      mockedApiEvent.queryStringParameters = undefined;
      await handler(mockedApiEvent).catch((reason: any) => {
        console.log(`reason: ${reason}`);
        expect(JSON.stringify(reason)).toContain('projectName in query parameter is not existing or empty!');
      });
    });
    test('projectName is empty', async () => {
      mockedApiEvent.queryStringParameters = { projectName: '' };
      await handler(mockedApiEvent).catch((reason: any) => {
        console.log(`reason: ${reason}`);
        expect(JSON.stringify(reason)).toContain('projectName in query parameter is not existing or empty!');
      });
    });
  });

  describe('succeeded when', () => {

    const fs = require('fs');
    test('only url', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern', url: 'true' };
      process.env.AWS_REGION = 'test_region';
      process.env.ACCOUNT = '123';
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });

      expect(response).toEqual({
        statusCode: 301,
        headers: {
          Location: 'https://test_region.console.aws.amazon.com/codesuite/codebuild/123/projects/albern/build/1',
        },
      });
    });

    test('build succeeded', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'SUCCEEDED' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/succeeded.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build not found', async () => {
      AWS.listBuildsForProjectResponse.mockRejectedValue({ ids: ['1'] });
      mockedApiEvent.queryStringParameters = { projectName: 'not-exist' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'not-exist' });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/not_found.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build failed', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'FAILED' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/failed.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build in progress', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'IN_PROGRESS' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/in_progress.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build stopped', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'STOPPED' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/stopped.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build fault', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'FAULT' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/failed.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });

    test('build timed out', async () => {
      AWS.listBuildsForProjectResponse.mockReturnValueOnce({ ids: ['1', '2'] });
      AWS.batchGetBuildsResponse.mockReturnValueOnce({ builds: [{ buildStatus: 'TIMED_OUT' }] });
      mockedApiEvent.queryStringParameters = { projectName: 'albern' };
      const response = await handler(mockedApiEvent);
      expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });
      expect(codebuild.batchGetBuilds).toHaveBeenCalledWith({ ids: ['1'] });

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
        },
        body: fs.readFileSync('./badges/failed.svg').toString('base64'),
        isBase64Encoded: true,
      });
    });
  });
});

let mockedApiEvent: any = {
  version: '1',
  rawPath: '',
  routeKey: '',
  rawQueryString: '',
  headers: {},
  queryStringParameters: {
    projectName: '',
  },
  requestContext: {
    accountId: 'string',
    apiId: 'string',
    domainName: 'string',
    domainPrefix: 'string',
    http: {
      method: 'string',
      path: 'string',
      protocol: 'string',
      sourceIp: 'string',
      userAgent: 'string',
    },
    requestId: 'string',
    routeKey: 'string',
    stage: 'string',
    time: 'string',
    timeEpoch: 2,

  },
  isBase64Encoded: false,
};