---
title: "Resource"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 22
---

The resource settings contains:

- Resource list you want to watch,
- Namespaces you want to filter,
- The type of events you want to get notifications about,
- Settings to monitor updates for the specific resource fields,
- Way to skip filter runs.

## Syntax

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
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
