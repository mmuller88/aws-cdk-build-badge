import * as core from '@aws-cdk/core';
import { BuildBadge } from '../src';
import '@aws-cdk/assert/jest';

describe('Get', () => {
  describe('BuildBadge', () => {
    const app = new core.App();
    const stack = new core.Stack(app, 'testing-stack');

    describe('successful', () => {
      describe('as ...', () => {
        new BuildBadge(stack, 'BuildBadge', {});

        test('which exist', () => {
          expect(stack).toHaveResourceLike('AWS::ApiGateway::Method');
          expect(stack).toHaveResourceLike('AWS::Lambda::Function');
        });
      });
    });
  });
});