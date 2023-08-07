---
id: slack
title: Slack
sidebar_position: 1
---

## Botkube Slack App Versions

There are two versions of the Botkube Slack App available:

### Botkube Cloud Slack App

The Botkube Cloud Slack App requires an account and subscription in the [Botkube Web App](https://app.botkube.io) and offers several advanced features:

- One-click installation into your Slack workspace
- Multi-cluster executor support with a single Slack App
- Manage Slack channels directly from the Botkube web app and ensure the Botkube bot is invited to the correct channels

The Botkube Cloud Slack App uses Botkube's cloud services to manage channels and route executor commands. Events and alerts are sent directly from your cluster to your Slack workspace for reliable, fast notifications.

You can try out the Botkube Cloud Slack App for free by creating an account in the [Botkube Web App](https://app.botkube.io) and starting a free trial. You can [refer](cloud_slack.md) here for more details.

### Botkube Socket Slack App

The Socket-mode app works with the open-source Botkube engine and does not require an account or subscription. The Botkube Socket-mode Slack App has the following caveats:

- Must be installed manually into your Slack workspace using the provided configuration
- Slack channels must be managed manually, and you need to ensure the Botkube bot is invited to any channel you want to use with Botkube
- When using executor plugins (e.g. kubectl, helm) in a multi-cluster environment, each cluster needs to have a dedicated Botkube Slack bot in order to route commands to the correct cluster.

You can [refer](custom/self_hosted.md) here for more details.
