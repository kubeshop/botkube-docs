---
title: "Configuration"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 20
---

BotKube controller reads configurations from **config.yaml** file placed at **CONFIG_PATH**

## config.yaml syntax
The configuration file contains, 

- resource list you want to watch
- the type of events you want to get notifications about
- way to skip filter runs
- and slack access configuration

```
  ## Resources you want to watch
  resources:
    - name: NAME_OF_THE_RESOURCE   # Name of the resources e.g pods, deployments, ingresses, etc. (Resource name must be in plural form)
      namespaces:                  # List of namespaces, "all" will watch all the namespaces
        - all
      events:                      # List of lifecycle events you want to receive, e.g create, update, delete OR all
        - create
        - delete
    - name: secrets
      namespaces:
        - kube-system
      events:
        - create
        - delete

  # K8S error/warning events you want to receive for the configured resources
  events:
    types:
      - normal
      - warning

  # Check true if you want to receive recommendations
  # about the best practices for the created resource
  recommendations: true
  
  # Channels configuration
  communications:
    slack:
      channel: 'SLACK_CHANNEL'
      token: 'SLACK_API_TOKEN'
```
The default configuration can be found at:


As of now, BotKube can watch following types of resources:

- pods
- nodes
- services
- namespaces
- replicationcontrollers
- persistentvolumes
- persistentvolumeclaims
- secrets
- configmaps
- deployments
- daemonsets
- replicasets
- ingresses
- jobs
- roles
- rolebindings
- clusterroles
- clusterrolebindings
