<p align="center">
  <img src="./static/images/botkube-title.jpg" alt="BotKube Logo Light" width="90%" />
</p>

<p align="center">
  BotKube is a messaging bot for monitoring and debugging Kubernetes clusters.
</p>


<p align="center">
  <a href="https://github.com/kubeshop/botkube/releases/latest">
    <img src="https://img.shields.io/github/v/release/kubeshop/botkube" alt="Latest Release" />
  </a>
  <a href="https://github.com/kubeshop/botkube/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kubeshop/botkube" alt="License"/>
  </a>
  <a href="https://join.botkube.io/">
    <img src="https://badgen.net/badge/slack/BotKube?icon=slack" alt="Slack" />
  </a>
  <a href="https://github.com/kubeshop/botkube/actions?query=workflow%3ACI+branch%3Amain">
    <img src="https://github.com/kubeshop/botkube/workflows/CI/badge.svg?branch=main" alt="CI Build" />
  </a>
  <a href="https://goreportcard.com/report/github.com/kubeshop/botkube">
    <img src="https://goreportcard.com/badge/github.com/kubeshop/botkube" alt="Go Report" />
  </a>
  <a href="https://godoc.org/github.com/kubeshop/botkube">
    <img src="https://godoc.org/github.com/kubeshop/botkube?status.svg" alt="Go Docs" />
  </a>
</p>

## Overview

BotKube helps you monitor your Kubernetes cluster, debug critical deployments and gives recommendations for standard practices by running checks on the Kubernetes resources. It integrates with multiple communication platforms, such as [Slack](https://slack.com), [Discord](https://discord.com/), or [Mattermost](https://mattermost.com).

You can also execute `kubectl` commands on K8s cluster via BotKube which helps debugging an application or cluster.

## Documentation

For full documentation, visit [botkube.io](https://botkube.io). The documentation sources reside on this repository under [**content**](./content) directory.

## Contributing

This website uses Hugo to generate static HTML pages.

- [`content/`](./content/ "View the directory") directory contains
  documentation files
- [`config.toml`](./config.toml "View file") is the Hugo configuration

You can contribute to documentation by following instructions described in [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

This project is currently licensed under the [MIT License](LICENSE).
