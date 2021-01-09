[![NPM version](https://badge.fury.io/js/aws-cdk-build-badge.svg)](https://badge.fury.io/js/aws-cdk-build-badge)
[![PyPI version](https://badge.fury.io/py/aws-cdk-build-badge.svg)](https://badge.fury.io/py/aws-cdk-build-badge)
![Release](https://github.com/mmuller88/aws-cdk-build-badge/workflows/Release/badge.svg)

# aws-cdk-build-badge

This an AWS CDK custom construct for get the status of a CodeBuild Project with has CodePipeline as source. That is currently not possible:

- https://github.com/aws/aws-cdk/issues/1749

How the native badges are working you find in the AWS docs:

- https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-badges.html

After you created the build badge construct you can use the api gateway url to get the badge picture. Additionally you can retrieve the url to to the CodeBuild build with adding ?url=true to the query parameter. See the example.

# Example

Codebuild Synth: [![CodeBuild test build](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&url=true)

```ts
const app = new cdk.App();

const stack = new cdk.Stack(app, 'my-build-badge-demo-stack');

// without exposing the account id in the url when using ?url=true
new BuildBadge(stack, 'BuildBadge');

// with exposing the account id in the url when using ?url=true
new BuildBadge(stack, 'BuildBadge2', { hideAccountID: 'no' });

// partly exposing the account id in the url when using ?url=true
new BuildBadge(stack, 'BuildBadge3', { hideAccountID: 'XX123356' });
```

# Thanks To

- The CDK Community cdk-dev.slack.com
- [Projen](https://github.com/projen/projen) project and the community around it
- https://github.com/btorun/aws-codebuild-badges
