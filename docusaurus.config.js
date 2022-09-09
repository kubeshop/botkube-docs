// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { createRedirects } = require("./redirects");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BotKube",
  tagline: "Messaging bot for monitoring and debugging Kubernetes clusters",
  url: "https://botkube.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "images/favicon.png",
  organizationName: "kubeshop",
  projectName: "botkube",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/kubeshop/botkube-docs/edit/main/",
          versions: {
            current: {
              label: `Unreleased 🚧`,
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        gtag: {
          trackingID: process.env.GOOGLE_TAG_MANAGER_TRACKING_ID || "gtm-dev",
        },
      }),
    ],
  ],

  scripts: [
    {
      src: "https://kit.fontawesome.com/00670398ef.js",
      async: false,
    },
  ],

  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 2000,
        min: 500,
        steps: 4,
        disableInDev: false,
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects,
      },
    ],
    path.resolve(__dirname, "src", "plugins", "contributors"),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "images/botkube-title-social.png",
      metadata: [
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:site",
          content: "@Botkube_io",
        },
        {
          property: "twitter:creator",
          content: "@Botkube_io",
        },
      ],
      navbar: {
        title: "BotKube",
        logo: {
          alt: "BotKube Logo",
          src: "images/botkube.png",
        },
        items: [
          {
            type: "doc",
            docId: "installation/installation",
            position: "left",
            label: "Documentation",
          },
          {
            type: "doc",
            docId: "contribute/contribute",
            docsPluginId: "community",
            position: "left",
            label: "Community",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://github.com/kubeshop/botkube",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://join.botkube.io",
            label: "Slack",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Contribute",
                to: "/community/contribute",
              },
              {
                label: "GitHub",
                to: "https://github.com/kubeshop/botkube",
              },
              {
                label: "Community Slack",
                to: "https://join.botkube.io",
              },
              {
                label: "Support",
                to: "/support",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "License",
                to: "/license",
              },
              {
                label: "Privacy & Legal",
                to: "/privacy",
              },
            ],
          },
          {
            title: "Learn",
            items: [
              {
                label: "Installation",
                to: "/docs/installation",
              },
              {
                label: "Examples",
                to: "/docs/examples",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Twitter",
                to: "https://twitter.com/thekubeshop",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Kubeshop, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
