export const listBuildsForProjectResponse = jest.fn().mockReturnValue(Promise.resolve(true));
export const batchGetBuildsResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const listBuildsForProjectFn = jest.fn().mockImplementation(() => ({ promise: listBuildsForProjectResponse }));
const batchGetBuildsFn = jest.fn().mockImplementation(() => ({ promise: batchGetBuildsResponse }));

export class CodeBuild {

  public listBuildsForProject: jest.Mock<any, any>;
  public batchGetBuilds: jest.Mock<any, any>;

  constructor() {
    this.listBuildsForProject = listBuildsForProjectFn;
    this.batchGetBuilds = batchGetBuildsFn;
  }

  // listBuildsForProject = listBuildsForProjectFn;
}
