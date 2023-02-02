---
id: general
title: General
sidebar_position: 6
---

The general settings holds a general configuration for the Botkube backend. For example, log level, disabling config watcher and similar.

## Syntax

```yaml
# General Botkube configuration.
settings:
  # Cluster name to differentiate incoming messages.
  clusterName: not-configured
  # If true, notifies about new Botkube releases.
  upgradeNotifier: true
  # Botkube logging settings.
  log:
    # Sets one of the log levels. Allowed values: `info`, `warn`, `debug`, `error`, `fatal`, `panic`.
    level: info
    # If true, disable ANSI colors in logging.
    disableColors: false

# Parameters for the Config Watcher container.
# It watches for data changes of any ConfigMap or Secret with the label `botkube.io/config-watch: "true"` from the namespace where Botkube is installed, and restarts Botkube.
configWatcher:
  # If true, restarts the Botkube Pod on config changes.
  enabled: true
  # Timeout for the initial Config Watcher sync.
  # If set to 0, waiting for Config Watcher sync will be skipped. In a result, configuration changes may not reload Botkube app during the first few seconds after Botkube startup.
  initialSyncTimeout: 0
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
