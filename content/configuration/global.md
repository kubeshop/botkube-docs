---
id: global
title: "Global"
sidebar_position: 2
---

The global settings contains:

- Toggle `kubectl` command execution,
- Configure `kubectl` commands BotKube can execute,
- Restrict `kubectl` command execute to specific channel.

## Syntax

```yaml

# Cluster Setting to manage command execution access
settings:
  # Set cluster name to differentiate incoming messages
  clustername: not-configured
  # Kubectl executor configs
  kubectl:
    # Set true to enable kubectl commands execution
    enabled: false
    # List of allowed commands
    commands:
      # kubectl method which are allowed with BotKube command
      verbs: ["api-resources", "api-versions", "cluster-info", "describe", "diff", "explain", "get", "logs", "top", "auth"]
      # resources on which kubectl methods are allowed with BotKube commands
      resources: ["deployments", "pods" , "namespaces", "daemonsets", "statefulsets", "storageclasses", "nodes"]
    # set Namespace to execute botkube kubectl commands by default
    defaultNamespace: default
    # Set true to enable commands execution from configured channel only
    restrictAccess: false
  # Set true to enable config watcher
  configWatcher: true
  # Set false to disable upgrade notification
  upgradeNotifier: true
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
