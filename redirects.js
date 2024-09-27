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
    { from: "/community", to: "/chat-platform/community/contribute/" },
    { from: "/filters", to: "/chat-platform/plugins/kubernetes" },

    // v1.10->v1.11 links
    { from: "/configuration/", to: "/chat-platform/self-hosted-configuration" },
    { from: "/configuration/action", to: "/chat-platform/features/actions" },
    { from: "/configuration/alias", to: "/chat-platform/features/executing-commands" },
    { from: "/configuration/communication/", to: "/chat-platform/self-hosted-configuration/communication" },
    {
      from: "/configuration/communication/vault-csi",
      to: "/chat-platform/self-hosted-configuration/communication/vault-csi",
    },
    { from: "/configuration/executor/", to: "/chat-platform/plugins" },
    { from: "/configuration/executor/doctor", to: "/chat-platform/plugins/ai-assistant" },
    { from: "/configuration/executor/exec", to: "/chat-platform/plugins/exec" },
    { from: "/configuration/executor/flux", to: "/chat-platform/plugins/flux" },
    { from: "/configuration/executor/helm", to: "/chat-platform/plugins/helm" },
    { from: "/configuration/executor/kubectl", to: "/chat-platform/plugins/kubectl" },
    { from: "/configuration/general", to: "/chat-platform/self-hosted-configuration/general" },
    {
      from: "/configuration/helm-chart-parameters",
      to: "/chat-platform/self-hosted-configuration/helm-chart-parameters",
    },
    { from: "/configuration/rbac", to: "/chat-platform/features/rbac" },
    { from: "/configuration/source/", to: "/chat-platform/plugins" },
    { from: "/configuration/source/argocd", to: "/chat-platform/plugins/argocd" },
    { from: "/configuration/source/github-events", to: "/chat-platform/plugins/github-events" },
    { from: "/configuration/source/keptn", to: "/chat-platform/plugins/keptn" },
    { from: "/configuration/source/kubernetes", to: "/chat-platform/plugins/kubernetes" },
    { from: "/configuration/source/prometheus", to: "/chat-platform/plugins/prometheus" },
    { from: "/usage/automated-actions", to: "/chat-platform/features/actions" },
    { from: "/usage/event-notifications", to: "/chat-platform/features/event-notifications" },
    { from: "/usage/executor/", to: "/chat-platform/plugins" },
    { from: "/usage/executor/doctor", to: "/chat-platform/plugins/ai-assistant" },
    { from: "/usage/executor/exec", to: "/chat-platform/plugins/exec" },
    { from: "/usage/executor/flux", to: "/chat-platform/plugins/flux" },
    { from: "/usage/executor/helm", to: "/chat-platform/plugins/helm" },
    { from: "/usage/executor/kubectl", to: "/chat-platform/plugins/kubectl" },
    { from: "/usage/interactive-output-filtering", to: "/chat-platform/features/executing-commands" },
    { from: "/usage/source/", to: "/chat-platform/plugins" },
    { from: "/usage/source/argocd", to: "/chat-platform/plugins/argocd" },
    { from: "/usage/source/keptn", to: "/chat-platform/plugins/keptn" },
    { from: "/usage/source/kubernetes", to: "/chat-platform/plugins/kubernetes" },
    { from: "/usage/source/prometheus", to: "/chat-platform/plugins/prometheus" },
    { from: "/plugin/", to: "/chat-platform/plugins/development/" },
    { from: "/plugin/custom-executor", to: "/chat-platform/plugins/development/custom-executor" },
    { from: "/plugin/custom-source", to: "/chat-platform/plugins/development/custom-source" },
    { from: "/plugin/debugging", to: "/chat-platform/plugins/development/debugging" },
    { from: "/plugin/dependencies", to: "/chat-platform/plugins/development/dependencies" },
    { from: "/plugin/interactive-messages", to: "/chat-platform/plugins/development/interactive-messages" },
    { from: "/plugin/local-testing", to: "/chat-platform/plugins/development/local-testing" },
    { from: "/plugin/quick-start", to: "/chat-platform/plugins/development/quick-start" },
    { from: "/plugin/repo", to: "/chat-platform/plugins/development/repo" },
    { from: "/plugin/troubleshooting.md", to: "/chat-platform/plugins/development/troubleshooting" },
    { from: "/plugin/using-kubeconfig", to: "/chat-platform/plugins/development/using-kubeconfig" },
    { from: "/operation/diagnostics", to: "/chat-platform/troubleshooting/diagnostics" },
    { from: "/operation/common-problems", to: "/chat-platform/troubleshooting/common-problems" },
    { from: "/privacy", to: "https://botkube.io/privacy-policy" },
  ];
}

module.exports = {
  redirects: customRedirections(),
  createRedirects,
};
