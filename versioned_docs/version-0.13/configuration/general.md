---
id: general
title: General
sidebar_position: 2
---

The settings property holds a general configuration for the Botkube backend. For example, log level, disabling Config Watcher and similar.

## Syntax

```yaml
# General Botkube configuration.
settings:
  # Cluster name to differentiate incoming messages.
  clusterName: not-configured
  # If true, restarts the Botkube Pod on config changes.
  configWatcher: true
  # If true, notifies about new Botkube releases.
  upgradeNotifier: true
  # Botkube logging settings.
  log:
    # Sets one of the log levels. Allowed values: `info`, `warn`, `debug`, `error`, `fatal`, `panic`.
    level: info
    # If true, disable ANSI colors in logging.
    disableColors: false
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
