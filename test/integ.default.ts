import * as cdk from '@aws-cdk/core';
import { BuildBadge } from '../src/index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const stack = new cdk.Stack(app, 'my-build-badge-demo-stack');

    new BuildBadge(stack, 'BuildBadge');

    this.stack = [stack];
  }
}

new IntegTesting();
