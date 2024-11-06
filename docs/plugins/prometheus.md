---
id: prometheus
title: Prometheus
sidebar_position: 5
---

The Botkube Prometheus source plugin allows you to fetch alerts from AlertManager of Prometheus deployment and notify in configured platforms.

## Get started

### Enable the plugin

Enable the plugin by adding a new [source](../self-hosted-configuration/source.md) plugin to the Botkube configuration:

```yaml
sources:
  # ...
  prometheus:
    botkubeExtraPlugins/prometheus:
      displayName: "Prometheus"
      enabled: true
      config:
        url:
          "http://localhost:9090" # Prometheus endpoint without api version and resource.
          # See the Configuration section for full config properties.

plugins:
  # ...
  repositories:
    botkubeExtraPlugins:
      url: https://github.com/kubeshop/botkube-plugins/releases/download/v1.14.0/plugins-index.yaml
```

Then, use the plugin in your [communication platform](../self-hosted-configuration/communication/index.md).

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
