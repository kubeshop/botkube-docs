---
id: argocd
title: ArgoCD
sidebar_position: 5
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

Botkube allows you to consume ArgoCD events on your Kubernetes cluster. By default, `argocd` plugin is disabled. See the [**Enabling source**](../../configuration/source/argocd#enabling-plugin) section from the `argocd` configuration documentation.

Once it is enabled, the ArgoCD plugin will configure ArgoCD notifications so that Botkube receives them on its incoming webhook. Then, Botkube will send them to configured platforms as shown below.

![ArgoCD events](./assets/argocd-events.png)

## Interactive events

For platforms that support interactivity, such as Slack and Microsoft Teams, Botkube sends interactive messages for ArgoCD events, that allow you to perform actions on the event. By default, the following actions are supported:

- Run commands on the Application:
  - `get`
  - `describe`
- View the Application in the ArgoCD UI
- Open the source repository in the browser

Interactive buttons and commands can be configured. See the [Configuration](../../configuration/source/argocd.md) document for more details.
