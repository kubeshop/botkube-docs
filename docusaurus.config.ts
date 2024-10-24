import type { Config } from "@docusaurus/types";
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const { createRedirects, redirects } = require("./redirects");

/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  title: "Botkube",
  tagline:
    "AI-powered expertise to troubleshoot, optimize pipelines, and manage infrastructure seamlessly across multiple tools—all from one place.",
  url: "https://docs.botkube.io/",
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
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/kubeshop/botkube-docs/edit/main/",
          versions: {
            current: {
              label: `Unreleased 🚧`,
            },
          },
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        gtag: {
          trackingID: process.env.GOOGLE_TAG_TRACKING_ID || "G-tracking-dev",
        },
        googleTagManager: {
          containerId: process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID || "GTM-container-dev",
        },
      },
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
        id: "chatPlatform",
        path: "chat-platform-docs",
        routeBasePath: "chat-platform",
        editUrl: "https://github.com/kubeshop/botkube-docs/edit/main/",
        sidebarPath: require.resolve("./chatPlatform_sidebars.js"),
        versions: {
          current: {
            label: `Unreleased 🚧`,
          },
        },
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
        redirects,
      },
    ],
    path.resolve(__dirname, "src", "plugins", "contributors"),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
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
        title: "Botkube",
        logo: {
          alt: "Botkube Logo",
          src: "images/botkube-black.svg",
          srcDark: "images/botkube-white.svg",
        },
        items: [
          {
            type: "doc",
            docId: "overview",
            position: "left",
            label: "Fuse CLI",
          },
          {
            type: "doc",
            docId: "overview",
            docsPluginId: "chatPlatform",
            position: "left",
            label: "Chat Platform",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                type: "html",
                value: '<hr class="dropdown-separator">',
              },
              {
                to: "/fuse-cli-versions",
                label: "All versions",
              },
            ],
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "chatPlatform",
            dropdownItemsAfter: [
              {
                type: "html",
                value: '<hr class="dropdown-separator">',
              },
              {
                to: "/chat-platform-versions",
                label: "All versions",
              },
            ],
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
            title: "Legal",
            items: [
              {
                label: "License",
                to: "/license",
              },
              {
                label: "Privacy & Legal",
                to: "https://botkube.io/privacy-policy",
              },
              {
                label: "Telemetry",
                to: "/telemetry",
              },
            ],
          },
          {
            title: "Documentation",
            items: [
              {
                label: "Fuse CLI Overview",
                to: "/overview",
              },
              {
                label: "Chat Platform Overview",
                to: "/chat-platform/overview",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Twitter / X",
                to: "https://twitter.com/Botkube_io",
              },
              {
                label: "LinkedIn",
                to: "https://www.linkedin.com/showcase/botkube/posts",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Botkube GitHub",
                to: "https://github.com/kubeshop/botkube",
              },
              {
                label: "Fuse CLI GitHub",
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
      algolia: {
        appId: "RGVPQ6NK42",
        apiKey: "d7514a8ad9b1aebb64c54172856ecb44",
        indexName: "botkube",
      },
      announcementBar: {
        id: "try_botkube",
        content:
          ' 🚀 <strong>Announcing Fuse - AI-powered assistant for streamlined platform engineering.</strong> <a target="_blank" rel="noopener noreferrer" href="https://botkube.io/fuse">Get started for free</a>',
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: false,
      },
    },
};

module.exports = config;
