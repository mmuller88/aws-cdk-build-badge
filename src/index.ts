// import * as path from 'path';

import * as apigateway from '@aws-cdk/aws-apigateway';
// import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as core from '@aws-cdk/core';

export interface BuildBadgeProps {
  /**
   * If you don't want to expose your account id with using ?url=true in the query.
   * Instead it will use XXX for your account id which you can replace with your id manually
   */
  readonly hideAccountId?: boolean;
}

export class BuildBadge extends core.Construct {
  readonly badgeUrl: string;
  constructor(parent: core.Stack, id: string, props: BuildBadgeProps) {
    super(parent, id);
    props;

    const badgeLambda = new lambdajs.NodejsFunction(this, 'badge', {
      bundling: {
        // nodeModules: ['text-to-image'],
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
      }, // codebuild:ListBuildsForProject
      environment: {
        ACCOUNT: props.hideAccountId ? 'XXX' : parent.account,
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
      value: `${this.badgeUrl}?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&&url=true`,
    });

    new core.CfnOutput(this, 'BadgeUrl', {
      value: `${this.badgeUrl}?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6`,
    });

  }
}