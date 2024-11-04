---
id: webhook
title: "Outgoing webhook"
sidebar_position: 7
---

You can use Botkube to trigger your Webhook and send events.

## Install Botkube in Kubernetes cluster

Botkube can be integrated with external apps via Webhooks. A webhook is essentially a POST request sent to a callback URL. So you can configure Botkube to send events on specified URL.

To deploy Botkube agent in your cluster, run:

```bash
export CLUSTER_NAME={cluster_name}
export WEBHOOK_URL={url}

botkube install --version v1.13.0 \
--set communications.default-group.webhook.enabled=true \
--set communications.default-group.webhook.url=${WEBHOOK_URL} \
--set settings.clusterName=${CLUSTER_NAME}
```

where:

- **WEBHOOK_URL** is an outgoing webhook URL to which Botkube will POST the events,
- **CLUSTER_NAME** is the cluster name set in the incoming messages.

Configuration syntax is explained [here](../../self-hosted-configuration).
All possible installation parameters are documented [here](../../self-hosted-configuration/helm-chart-parameters).

## Remove Botkube from Kubernetes cluster

Execute the following command to completely remove Botkube and related resources from your cluster:

```bash
botkube uninstall
```
