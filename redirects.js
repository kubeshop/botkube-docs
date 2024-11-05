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
function hasVersionInPath(path) {
  const versions = getVersions();

  return versions.some(ver => path.includes(ver));
}

/**
 * @param {string} existingPath
 * @return {string[]|undefined}
 */
function createRedirects(existingPath) {
  if (!hasVersionInPath(existingPath)) {
    for (const subPath of subPathsToRedirect) {
      if (existingPath.includes(subPath)) {
        return [existingPath.replace(subPath, "")];
      }
    }
  }

  return undefined;
}

/**
 * @return {{to: string, from: string}[]}
 */
function customRedirections() {
  return [
    // old links
    { from: "/docs", to: "/" },
    { from: "/installation", to: "/" },
    { from: "/community", to: "/community/contribute/" },
    { from: "/filters", to: "/plugins/kubernetes" },

    // v1.10->v1.11 links
    { from: "/configuration/", to: "/self-hosted-configuration" },
    { from: "/configuration/action", to: "/features/actions" },
    { from: "/configuration/alias", to: "/features/executing-commands" },
    { from: "/configuration/communication/", to: "/self-hosted-configuration/communication" },
    { from: "/configuration/communication/vault-csi", to: "/self-hosted-configuration/communication/vault-csi" },
    { from: "/configuration/executor/", to: "/plugins" },
    { from: "/configuration/executor/doctor", to: "/plugins/ai-assistant" },
    { from: "/configuration/executor/exec", to: "/plugins/exec" },
    { from: "/configuration/executor/flux", to: "/plugins/flux" },
    { from: "/configuration/executor/helm", to: "/plugins/helm" },
    { from: "/configuration/executor/kubectl", to: "/plugins/kubectl" },
    { from: "/configuration/general", to: "/self-hosted-configuration/general" },
    { from: "/configuration/helm-chart-parameters", to: "/self-hosted-configuration/helm-chart-parameters" },
    { from: "/configuration/rbac", to: "/features/rbac" },
    { from: "/configuration/source/", to: "/plugins" },
    { from: "/configuration/source/argocd", to: "/plugins/argocd" },
    { from: "/configuration/source/github-events", to: "/plugins/github-events" },
    { from: "/configuration/source/keptn", to: "/plugins/keptn" },
    { from: "/configuration/source/kubernetes", to: "/plugins/kubernetes" },
    { from: "/configuration/source/prometheus", to: "/plugins/prometheus" },
    { from: "/usage/", to: "/features/executing-commands" },
    { from: "/usage/automated-actions", to: "/features/actions" },
    { from: "/usage/event-notifications", to: "/features/event-notifications" },
    { from: "/usage/executor/", to: "/plugins" },
    { from: "/usage/executor/doctor", to: "/plugins/ai-assistant" },
    { from: "/usage/executor/exec", to: "/plugins/exec" },
    { from: "/usage/executor/flux", to: "/plugins/flux" },
    { from: "/usage/executor/helm", to: "/plugins/helm" },
    { from: "/usage/executor/kubectl", to: "/plugins/kubectl" },
    { from: "/usage/interactive-output-filtering", to: "/features/executing-commands" },
    { from: "/usage/source/", to: "/plugins" },
    { from: "/usage/source/argocd", to: "/plugins/argocd" },
    { from: "/usage/source/keptn", to: "/plugins/keptn" },
    { from: "/usage/source/kubernetes", to: "/plugins/kubernetes" },
    { from: "/usage/source/prometheus", to: "/plugins/prometheus" },
    { from: "/plugin/", to: "/plugins/development/" },
    { from: "/plugin/custom-executor", to: "/plugins/development/custom-executor" },
    { from: "/plugin/custom-source", to: "/plugins/development/custom-source" },
    { from: "/plugin/debugging", to: "/plugins/development/debugging" },
    { from: "/plugin/dependencies", to: "/plugins/development/dependencies" },
    { from: "/plugin/interactive-messages", to: "/plugins/development/interactive-messages" },
    { from: "/plugin/local-testing", to: "/plugins/development/local-testing" },
    { from: "/plugin/quick-start", to: "/plugins/development/quick-start" },
    { from: "/plugin/repo", to: "/plugins/development/repo" },
    { from: "/plugin/troubleshooting.md", to: "/plugins/development/troubleshooting" },
    { from: "/plugin/using-kubeconfig", to: "/plugins/development/using-kubeconfig" },
    { from: "/operation/diagnostics", to: "/troubleshooting/diagnostics" },
    { from: "/operation/common-problems", to: "/troubleshooting/common-problems" },
    { from: "/privacy", to: "https://botkube.io/privacy-policy" },
  ];
}

module.exports = {
  redirects: customRedirections(),
  createRedirects,
};
