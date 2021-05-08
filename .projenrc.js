const { AwsCdkConstructLibrary } = require('projen');

const cdkVersion = process.env.CDK_VERSION || '1.97.0';

const deps = [
  '@types/aws-lambda',
  'aws-lambda',
  'aws-sdk',
  'esbuild@^0',
  `@aws-cdk/assert@${cdkVersion}`,
];

const cdkDeps = [
  `@aws-cdk/aws-apigateway@${cdkVersion}`,
  `@aws-cdk/aws-lambda@${cdkVersion}`,
  `@aws-cdk/core@${cdkVersion}`,
  `@aws-cdk/aws-iam@${cdkVersion}`,
  `@aws-cdk/aws-lambda-nodejs@${cdkVersion}`,
];

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  name: 'aws-cdk-build-badge',
  repositoryUrl: 'https://github.com/mmuller88/aws-cdk-build-badge',
  defaultReleaseBranch: 'master',
  codeCov: true,
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  devDeps: [...deps, ...cdkDeps],
  deps: deps,
  peerDeps: cdkDeps,
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
