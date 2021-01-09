// import * as path from 'path';

import * as apigateway from '@aws-cdk/aws-apigateway';
// import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as core from '@aws-cdk/core';

export interface BuildBadgeProps {
  /**
   * Thats a little safety feature. Set it to 'no' for allowing to see your account id when retrieving the CodeBuild URL.
   * You can as well use a pattern which hides part of your account id like XX1237193288
   *
   * @default - not set and account id will be shown as 123
   */
  readonly hideAccountID?: string;
}

export class BuildBadge extends core.Construct {
  readonly badgeUrl: string;
  constructor(parent: core.Stack, id: string, props?: BuildBadgeProps) {
    super(parent, id);

    const badgeLambda = new lambdajs.NodejsFunction(this, 'badge', {
      bundling: {
        commandHooks: {
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`mkdir ${outputDir}/badges && cp -r ${inputDir}/badges ${outputDir}`];
          },
          beforeInstall(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
        },
      },
      environment: {
        ACCOUNT: props?.hideAccountID ? (props.hideAccountID === 'no' ? parent.account : props.hideAccountID) : '123',
      },
      timeout: core.Duration.minutes(15),
    });

    badgeLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['codebuild:ListBuildsForProject', 'codebuild:BatchGetBuilds'],
      resources: ['*'],
    }));

    const lambdaRestApi = new apigateway.LambdaRestApi(this, 'LambdaRestApi', {
      handler: badgeLambda,
      binaryMediaTypes: ['*/*'],
    });

    this.badgeUrl = lambdaRestApi.url;

    new core.CfnOutput(this, 'BadgeBuildUrl', {
      value: `${this.badgeUrl}?url=true&projectName=XXX`,
    });

    new core.CfnOutput(this, 'BadgeUrl', {
      value: `${this.badgeUrl}?projectName=XXX`,
    });

  }
}