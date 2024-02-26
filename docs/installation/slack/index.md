---
id: slack
title: Slack
sidebar_position: 1
---

## Botkube Slack App Versions

In order to connect with Slack, Botkube requires a Slack application. There are two versions of the Botkube Slack App available:

### Botkube Cloud App for Slack

The Botkube Cloud App for Slack offers several advanced features:

- One-click installation into your Slack workspace
- Multi-cluster executor support with a single Slack App
- Manage Slack channels directly from the Botkube web app and ensure the Botkube bot is invited to the correct channels

The Botkube Cloud App for Slack uses Botkube's cloud services to manage channels and route executor commands. Events and alerts are sent directly from your cluster to your Slack workspace for reliable, fast notifications.

You can directly try Botkube Cloud App for Slack for free by creating an account in the [Botkube Web App](https://app.botkube.io). Follow the [Cloud Slack app tutorial](cloud-slack.mdx) to learn more.

### Botkube Socket Slack App

The Socket-mode app works with the open-source Botkube Agent. The Botkube Socket-mode Slack App has the following caveats:

- Must be installed manually into your Slack workspace using the provided configuration
- Slack channels must be managed manually, and you need to ensure the Botkube bot is invited to any channel you want to use with Botkube
- When using executor plugins (e.g. kubectl) in a multi-cluster environment, each cluster needs to have a dedicated Botkube Slack bot in order to route commands to the correct cluster.

Follow the [instruction](socket-slack.md) for more details.
