---
id: general
title: General
sidebar_position: 2
---

The general settings holds a general configuration for the BotKube backend. For example, log level, disabling config watcher and similar.

## Syntax

```yaml
# General BotKube configuration.
settings:
  # Cluster name to differentiate incoming messages.
  clusterName: not-configured
  # If true, notifies about new BotKube releases.
  upgradeNotifier: true
  # BotKube logging settings.
  log:
    # Sets one of the log levels. Allowed values: `info`, `warn`, `debug`, `error`, `fatal`, `panic`.
    level: info
    # If true, disable ANSI colors in logging.
    disableColors: false

# Parameters for the Config Watcher container.
configWatcher:
  # If true, restarts the BotKube Pod on config changes.
  enabled: true
  # Timeout for the initial Config Watcher sync.
  # If set to 0, waiting for Config Watcher sync will be skipped. In a result, configuration changes may not reload BotKube app during the first few seconds after BotKube startup.
  initialSyncTimeout: 0
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
