// import * as path from 'path';

import * as apigateway from '@aws-cdk/aws-apigateway';
// import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as core from '@aws-cdk/core';

export interface BuildBadgeProps {

}

export class BuildBadge extends core.Construct {
  readonly badgeUrl: string;
  constructor(parent: core.Stack, id: string, props: BuildBadgeProps) {
    super(parent, id);
    props;

    const badgeLambda = new lambdajs.NodejsFunction(this, 'badge', {
      bundling: {
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/badges/alps.png ${outputDir}/badges/alps.png`];
          },
          beforeInstall(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          afterBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
        },
      },
      timeout: core.Duration.minutes(15),
      // handler: 'get',
      // tracing: lambda.Tracing.ACTIVE,
    });

    // const badgeLambda = new lambda.Function(this, 'badgeLambda', {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   tracing: lambda.Tracing.ACTIVE,
    //   handler: 'badge.handler',
    //   code: lambda.Code.fromAsset(path.join(__dirname, '../lib')),
    // });

    const lambdaRestApi = new apigateway.LambdaRestApi(this, 'LambdaRestApi', {
      handler: badgeLambda,
      binaryMediaTypes: ['*/*'],
    });

    this.badgeUrl = lambdaRestApi.url;

    new core.CfnOutput(this, 'BadgeUrl', {
      value: this.badgeUrl,
    });

  }
}