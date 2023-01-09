---
id: kubectl
title: Kubectl
sidebar_position: 2
---

The `kubectl` executor allows you to run the `kubectl` command directly in the chat window of each communication platform.

## Enabling plugin

To enable `kubectl` executor, add `--set executors.{configuration-name}.kubectl.enabled: true` to a given Helm install command. By default, just the read-only `kubectl` commands are supported.

You can change that by adjusting the `rbac` property in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file or by using the `--set-json` flag, e.g.:

```bash
--set-json 'rbac.rules=[{"apiGroups": ["*"], "resources": ["*"], "verbs": ["get","watch","list","create","delete","update","patch"]}]'
```

Additionally, you need to make sure that a given `verbs` and `resources` are allowed by a specific `kubectl` executor configuration.

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "kubectl-read-only":
    # Kubectl executor configuration.
    kubectl:
      namespaces:
        # Include contains a list of allowed Namespaces.
        # It can also contain a regex expressions:
        #  - ".*" - to specify all Namespaces.
        include:
          - ".*"
        # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
        # It can also contain a regex expressions:
        #  - "test-.*" - to specify all Namespaces with `test-` prefix.
        #exclude: []
      # If true, enables `kubectl` commands execution.
      enabled: false
      # List of allowed `kubectl` commands.
      commands:
        # Configures which `kubectl` methods are allowed.
        verbs:
          ["api-resources", "api-versions", "cluster-info", "describe", "diff", "explain", "get", "logs", "top", "auth"]
        # Configures which K8s resource are allowed.
        resources:
          ["deployments", "pods", "namespaces", "daemonsets", "statefulsets", "storageclasses", "nodes", "configmaps"]
      # Configures the default Namespace for executing Botkube `kubectl` commands. If not set, uses 'default'.
      defaultNamespace: default
      # If true, enables commands execution from configured channel only.
      restrictAccess: false
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

## Merging strategy

When executing a `kubectl` command, Botkube takes into account only bindings for a given execution Namespace. For example:

- `@Botkube kubectl get po/botkube -n botkube` - collect `kubectl` executor bindings that include `botkube` or `*.` (all) Namespaces.
- `@Botkube kubectl get po -A` - collect all `kubectl` executor bindings that include `*.` (all) Namespaces.
- `@Botkube kubectl get po` - first, we resolve the execution Namespace. For that, we collect all enabled `kubectl` executor bindings and check the `defaultNamespace` property. If property is not define, we use the `default` Namespace. With resolved execution Namespace, we run the logic define in the first step.

For all collected `kubectl` executors, we merge properties with the following strategy:

- `commands.verbs` - append
- `commands.resources` - append
- `commands.defaultNamespace` - override
- `commands.restrictAccess` - override

The order of the binding list is important as it impacts properties that are overridden. The priority is given to the last binding specified on the list.

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
              - kubectl-pod
              - kubectl-wait
              - kubectl-all-ns
              - kubectl-exec

executors:
  "kubectl-pod":
    kubectl:
      enabled: true
      namespaces:
        include: ["botkube", "default"]
      commands:
        verbs: ["get"]
        resources: ["pods"]
      restrictAccess: false
  "kubectl-wait":
    kubectl:
      enabled: true
      namespaces:
        include: ["botkube", "default"]
      commands:
        verbs: ["wait"]
      restrictAccess: true
  "kubectl-all-ns":
    kubectl:
      enabled: true
      namespaces:
        include:
          - ".*"
      commands:
        verbs: ["get"]
        resources: ["deployments"]
  "kubectl-exec":
    kubectl:
      enabled: false
      namespaces:
        include: ["botkube", "default"]
      commands:
        verbs: ["exec"]
      restrictAccess: false
```

We can see that:

- For `botkube` and `default` Namespaces, we can execute `get` and `wait` commands for Pods. This is the result of merging `kubectl-pod` and `kubectl-wait`.
- For all Namespaces we can execute `get` for Deployments, as specified by `kubectl-all-ns`.
- The `exec` command is not allowed as the `kubectl-exec` binding is disabled (`kubectl.enabled` is set to `false`).
- The `kubectl` works in a restricted access because the `kubectl-wait` binding is the **last one** which is both enabled and sets the `restrictAccess` property to `true`.
