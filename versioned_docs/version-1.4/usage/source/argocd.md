---
id: argocd
title: ArgoCD
sidebar_position: 5
---

Botkube allows you to consume ArgoCD events on your Kubernetes cluster. By default, `argocd` plugin is disabled. See the [**Enabling source**](../../configuration/source/argocd#enabling-source) section from the `argocd` configuration documentation.

Once it is enabled, the ArgoCD plugin will configure ArgoCD notifications so that Botkube receives them on its incoming webhook. Then, Botkube will send them to configured platforms as shown below.

![ArgoCD events](./assets/argocd-events.png)

## Interactive events

For platforms that support interactivity, such as Socket Slack and Cloud Slack, Botkube sends interactive messages for ArgoCD events, that allow you to perform actions on the event. By default, the following actions are supported:

- Run commands on the Application:
  - `get`
  - `describe`
- View the Application in the ArgoCD UI
- Open the source repository in the browser

Interactive buttons and commands can be configured. See the [Configuration](../../configuration/source/argocd.md) document for more details.
