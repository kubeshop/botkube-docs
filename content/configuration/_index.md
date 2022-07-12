---
title: "Configuration"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 10
---

BotKube backend allows you to specify the [resource](/configuration/resource) and [communication](/configuration/communication) settings. Check the individual documents for more detailed explanation on how to provide those configurations.


### Updating the configuration at runtime

You can update the configuration and use `helm upgrade` to update configuration values for the BotKube.

You can also change resource configuration directly in ConfigMap - which is not recommended but is great for quick experimentation.

```bash
$ kubectl edit configmap botkube-configmap -n botkube
```
This command opens ConfigMap `specs` in default editor. Do the required changes, save and exit. The BotKube Pod will automatically restart to have these configurations in effect.

## Helm install options

Advanced Helm install options are documented [here](/configuration/helm-chart-parameters).
