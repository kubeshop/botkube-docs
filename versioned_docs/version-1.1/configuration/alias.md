---
id: alias
title: Alias
sidebar_position: 4
---

Botkube can define multiple aliases for arbitrary commands. The aliases are replaced with the underlying command before executing it. Aliases can replace a single word or multiple ones. For example, you can define a `k` alias for `kubectl`, or `kgp` for `kubectl get pods`.

Aliases work for all commands, including executor plugins and Botkube built-in ones. To learn more about how to configure Executors, see the [Executor](./executor/index.md) section.

Aliases are defined globally for the whole Botkube installation. Once they are configured, read the [Aliases](../usage/executor/index.md#aliases) section in Usage document.

## Syntax

```yaml
# Custom aliases for given commands.
# The aliases are replaced with the underlying command before executing it.
# Aliases can replace a single word or multiple ones. For example, you can define a `k` alias for `kubectl`, or `kgp` for `kubectl get pods`.
#
## Format: aliases.{alias}
aliases:
  kc:
    command: kubectl
    displayName: "Kubectl alias"
  k:
    command: kubectl
    displayName: "Kubectl alias"
## Multi-word alias example:
#  kgp:
#    command: kubectl get pods
#    displayName: "Get pods"
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
