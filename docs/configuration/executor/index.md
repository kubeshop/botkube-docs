---
id: executor
title: Executor
sidebar_position: 1
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
    repo-name: https://example.com/plugins-index.yaml
```

Next, you can configure executor from a given repository:

```yaml
executors:
  "plugin-based":
    repo-name/executor-name@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true
      config: {}
```

For all executor configuration properties, see the [**syntax**](#syntax) section.

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "plugin-based":
    botkube/helm@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        helmDriver: "secret"

  "kubectl-read-only":
    # Built-in kubectl executor configuration.
    kubectl:
      enabled: true
      # Kubectl configuration
      namespaces:
        include:
          - ".*"
      # ... trimmed ...

# Configuration for Botkube executors and sources plugins.
plugins:
  # Directory, where downloaded plugins are cached.
  cacheDir: "/tmp"
  # List of plugins repositories.
  repositories:
    # This repository serves officially supported Botkube plugins.
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v9.99.9-dev/plugins-index.yaml
    # Other 3rd party repositories.
    repo-name:
      url: https://example.com/plugins-index.yaml
```

The default configuration for the Botkube Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
