---
id: cli
title: "CLI"
sidebar_position: 6
---

# Getting Started

Botkube includes a command-line interface (CLI) that you can use to interact with Botkube and Botkube Cloud from your terminal, or from a script.

## Installation

The CLI is released as a single binary. You can download the latest version from the [releases page](https://github.com/kubeshop/botkube/releases)


```bash
curl -Lo botkube https://github.com/kubeshop/botkube/releases/download/v1.1.1/botkube_linux_amd64
chmod +x botkube
```

## First use

To get started, authenticate with Botkube cloud by running:

```bash
# interactive login flow with Botkube Cloud
botkube login
```

## Autocompletion

To learn how to enable autocompletion for your shell, run:

```bash
botkube completion --help
```
