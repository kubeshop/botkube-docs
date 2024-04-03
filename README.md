<p align="center">
  <img src="./static/images/botkube-title.png" alt="Botkube Logo Light" />
</p>

<p align="center">
  Documentation website source files
</p>

<p align="center">
  <a href="https://github.com/kubeshop/botkube-docs/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kubeshop/botkube-docs" alt="License"/>
  </a>
  <a href="https://join.botkube.io/">
    <img src="https://badgen.net/badge/slack/Botkube?icon=slack" alt="Slack" />
  </a>
  <a href="https://github.com/kubeshop/botkube-docs/actions/workflows/dead-link-checker.yaml">
    <img src="https://github.com/kubeshop/botkube-docs/actions/workflows/dead-link-checker.yaml/badge.svg?branch=main" alt="CI Build" />
  </a>
</p>

## Overview

This repository contains source code of the Botkube documentation website, accessible under the [docs.botkube.io](https://docs.botkube.io) address. The documentation source files reside under the [**content**](./docs) directory.

### Tools

This project uses [Volta](https://github.com/volta-cli/volta) to manage JS tools. Volta automatically downloads and installs the right Node.js version when you run any of the `node` or `npm` commands.

It is recommended to install it before starting development, to ensure the right Node.js version is used.

Also, we use the following tools and services:

- [Cloudflare](https://cloudflare.com) - Continuous deployment and hosting of the documentation website
- [Docusaurus](https://docusaurus.io/) - Used to build this docs website

## Contributing

You can contribute to documentation by following instructions described in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
