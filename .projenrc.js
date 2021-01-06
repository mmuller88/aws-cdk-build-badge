const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.80.0',
  cdkVersionPinning: true,
  name: 'aws-cdk-build-badge',
  repositoryUrl: 'https://github.com/mmuller88/aws-cdk-build-badge',
  cdkDependencies: [
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/core',
  ],
  keywords: [
    'cdk',
    'aws',
    'codebuild',
    'badge',
  ],
  python: {
    distName: 'aws-cdk-build-badge',
    module: 'aws_cdk_build_badge',
  },
});

project.synth();
