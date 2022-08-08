---
menutitle: "Executor"
title: "Executor"
weight: 23
---

The executor property allows you to define multiple executor groups that can be later referred by communication bindings. For example, take a look on such executor definition:

```yaml
executors:
  'kubectl-global':      # This is an executor name, which is used in bindings
    kubectl:
      # ... trimmed ...

  'kubectl-team-a-only':  # This is an executor name, which is used in bindings
    kubectl:
      # ... trimmed ...
```

This can be later used by the communication mediums:

```yaml
communications:
  'default-group':
    slack:
      channels:
        'default':
          bindings:
            executors: # The order is important for merging strategy.
              - kubectl-global       # The executor group name
              - kubectl-team-a-only  # The executor group name
          # ... trimmed ...
```

Multiple executor bindings, are merged together, see the [**merging strategy**](#merging-strategy) section for more details. For all available executor configuration properties, see the [**syntax**](#syntax) section.

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.<alias>
executors:
  'kubectl-read-only':
    # Kubectl executor configuration.
    kubectl:
      namespaces:
        # List of allowed Kubernetes Namespaces for command execution. The "all" keyword, allows all the Namespaces.
        include:
          - all
        # List of ignored Kubernetes Namespace. It can be used only when `include: ["all"]`.
        # It can contain a wildcard (*) that expands to zero or more arbitrary characters
        # Example: `ignore: ["x", "y", "secret-ns-*"]`
        ignore: []
      # If true, enables `kubectl` commands execution.
      enabled: false
      # List of allowed `kubectl` commands.
      commands:
        # Configures which `kubectl` methods are allowed.
        verbs: ["api-resources", "api-versions", "cluster-info", "describe", "diff", "explain", "get", "logs", "top", "auth"]
        # Configures which K8s resource are allowed.
        resources: ["deployments", "pods", "namespaces", "daemonsets", "statefulsets", "storageclasses", "nodes", "configmaps"]
      # Configures the default Namespace for executing BotKube `kubectl` commands. If not set, uses 'default'.
      defaultNamespace: default
      # If true, enables commands execution from configured channel only.
      restrictAccess: false
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).

## Merging strategy

BotKube takes into account only bindings for a given execution Namespace. For example:

1. `@BotKube get po/botkube -n botkube` - collect `kubectl` executor bindings that include `botkube` or `all` Namespaces.
2. `@BotKube get po -A` - collect all `kubectl` executor bindings that include `all` Namespace.
3. `@BotKube get po` - first, we resolve the execution Namespace. For that, we collect all enabled `kubectl` executor bindings and check the `defaultNamespace` property. If property is not define, we use the `default` Namespace. With resolved execution Namespace, we run the logic define in the first step.

For all collected `kubectl` executors, we merge properties with the following strategy:
- `commands.verbs` - append
- `commands.resources` - append
- `commands.defaultNamespace` - override
- `commands.restrictAccess` - override


The order of the binding list is important as it impacts properties that are overridden. The priority is given to the last binding specified on the list.

### Example

Let's consider such configuration:
```yaml
communications:
  'default-group':
    slack:
      channels:
        'default':
          name: "random"
          bindings:
            executors:
              - kubectl-pod
              - kubectl-wait
              - kubectl-all-ns
              - kubectl-exec

executors:
  'kubectl-pod':
    kubectl:
      enabled: true
      namespaces:
        include: [ "botkube", "default" ]
      commands:
        verbs: [ "get" ]
        resources: [ "pods" ]
      restrictAccess: false
  'kubectl-wait':
    kubectl:
      enabled: true
      namespaces:
        include: [ "botkube", "default" ]
      commands:
        verbs: [ "wait" ]
      restrictAccess: true
  'kubectl-all-ns':
    kubectl:
      enabled: true
      namespaces:
        include:
          - all
      commands:
        verbs: [ "get" ]
        resources: [ "deployments" ]
  'kubectl-exec':
    kubectl:
      enabled: false
      namespaces:
        include: [ "botkube", "default" ]
      commands:
        verbs: [ "exec" ]
      restrictAccess: false
```

We can see that:
- for `botkube` and `default` Namespaces we can get and wait for Pods. This is the result of merging `kubectl-pod` and `kubectl-wait`.
- for all Namespaces we can only get Deployments as specified by `kubectl-all-ns`.
- the `exec` command is not allowed as the `kubectl-exec` binding is disabled (`kubectl.enabled=false`). As a result is not taken into account.
- the `kubectl` works in a restricted access because the `kubectl-wait` binding is the last one which is both enabled and sets the `restrictAccess` property to a particular value.
