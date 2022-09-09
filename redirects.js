// We need to maintain custom redirects as it's not handled automatically by Docusaurus: https://github.com/facebook/docusaurus/issues/3407
// NOTE: Redirects don't work in development mode. Use `npm run build` and `npm run serve` to see them in action.
//
// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
const fs = require("fs");
const subPathsToRedirect = ["/docs", "/community"];
let versions;

/**
 * @return {string[]}
 */
function getVersions() {
  if (!Array.isArray(versions)) {
    try {
      versions = JSON.parse(String(fs.readFileSync("./versions.json")));
      versions.push("next");
    } catch {
      versions = ["next"];
    }
  }

  return versions;
}

/**
 * @param {string} path
 * @return boolean
 */
function haVersionInPath(path) {
  const versions = getVersions();

  return versions.some(ver => path.includes(ver));
}

/**
 * @param {string} existingPath
 * @return {string[]|undefined}
 */
function createRedirects(existingPath) {
  if (!haVersionInPath(existingPath)) {
    for (const subPath of subPathsToRedirect) {
      if (existingPath.includes(subPath)) {
        return [existingPath.replace(subPath, "")];
      }
    }
  }

  return undefined;
}

module.exports = {
  createRedirects,
};
