---
id: kubectl
title: Kubectl
sidebar_position: 2
---

The Kubectl executor plugin allows you to run the `kubectl` command directly in the communication platform.

## Get started

By default, just the read-only `kubectl` commands are supported. For enabling commands that require create, update or delete rules, you need to create specific (Cluster)Role and (Cluster)RoleBinding and reference it in the RBAC configuration. To learn more, refer to the [RBAC section](../features/rbac.md).

### Enable the plugin

The Kubectl plugin is hosted by the official Botkube plugin repository. First, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.14.0/plugins-index.yaml
```

To enable Kubectl executor, add ``--set 'executors.k8s-default-tools.botkube/kubectl.enabled=true'` to a given Botkube [`install` command](../cli/commands/botkube_install.md).

## Usage

To execute the `kubectl` commands, send message in following format in the channel where Botkube is already added:

```
@Botkube kubectl [verb] [resource] [flags]
```

### Aliases

By default, `k` and `kc` are configured as aliases for the `kubectl` command. You can use them on par with the `kubectl` command. To read more about aliases configuration, see the [Alias](../features/commands.md#command-aliases) section.

### Interactive kubectl command builder

:::info
Interactive kubectl command builder is only available for the [Slack](../installation/slack/index.md).
For other platforms, as an alternative, you can try the [AI Assistant](./ai-assistant.mdx) plugin which can execute `kubectl` commands based on prompts in natural language.
:::

Use the interactive `kubectl` command builder to construct a `kubectl` command just by selecting items from dropdowns. This is especially useful on mobile when typing the command is harder.

The builder includes a resource name dropdown list. This is pre-populated with all the relevant resource names. It's great for discovering resources with the option to select them. E.g. Just grab a Pod name without needing to type or copy-and-paste.

To start the interactive `kubectl` command builder, run `@Botkube kubectl` from the configured channel where Botkube is added.
You can also use any of the [configured aliases](../features/commands.md#command-aliases) - for example, the default `k` one, as illustrated below:

![kubectl command builder](./assets/kc-cmd-builder.gif)

## Limitations

Keep in mind that the interactive command builder may not support all the commands that you can run just by typing them directly in a chat window. The following policies are applied:

- Under verbs' dropdown, we display verbs that are defined under the `interactiveBuilder.allowed.verbs` configuration.
  :::tip
  The default verbs for the `kubectl` plugin found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
  If you ServiceAccount allow running other actions such as `delete`, you can add them directly under [`interactiveBuilder.allowed.verbs`](#configuration).
  :::

- Under resources' dropdown, we display resources that are defined under the `interactiveBuilder.allowed.resources` configuration and are allowed for already selected verb. For example, for the `logs` verb we display only `pods`, `statefulsets`, `deployments`, and `daemonsets`.
  :::tip
  The default resources for the `kubectl` plugin found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

  If you ServiceAccount allow access to more resources, you can add them directly under [`interactiveBuilder.allowed.resources`](#configuration).
  :::

- For resources that are namespace-scoped, under namespaces' dropdown, we display `interactiveBuilder.allowed.namespaces` if defined. If static namespaces are not specified, plugin needs to have access to fetch all Namespaces, otherwise Namespace dropdown won't be visible at all.

- The `kubectl` command preview is displayed only if the command that you built is valid, and you have permission to run it.

## Configuration

This plugin supports the following configuration:

```yaml
# Configures the default Namespace for executing Botkube `kubectl` commands. If not set, uses the 'default'.
defaultNamespace: "default"
# Configures the interactive kubectl command builder.
interactiveBuilder:
  allowed:
    # Configures which K8s namespace are displayed in namespace dropdown.
    # If not specified, plugin needs to have access to fetch all Namespaces, otherwise Namespace dropdown won't be visible at all.
    namespaces: ["default"]
    # Configures which `kubectl` methods are displayed in commands dropdown.
    verbs: ["api-resources", "api-versions", "cluster-info", "describe", "explain", "get", "logs", "top"]
    # Configures which K8s resource are displayed in resources dropdown.
    resources: ["deployments", "pods", "namespaces"]
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

## Merging strategy

For all collected `kubectl` executors bindings, configuration properties are overridden based on the order of the binding list for a given channel. The priority is given to the last binding specified on the list. Empty properties are omitted.

### Example

Consider such configuration in the Botkube self-hosted installation:

```yaml
communications:
  "default-group":
    socketSlack:
      channels:
        "default":
          name: "random"
          bindings:
            executors:
              - kubectl-one
              - kubectl-two
              - kubectl-three

executors:
  "kubectl-one":
    kubectl:
      enabled: true
      config:
        defaultNamespace: "default"
        interactiveBuilder:
          allowed:
            verbs: ["api-resources", "api-versions", "cluster-info", "describe", "explain", "get", "logs", "top"]
            resources: ["deployments", "pods", "namespaces"]
  "kubectl-two":
    kubectl:
      enabled: true
      config:
        interactiveBuilder:
          allowed:
            namespaces: ["default"]
            verbs: ["api-resources", "top"]
  "kubectl-three":
    kubectl:
      enabled: false
      config:
        interactiveBuilder:
          allowed:
            namespaces: ["kube-system"]
```

We can see that:

- Only the `default` namespace is displayed in the interactive command builder. This is a result of merging `kubectl-one` and `kubectl-two`. The `kubectl-three` binding is not taken into account as it's disabled.
- Only the `api-resources` and `top` verbs are displayed in the interactive command builder as they are overridden by the `kubectl-two`.
- All resources defined in `kubectl-one` are displayed in the interactive command builder as other enabled bindings don't override this property.
