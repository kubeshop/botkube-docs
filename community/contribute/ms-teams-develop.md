---
id: ms-teams-develop
title: "MS Teams Bot development"
sidebar_position: 2
---

Microsoft Teams is an entirely cloud-based product. Because of this, BotKube must be publicly accessible via an HTTPS endpoint.

For a local Kubernetes cluster, you can use the tunneling software, for example [`ngrok`](https://ngrok.com/). It creates an externally addressable URL for a port you open locally on your machine.

## Steps

1. Install [`ngrok`](https://ngrok.com/download).
2. Start `ngrok`:
   ```bash
   ngrok http 3978
   ```
3. Install BotKube according to the [MS Teams tutorial](/docs/installation/teams/), but apply the following changes:
   1. Ignore the [Prerequisites](/docs/installation/teams/#prerequisites) section and skip the Ingress controller installation.
   2. In the [B. Deploy BotKube controller](/docs/installation/teams/#b-deploy-botkube-controller) section, skip all parts related to the certificate and Ingress setup.
   3. In the [Add a Bot to the App](/docs/installation/teams/#add-a-bot-to-the-app) section, specify the base URL from step 2 for the **Messaging Endpoint** property. Use the following URL format: `{ngrok_url}/bots/teams/v1/messages`, for example, `https://177b-37-30-104-55.eu.ngrok.io/bots/teams/v1/messages`.

:::warning
If you stop and restart `ngrok`, the URL changes. In such a case, you need to update the **Messaging Endpoint** property and reinstall the bot into your Team.
:::

4. After BotKube installation, forward the local port to the Kubernetes BotKube Service:
   ```bash
   kubectl port-forward -n botkube svc/botkube 3978
   ```
