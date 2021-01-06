import * as cdk from '@aws-cdk/core';
import { BuildBadge } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'my-build-badge-demo-stack', { env });

    new BuildBadge(stack, 'BuildBadge', {});

    this.stack = [stack];
  }
}

new IntegTesting();
