var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// index.badge.ts
__export(exports, {
  handler: () => handler
});
var AWS = __toModule(require("aws-sdk"));
var codebuild = new AWS.CodeBuild();
async function handler(event) {
  var _a, _b, _c, _d;
  console.debug(`event: ${JSON.stringify(event)}`);
  const projectName = ((_a = event.queryStringParameters) == null ? void 0 : _a.projectName) || process.env.DEFAULT_PROJECT_NAME;
  const onlyUrl = (_b = event.queryStringParameters) == null ? void 0 : _b.url;
  if (!projectName || projectName === "") {
    throw "projectName in query parameter is not existing or empty!";
  }
  const fs = require("fs");
  let builds;
  try {
    builds = await codebuild.listBuildsForProject({
      projectName: projectName || ""
    }).promise();
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      },
      body: fs.readFileSync("./badges/not_found.svg").toString("base64"),
      isBase64Encoded: true
    };
  }
  console.debug(`lastBuildStatus: ${JSON.stringify(builds)}`);
  const lastBuildId = ((_c = builds.ids) == null ? void 0 : _c[0]) || "";
  const region = process.env.AWS_REGION;
  const account = process.env.ACCOUNT;
  if (onlyUrl === "true") {
    return {
      statusCode: 301,
      headers: {
        Location: `https://${region}.console.aws.amazon.com/codesuite/codebuild/${account}/projects/${projectName}/build/${lastBuildId}`
      }
    };
  }
  const lastBuild = await codebuild.batchGetBuilds({
    ids: [lastBuildId]
  }).promise();
  console.debug(`lastBuild: ${JSON.stringify(lastBuild)}`);
  const lastBuildStatus = (_d = lastBuild.builds) == null ? void 0 : _d[0].buildStatus;
  console.debug(`lastBuildStatus: ${lastBuildStatus}`);
  let imagePath = "./badges/failed.svg";
  switch (lastBuildStatus) {
    case "SUCCEEDED": {
      imagePath = "./badges/succeeded.svg";
      break;
    }
    case "FAILED": {
      imagePath = "./badges/failed.svg";
      break;
    }
    case "IN_PROGRESS": {
      imagePath = "./badges/in_progress.svg";
      break;
    }
    case "STOPPED": {
      imagePath = "./badges/stopped.svg";
      break;
    }
    case "FAULT": {
      imagePath = "./badges/failed.svg";
      break;
    }
    case "TIMED_OUT": {
      imagePath = "./badges/failed.svg";
      break;
    }
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/svg+xml"
    },
    body: fs.readFileSync(imagePath).toString("base64"),
    isBase64Encoded: true
  };
}
