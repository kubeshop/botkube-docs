---
id: keptn
title: Keptn
sidebar_position: 9
---

:::info
**This plugin is hosted by the [Botkube Cloud](https://app.botkube.io) plugin repository and requires active Botkube Cloud account.**
:::

The Botkube Keptn source plugin allows you to consume events from Keptn deployment and notify in configured platforms.

## Get started

### Enable the plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../installation/index.mdx) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Keptn plugin.
6. Click **Save** button.

## Usage

Once it is enabled, Botkube Keptn plugin will consume Keptn events and send them to configured platforms as shown below.

![Keptn Events](assets/keptn-events.png)

## Configuration

This plugin supports the following configuration:

```yaml
# Keptn API Gateway URL.
url: "http://api-gateway-nginx.keptn.svc.cluster.local/api"
# Keptn API Token to access events through API Gateway.
token: ""
# Optional Keptn project.
project: ""
# Optional Keptn Service name under the project.
service: ""
# Logging configuration
log:
  # Log level
  level: info
```
