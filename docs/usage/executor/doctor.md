---
id: doctor
title: "Doctor"
sidebar_position: 4
---

Botkube allows you to execute `doctor` commands on your Kubernetes cluster. By default, `doctor` command execution is disabled. See the [**Enabling plugin**](../../configuration/executor/doctor.md#enabling-plugin) section from the `doctor` configuration documentation.

To execute the `doctor` commands, send message in following formats in the channel where Botkube is already added:

```
## Parametric command
@Botkube doctor --namespace=[namespace] --resource=[resource] --error=[error]
```

```
## Command with free text question
@Botkube doctor "[free text question]"
```

By default, `chatgpt` is configured as alias for the `doctor` command. You can use them on par with the `doctor` command. To read more about aliases configuration, see the [Alias](../../configuration/alias.md) section.

This command needs to be executed from configured channel.
