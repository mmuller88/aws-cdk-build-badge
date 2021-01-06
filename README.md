[![NPM version](https://badge.fury.io/js/aws-cdk-build-badge.svg)](https://badge.fury.io/js/aws-cdk-build-badge)
[![PyPI version](https://badge.fury.io/py/aws-cdk-build-badge.svg)](https://badge.fury.io/py/aws-cdk-build-badge)
![Release](https://github.com/mmuller88/aws-cdk-build-badge/workflows/Release/badge.svg)

# aws-cdk-build-badge

Thats an AWS CDK Construct for get the status of a CodeBuild Project with has CodePipeline as source. Thats it as currently it is a limitation to create a badge for a project with has CodePipeline as source:

- https://github.com/aws/aws-cdk/issues/1749

How the native badges are working you find in the AWS docs:

- https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-badges.html

The construct implementation will try to mimic that behavior as much it makes sense.

# Example

...

# Thanks To

- The CDK Community cdk-dev.slack.com
- [Projen](https://github.com/projen/projen) project and the community around it
