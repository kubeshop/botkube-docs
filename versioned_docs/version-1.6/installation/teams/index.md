---
id: teams
title: "Microsoft Teams"
sidebar_position: 5
---

## Botkube Microsoft Teams App Versions

In order to connect with Microsoft Teams, Botkube requires a Microsoft Teams application. There are two versions of the Botkube Microsoft Teams App available.

### Botkube Cloud Microsoft Teams App

The Botkube Cloud Microsoft Teams App offers several advanced features:

- Simplified installation into your Microsoft Teams workspace
- Multi-cluster executor support with a single MS Teams App
- Manage Teams channels directly from the Botkube web app and ensure the Botkube bot is invited to the correct channels

The Botkube Cloud MS Teams App uses Botkube's cloud services to manage channels and route source events and executor commands. Currently, it requires a manual side-loading of the app, but we are working on getting it listed in the Microsoft Teams App Store.

You can directly try Botkube Cloud MS Teams App for free by creating an account in the [Botkube Web App](https://app.botkube.io). Follow the [Microsoft Teams for Botkube Cloud tutorial](cloud.mdx) to learn more.

### Self-hosted Botkube Microsoft Teams App

The self-hosted Microsoft Teams integration works with the open-source Botkube Agent. The Botkube self-hosted MS Teams App has the following caveats:

- It requires enabling notifications for each channel manually via the `@Botkube enable notifications` command. These settings are not persisted across Botkube Agent restarts.

- It doesn't support per-channel configuration including dedicated RBAC policy.
- It doesn't support multi-cluster configuration.
- It requires a public endpoint on the Kubernetes cluster.

Unlike Slack/Mattermost, MS Teams apps communicate with backends by sending POST requests to the public endpoints. So to establish communications between Teams app and respective backend, it needs to be reachable from the outside world. This is not a problem for Botkube Cloud MS Teams App as it uses Botkube's cloud services to manage channels and route source and executor events.

Follow the [instruction](self-hosted.md) for more details.
