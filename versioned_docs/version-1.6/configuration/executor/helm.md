---
id: helm
title: Helm
sidebar_position: 3
---

The Botkube Helm executor plugin allows you to run the `helm` command directly in the chat window of each communication platform.

The Helm plugin is hosted by the official Botkube plugin repository. To enable the Helm plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.6.0/plugins-index.yaml
```

## Enabling plugin

To enable Helm plugin, add `--set 'executors.k8s-default-tools.botkube/helm.enabled=true'` to a given Botkube [`install` command](../../cli/commands/botkube_install.md). By default, just the read-only Helm commands are supported.

For enabling commands that require create, update or delete rules, you need to create specific (Cluster)Role and (Cluster)RoleBinding and reference it from plugin's `context` configuration. To learn more refer to the [RBAC section](../rbac.md).

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "k8s-tools":
    botkube/helm: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        helmDriver: "secret" # Allowed values are configmap, secret, memory.
        helmCacheDir: "/tmp/helm/.cache"
        helmConfigDir: "/tmp/helm/"
      context:
        # RBAC configuration for this plugin.
        rbac:
          group:
            # Static impersonation for given group.
            type: Static
            static:
              # Name of group.rbac.authorization.k8s.io the plugin role will be bound to.
              values: [botkube-plugins-default]
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

## Merging strategy

For all collected `helm` executors bindings, configuration properties are overridden based on the order of the binding list. The priority is given to the last binding specified on the list. Empty properties are omitted.

### Example

Consider such configuration:

```yaml
communications:
  "default-group":
    slack:
      channels:
        "default":
          name: "random"
          bindings:
            executors:
              - helm-one
              - helm-two
              - helm-three

executors:
  "helm-one":
    botkube/helm:
      enabled: true
      config:
        helmDriver: "secret"
        helmCacheDir: "/tmp/helm/.cache"
        helmConfigDir: "/tmp/helm/"
  "helm-two":
    botkube/helm:
      enabled: true
      config:
        helmDriver: "configmap"
  "helm-three":
    botkube/helm:
      enabled: false
      config:
        helmDriver: "secret"
        helmCacheDir: "/example/helm/.cache"
        helmConfigDir: "/example/helm/"
```

We can see that:

- The `helmDriver` is set to `configmap` as it's overridden by the `helm-two` binding - the **last one** which is both enabled and sets the `helmDriver` property.
- The `helmConfigDir` and `helmCacheDir` are set to values specified by the `helm-one` configuration as the `helm-two` don't specify them.
- The `helm-tree` binding is disabled (`botkube/helm.enabled` is set to `false`), so it's not taken into account.
