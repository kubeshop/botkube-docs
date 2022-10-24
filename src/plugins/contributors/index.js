// @ts-check
const fetch = require("node-fetch");

/** @return {import('@docusaurus/types').Plugin} */
module.exports = function () {
  return {
    name: "docusaurus-plugin-contributors",
    async loadContent() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await fetch("https://api.github.com/repos/kubeshop/botkube/contributors?per_page=100");

      return await response.json();
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData({
        contributors: content,
      });
    },
  };
};
