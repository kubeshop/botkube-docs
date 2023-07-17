---
id: prometheus
title: Prometheus
sidebar_position: 3
---

The Botkube Prometheus source plugin allows you to fetch alerts from AlertManager of Prometheus deployment and notify in configured platforms.

The Prometheus plugin is hosted by the official Botkube plugin repository. To enable the Prometheus plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.2.0/plugins-index.yaml
```

## Enabling plugin

To enable Prometheus plugin, add `--set 'sources.prometheus.botkube/prometheus.enabled=true'` to a given Botkube [`install` command](../../cli/commands/botkube_install.md).

## Syntax

```yaml
# Map of sources. The `sources` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: sources.{alias}
sources:
  "prom":
    botkube/prometheus: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        url: "http://localhost:9090" # Prometheus host to fetch alerts via Prometheus HTTP API
        alertStates: ["firing", "pending", "inactive"] # Provided alert states will overwrite default values. For example, Prometheus plugin will notify for only `firing` alerts if `alertStates` is `["firing"]`.
        ignoreOldAlerts: true # If set to true, only the alerts that active since Botkube deployment start time. Otherwise, plugin will fetch all the alerts available in AlertManager on Botkube start.
```

## Merging strategy

For all collected `prometheus` sources bindings, configuration properties are overridden based on the order of the binding list. The priority is given to the last binding specified on the list. Empty properties are omitted.

### Example

Consider such configuration:

```yaml
communications:
  "default-group":
    slack:
      channels:
        "default":
          name: "random"
          bindings:
            sources:
              - prometheus-one
              - prometheus-two
              - prometheus-three

sources:
  "prometheus-one":
    botkube/prometheus:
      enabled: true
      config:
        url: "http://localhost:9090"
        ignoreOldAlerts: false
        alertStates: ["firing"]
  "prometheus-two":
    botkube/prometheus:
      enabled: true
      config:
        ignoreOldAlerts: true
  "prometheus-three":
    botkube/prometheus:
      enabled: false
      config:
        url: "http://localhost:9091"
        ignoreOldAlerts: true
        alertStates: ["inactive"]
```

We can see that:

- The `ignoreOldAlerts` is set to `true` as it's overridden by the `prometheus-two` binding - the **last one** which is both enabled and sets the `ignoreOldAlerts` property.
- The `url` and `alertStates` are set to values specified by the `prometheus-one` configuration as the `prometheus-two` don't specify them.
- The `prometheus-three` binding is disabled (`botkube/prometheus.enabled` is set to `false`), so it's not taken into account.
