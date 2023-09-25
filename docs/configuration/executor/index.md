---
id: executor
title: Executor
sidebar_position: 3
---

The executor configuration allows you to define multiple executor configurations that can be later referred in [communication](../communication) bindings. For example, take a look at such executor definition:

```yaml
executors:
  "kubectl-global": # This is an executor configuration name, which is referred in communication bindings.
    kubectl:
      # ... trimmed ...

  "helm-read-only": # This is an executor configuration name, which is referred in communication bindings.
    helm:
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
            executors: # The order is important for merging strategy.
              - kubectl-global # The executor configuration name
              - helm-read-only # The executor configuration name
          # ... trimmed ...
```

To use the Botkube executor plugins, first you need to define the plugins repository under the `plugins` property:

```yaml
plugins:
  repositories:
    repo-name:
      url: https://example.com/plugins-index.yaml
```

Next, you can configure executor from a given repository:

```yaml
executors:
  "plugins":
    repo-name/executor-name@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true
      config: {}
```

For all executor configuration properties, see the [**syntax**](#syntax) section.

#### Restart Policy and Health Check Interval

This section of the configuration allows you to configure the restart policy for the Botkube executor plugins. The restart policy is used when the executor plugin fails to start. The default restart policy is `DeactivatePlugin`, which means that the plugin is deactivated after a given number of restarts. The restart policy can be configured with the following properties:

- `type` - restart policy type. Allowed values: `RestartAgent`, `DeactivatePlugin`.
- `threshold` - number of restarts before the policy takes into effect.

The health check interval is used to check the health of the executor plugins. The default health check interval is 10 seconds. The health check interval can be configured with the following property:

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
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "k8s-tools":
    botkube/helm@v1.4.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        helmDriver: "secret"

    botkube/kubectl: # If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.

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
