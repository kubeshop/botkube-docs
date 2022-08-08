---
title: "BotKube"
date: 2022-07-20T13:28:06+02:00
draft: false
weight: 21
---

The settings property holds a general configuration for the BotKube backend. For example, log level, disabling config watcher and similar.

## Syntax

```yaml
# Global BotKube configuration.
settings:
  # Cluster name to differentiate incoming messages.
  clusterName: not-configured
  # If true, restarts the BotKube Pod on config changes.
  configWatcher: true
  # If true, notifies about new BotKube releases.
  upgradeNotifier: true
  # BotKube logging settings.
  log:
    # Sets one of the log levels. Allowed values: `info`, `warn`, `debug`, `error`, `fatal`, `panic`.
    level: info
    # If true, disable ANSI colors in logging.
    disableColors: false
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
