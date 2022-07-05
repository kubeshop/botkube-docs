---
title: "Resource"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 20
---

BotKube backend reads resource configurations from the [resource_config.yaml](#file-syntax) file placed in the directory specified by the **CONFIG_PATH** environment variable.

## File syntax

The resource configuration file contains:

- Resource list you want to watch,
- Namespaces you want to filter,
- The type of events you want to get notifications about,
- Settings to monitor updates for the specific resource fields,
- Way to skip filter runs.

It also contains global settings to:

- Toggle kubectl command execution,
- Configure kubectl commands BotKube can execute,
- Restrict kubectl command execute to specific channel.

```yaml
## Resources you want to watch
resources:
- name: RESOURCE            # K8s Resource you want to monitor.
                            # Resource name must be in
                            # group/version/resource (G/V/R) format
                            # for core resources with no group,
                            # ignore group fron g/v/r and use v/r
                            # resource name should be plural
                            # (e.g v1/pods, v1.ingresses, etc)

  namespaces:
    include:                # List of namespaces to monitor for
                            # the RESOURCE events
    - namespace/all         # Use all to monitor all the resources

    ignore:                 # List of namespaces to be ignored
                            # used only with include: all
    - <namespace>           # example : include [all], ignore [x,y,z]

  events:                   # List of lifecycle events you want to
  - create                  # receive notifications about
  - update                  # Valid options are:
  - delete                  # create, update, delete, error OR all
  - error

  updateSetting:            # Set include diff with the update event
                            # about the changes in specific fields
    includeDiff: true       # updateSettings are ignored if `update`
                            # events are not configured for the resource

    fields:
    - JSONPath              # List of JSONPath expressions to monitor
                            # changes in specific fields
- name: apps/v1/deployments
  namespaces:
    include:
    - dev
    - qa
    - default
    ignore:
    - kube-system
    - prod
  updateSetting:
    includeDiff: true
    fields:
    - spec.template.spec.containers[*].image
    - status.availableReplicas
  events:
  - all

# Check true if you want to receive recommendations
# about the best practices for the created resource
recommendations: true

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
  configwatcher: true
  # Set false to disable upgrade notification
  upgradeNotifier: true
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
