const { AwsCdkConstructLibrary } = require('projen');

const cdkVersion = '1.106.1';

const deps = [
  '@types/aws-lambda',
  'aws-lambda',
  'aws-sdk',
  'esbuild@^0',
  `@aws-cdk/assert@${cdkVersion}`,
];

const cdkDependencies = [
  '@aws-cdk/aws-apigateway',
  '@aws-cdk/aws-lambda',
  '@aws-cdk/core',
  '@aws-cdk/aws-iam',
  '@aws-cdk/aws-lambda-nodejs',
];

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  name: 'aws-cdk-build-badge',
  repositoryUrl: 'https://github.com/mmuller88/aws-cdk-build-badge',
  defaultReleaseBranch: 'master',
  codeCov: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  cdkVersion,
  cdkVersionPinning: true,
  cdkDependencies,
  cdkDependenciesAsDeps: cdkDependencies,
  deps,
  // peerDeps: deps,
  bundledDeps: deps,
  keywords: ['cdk', 'aws', 'codebuild', 'badge'],
  python: {
    distName: 'aws-cdk-build-badge',
    module: 'aws_cdk_build_badge',
  },
  dotnet: {
    dotNetNamespace: 'com.github.mmuller88',
    packageId: 'com.github.mmuller88.awsCdkBuildBadge',
  },
  keywords: ['cdk', 'aws', 'badge'],
});

project.setScript('deploy', 'cdk deploy');
project.setScript('destroy', 'cdk destroy');

project.synth();
