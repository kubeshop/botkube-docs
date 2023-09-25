---
id: source
title: Source
sidebar_position: 1
---

The source configuration allows you to define multiple source configurations that can be later referred in [communication](../communication) bindings. For example, take a look at such source definition:

```yaml
sources:
  "k8s-recommendation-alerts": # This is a source configuration name, which is referred in communication bindings.
    botkube/kubernetes:
      # ... trimmed ...

  "prometheus-firing-alerts": # This is a source configuration name, which is referred in communication bindings.
    botkube/prometheus:
      # ... trimmed ...
```

This can be later used by the communication platforms:

```yaml
communications:
  "default-group":
    slack:
      channels:
        "default":
          bindings:
            sources: # The order is important for merging strategy.
              - k8s-recommendation-events # The source configuration name
              - prometheus-firing-events # The source configuration name
          # ... trimmed ...
```

To use the Botkube source plugins, first you need to define the plugins repository under the `plugins` property:

```yaml
plugins:
  repositories:
    repo-name:
      url: https://example.com/plugins-index.yaml
```

Next, you can configure source from a given repository:

```yaml
sources:
  "plugins":
    repo-name/source-name@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true
      config: {}
```

For all source configuration properties, see the [**syntax**](#syntax) section.


#### Restart Policy and Health Check Interval

This section of the configuration allows you to configure the restart policy for the Botkube source plugins. The restart policy is used when the source plugin fails to start. The default restart policy is `DeactivatePlugin`, which means that the plugin is deactivated after a given number of restarts. The restart policy can be configured with the following properties:

- `type` - restart policy type. Allowed values: `RestartAgent`, `DeactivatePlugin`.
- `threshold` - number of restarts before the policy takes into effect.

The health check interval is used to check the health of the source plugins. The default health check interval is 10 seconds. The health check interval can be configured with the following property:

- `healthCheckInterval` - health check interval.

```yaml
  # -- Botkube Restart Policy on plugin failure.
  restartPolicy:
    # -- Restart policy type. Allowed values: "RestartAgent", "DeactivatePlugin".
    type: "DeactivatePlugin"
    # -- Number of restarts before policy takes into effect.
    threshold: 10
  healthCheckInterval: 10s

```

## Syntax

```yaml
# Map of sources. The `sources` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: sources.{alias}
sources:
  "prom":
    botkube/prometheus@v1.4.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        url: "http://localhost:9090"

  "k8s-recommendation-events":
    # Built-in kubernetes source configuration.
    botkube/kubernetes:
      enabled: true
      config:
        # Kubernetes configuration
        recommendations:
          pod:
            noLatestImageTag: true
        # ... trimmed ...

# Configuration for Botkube executors and sources plugins.
plugins:
  # Directory, where downloaded plugins are cached.
  cacheDir: "/tmp"
  # List of plugins repositories.
  repositories:
    # This repository serves officially supported Botkube plugins.
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.4.0/plugins-index.yaml
    # Other 3rd party repositories.
    repo-name:
      url: https://example.com/plugins-index.yaml
  # -- Configure Incoming webhook for source plugins.
  incomingWebhook:
    enabled: true
    port: 2115
    targetPort: 2115
  # -- Botkube Restart Policy on plugin failure.
  restartPolicy:
    # -- Restart policy type. Allowed values: "RestartAgent", "DeactivatePlugin".
    type: "DeactivatePlugin"
    # -- Number of restarts before policy takes into effect.
    threshold: 10
  healthCheckInterval: 10s
```

The default configuration for the Botkube Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
