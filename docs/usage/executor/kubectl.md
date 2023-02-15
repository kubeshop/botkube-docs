---
id: kubectl
title: "Kubectl"
sidebar_position: 2
---

Botkube allows you to execute `kubectl` commands on your Kubernetes cluster. By default, kubectl command execution is disabled. See the [**Enabling plugin**](../../configuration/executor/kubectl.md#enabling-plugin) section from the `kubectl` configuration documentation.

To execute the `kubectl` commands, send message in following format in the channel where Botkube is already added:

```
@Botkube kubectl [verb] [resource] [flags]
```

By default, `k` and `kc` are configured as aliases for the `kubectl` command. You can use them on par with the `kubectl` command. To read more about aliases configuration, see the [Alias](../../configuration/alias.md) section.

This command needs to be executed from configured channel.

## Interactive kubectl commands builder

Use the interactive `kubectl` command builder to construct a `kubectl` command just by selecting items from dropdowns. This is especially useful on mobile when typing the command is harder.

The builder includes a resource name dropdown list. This is pre-populated with all the relevant resource names. It's great for discovering resources with the option to select them. E.g. Just grab a Pod name without needing to type or copy-and-paste.

To start the interactive `kubectl` command builder, run `@Botkube kubectl` from the configured channel where Botkube is added.
You can also use any of the [configured aliases](../../configuration/alias.md) - for example, the default `k` one, as illustrated below:

![kubectl command builder](./assets/kc-cmd-builder.gif)

### Limitations

Keep in mind that the interactive command builder may not support all the commands that you can run just by typing them directly in a chat window. The following policies are applied:

- Under verbs' dropdown, we display verbs that are defined under the `interactiveBuilder.allowed.verbs` configuration.
  :::tip
  By default, the following verbs are allowed: `api-resources`, `api-versions`, `cluster-info`, `describe`, `explain`, `get`, `logs`, `top`.

  If you ServiceAccount allow running other actions such as `delete`, you can add them directly under [`interactiveBuilder.allowed.verbs`](../../configuration/executor/kubectl.md#syntax).
  :::

- Under resources' dropdown, we display resources that are defined under the `interactiveBuilder.allowed.resources` configuration and are allowed for already selected verb. For example, for the `logs` verb we display only `pods`, `statefulsets`, `deployments`, and `daemonsets`.
  :::tip
  By default, the following resources are allowed: `deployments`, `pods`, `namespaces`, `daemonsets`, `statefulsets`, `storageclasses`, `nodes`, `configmaps`, `services`, `ingresses`.

  If you ServiceAccount allow access to more resources, you can add them directly under [`interactiveBuilder.allowed.resources`](../../configuration/executor/kubectl.md#syntax).
  :::

- For resources that are namespace-scoped, under namespaces' dropdown, we display `interactiveBuilder.allowed.namespaces` if defined. If static namespaces are not specified, plugin needs to have access to fetch all Namespaces, otherwise Namespace dropdown won't be visible at all.

- The `kubectl` command preview is displayed only if the command that you built is valid, and you have permission to run it.
