const { AwsCdkConstructLibrary } = require('projen');

const deps = [
  '@types/aws-lambda',
  'aws-lambda',
  'aws-sdk',
  '@types/gm',
  'gm',
  'gm-base64',
  '@aws-cdk/aws-s3-deployment',
];

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.83.0',
  cdkVersionPinning: true,
  name: 'aws-cdk-build-badge',
  repositoryUrl: 'https://github.com/mmuller88/aws-cdk-build-badge',
  codeCov: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  cdkDependencies: [
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda-nodejs',
  ],
  devDeps: deps,
  deps: deps,
  bundledDeps: deps,
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

project.setScript('deploy', 'cdk deploy');
project.setScript('destroy', 'cdk destroy');

const common_exclude = ['cdk.out'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
