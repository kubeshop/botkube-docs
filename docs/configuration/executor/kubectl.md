---
id: kubectl
title: Kubectl
sidebar_position: 2
---

The Botkube Kubectl executor plugin allows you to run the `kubectl` command directly in the chat window of each communication platform.

The Kubectl plugin is hosted by the official Botkube plugin repository. To enable the Helm plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.0.1/plugins-index.yaml
```

## Enabling plugin

To enable `kubectl` executor, add `--set 'executors.{configuration-name}.botkube/kubectl.enabled=true'` to a given Helm install command. By default, just the read-only `kubectl` commands are supported.

For enabling commands that require create, update or delete rules, you need to create specific
(Cluster)Role and (Cluster)RoleBinding and reference it from plugin's `context` configuration.
To learn more refer to the [RBAC section](../rbac.md).

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "k8s-tools":
    # Kubectl executor configuration.
    botkube/kubectl:
      enabled: false
      config:
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

For all collected `kubectl` executors bindings, configuration properties are overridden based on the order of the binding list. The priority is given to the last binding specified on the list. Empty properties are omitted.

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
