---
id: prometheus
title: Prometheus
sidebar_position: 3
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

The Botkube Prometheus source plugin allows you to fetch alerts from AlertManager of Prometheus deployment and notify in configured platforms.

The Prometheus plugin is hosted by the Botkube Cloud plugin repository and requires active Botkube Cloud account.

## Enabling plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../../installation/index.mdx) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Prometheus plugin.
6. Click **Save** button.

## Configuration Syntax

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
