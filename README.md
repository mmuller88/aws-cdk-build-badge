[![NPM version](https://badge.fury.io/js/aws-cdk-build-badge.svg)](https://badge.fury.io/js/aws-cdk-build-badge)
[![PyPI version](https://badge.fury.io/py/aws-cdk-build-badge.svg)](https://badge.fury.io/py/aws-cdk-build-badge)
[![.NET version](https://img.shields.io/nuget/v/com.github.mmuller88.awsCdkBuildBadge.svg?style=flat-square)](https://www.nuget.org/packages/com.github.mmuller88.awsCdkBuildBadge/)
![Release](https://github.com/mmuller88/aws-cdk-build-badge/workflows/Release/badge.svg)

# aws-cdk-build-badge

This an AWS CDK custom construct for get the status of a CodeBuild Project with has CodePipeline as source. That is currently not possible:

- https://github.com/aws/aws-cdk/issues/1749

How the native badges are working you find in the AWS docs:

- https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-badges.html

After you created the build badge construct you can use the api gateway url to get the badge picture. Additionally you can retrieve the url to to the CodeBuild build with adding ?url=true to the query parameter. See the example.

# Example

Build succeeded: [![CodeBuild test build](https://raw.githubusercontent.com/mmuller88/aws-cdk-build-badge/master/badges/succeeded.svg)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&url=true)

Build failed: [![CodeBuild test build](https://raw.githubusercontent.com/mmuller88/aws-cdk-build-badge/master/badges/failed.svg)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&url=true)

Build not found: [![CodeBuild test build](https://raw.githubusercontent.com/mmuller88/aws-cdk-build-badge/master/badges/not_found.svg)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=123&url=true)

Build in progress: [![CodeBuild test build](https://raw.githubusercontent.com/mmuller88/aws-cdk-build-badge/master/badges/in_progress.svg)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&url=true)

Build stopped: [![CodeBuild test build](https://raw.githubusercontent.com/mmuller88/aws-cdk-build-badge/master/badges/stopped.svg)](https://fktijpwdng.execute-api.eu-central-1.amazonaws.com/prod/?projectName=PipelineCustomStageprodTest-Fdei5bm2ulR6&url=true)

There are more badges (see ./badges/) but I don't have build in that state atm.

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
