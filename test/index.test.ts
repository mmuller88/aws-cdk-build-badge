import { SynthUtils } from '@aws-cdk/assert';
import * as core from '@aws-cdk/core';
import { BuildBadge } from '../src';
import '@aws-cdk/assert/jest';


describe('Get', () => {
  describe('BuildBadge', () => {
    const app = new core.App();
    const stack = new core.Stack(app, 'testing-stack');

    describe('successful', () => {
      test('with not defined hideAccountID', () => {
        new BuildBadge(stack, 'BuildBadge1');
        expect(stack).toHaveResourceLike('AWS::ApiGateway::Method');
        expect(stack).toHaveResourceLike('AWS::Lambda::Function');
        expect(JSON.stringify(SynthUtils.toCloudFormation(stack))).toContain('\"ACCOUNT\":\"123\"');
      });
      test('with hideAccountID = "no"', () => {
        new BuildBadge(stack, 'BuildBadge2', { hideAccountID: 'no' });
        expect(stack).toHaveResourceLike('AWS::ApiGateway::Method');
        expect(stack).toHaveResourceLike('AWS::Lambda::Function');
        expect(JSON.stringify(SynthUtils.toCloudFormation(stack))).toContain('"ACCOUNT\":{\"Ref\":\"AWS::AccountId\"}');
      });

      test('with hideAccountID = "XX123"', () => {
        new BuildBadge(stack, 'BuildBadge3', { hideAccountID: 'XX123' });
        expect(stack).toHaveResourceLike('AWS::ApiGateway::Method');
        expect(stack).toHaveResourceLike('AWS::Lambda::Function');
        expect(JSON.stringify(SynthUtils.toCloudFormation(stack))).toContain('"ACCOUNT\":\"XX123\"');
      });

      test('with default project name', () => {
        new BuildBadge(stack, 'BuildBadge4', { defaultProjectName: 'ups' });
        expect(stack).toHaveResourceLike('AWS::ApiGateway::Method');
        expect(stack).toHaveResourceLike('AWS::Lambda::Function');
        expect(JSON.stringify(SynthUtils.toCloudFormation(stack))).toContain('\"DEFAULT_PROJECT_NAME\":\"ups\"');
      });
    });
  });
});