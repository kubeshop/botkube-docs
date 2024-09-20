---
id: prometheus
title: Prometheus
sidebar_position: 5
---

:::info
**This plugin is hosted by the [Botkube Cloud](https://app.botkube.io) plugin repository and requires active Botkube Cloud account.**
:::

The Botkube Prometheus source plugin allows you to fetch alerts from AlertManager of Prometheus deployment and notify in configured platforms.

## Get started

### Enable the plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../installation/slack/index.md) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Prometheus plugin.
6. Provide the Prometheus endpoint according to the [Configuration](#configuration) section.
7. Click **Save** button.

## Usage

Once it is enabled, Botkube Prometheus plugin will consume Prometheus alerts and send them to configured platforms as shown below.

![Prometheus Alerts](assets/prometheus-alerts.png)

## Configuration

This plugin supports the following configuration:

```yaml
# Prometheus endpoint without api version and resource.
url: "http://localhost:9090"
# If set as true, Prometheus source plugin will not send alerts that is created before plugin start time.
ignoreOldAlerts: true
# Only the alerts that have state provided in this config will be sent as notification. https://pkg.go.dev/github.com/prometheus/prometheus/rules#AlertState
alertStates: ["firing", "pending", "inactive"]
# Logging configuration
log:
  # Log level
  level: info
```

## Merging strategy

For all collected `prometheus` sources bindings, configuration properties are overridden based on the order of the binding list for a given channel. The priority is given to the last binding specified on the list. Empty properties are omitted.
