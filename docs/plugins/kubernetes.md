---
id: kubernetes
title: Kubernetes
sidebar_position: 1
---

The Kubernetes source plugin produces events for configured Kubernetes resources. These events can be sent to communication channels or actions.

## Get started

### Enable the plugin

The Kubernetes plugin is hosted by the official Botkube plugin repository. First, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.14.0/plugins-index.yaml
```

To enable Kubernetes source, add `--set 'sources.{configuration-name}.botkube/kubernetes.enabled=true'` to a given Botkube [`install` command](../cli/commands/botkube_install.md).

## Usage

Once the plugin is enabled, the Kubernetes plugin starts consuming Kubernetes events and send them to configured platforms.

## Configuration

### Event and resource constraints

Define constraints for Kubernetes events to narrow down the events you want to receive.

You can define both global constraints, that are applied to all resources within a given source, and also resource-specific constraints, which override global constraints. See the [Syntax](#syntax) paragraph for more details.

There are multiple types of constraints. Each constraint type is described in the following sections.

#### Namespaces

Include and/or exclude namespaces to watch. You can use exact values or regex expressions to specify namespaces.

Exclude takes precedence over include. If a given namespace is excluded, it will be ignored, even if it included.

**Examples**

To watch all namespaces except those with `testing-` prefix, use the following constraint:

```yaml
namespaces:
  include:
    - ".*" # include all...
  exclude:
    - "testing-.*" # ...except any namespace that has `testing-` prefix
```

To watch only `dev` and `prod` namespaces, use the following constraint:

```yaml
namespaces:
  include:
    - "dev"
    - "prod"
  exclude: []
```

#### Labels

Specify exact match for resource labels. The watched resources must have all the specified labels.

**Example**

```yaml
labels: # Match only the resources that have all the specified labels
  app: "my-app"
  environment: "production"
```

#### Annotations

Specify exact match for resource annotations. The watched resources must have all the specified annotations.

**Example**

```yaml
annotations: # Match only the resources that have all the specified annotations.
  app: "my-app"
  my-annotation: "true"
```

#### Resource name

Filter events based on the resource name. If not defined, all resource names are matched.
Exclude takes precedence over include. If a given resource name is excluded, it will be ignored, even if it included.

You can use both exact values and regex expressions to specify resource names. This constraint can be set per resource only. See the [Syntax](#syntax) paragraph for more details.

**Examples**

To match resource names that have `testing-` prefix, use the following constraint:

```yaml
name:
  include:
    - "testing-.*" # include only resource names that have `testing-` prefix
  exclude: []
```

To match all resources except those that have `testing-` prefix, use the following constraint:

```yaml
name:
  include:
    - ".*" # include all resource names...
  exclude:
    - "testing-.*" # ...except those that have `testing-` prefix
```

#### Event types

List the event types to watch.

Possible values:

- `create`,
- `update`,
- `delete`,
- `error`,
- `all`, which is equal to all of the above.

**Example**

```yaml
event:
  types: # watch for create, delete and error events
    - create
    - delete
    - error
```

#### Event reason

Define exact values or regex expression to match the event reason. If not defined, all events are watched.
Exclude takes precedence over include. If a given event reason is excluded, it will be ignored, even if it included.

**Examples**

To match events with reason equal to `BackOff`, use the following constraint:

```yaml
event:
  reason:
    include:
      - "^BackOff$" # match events with reason equal to `BackOff`
    exclude: []
```

To match all events except those with reason equal to `BackOff`, use the following constraint:

```yaml
event:
  reason:
    include:
      - ".*" # match all event reasons...
    exclude:
      - "^BackOff$" # ...except those equal to `BackOff`
```

#### Event message

Define regex expression to match the event message. If not defined, all event messages are matched.

Exclude takes precedence over include. If a given event message is excluded, it will be ignored, even if it included.

**Example**

To match events with message starting with `Back-off`, use the following constraint:

```yaml
event:
  message:
    include:
      - "^Back-off.*" # match all events with message starting with `Back-off`
    exclude: []
```

To match all events except those with message starting with `Back-off`, use the following constraint:

```yaml
event:
  message:
    include:
      - ".*" # match all event messages...
    exclude:
      - "^Back-off.*" # ...except those starting with `Back-off`
```

#### Recommendations

You can configure recommendations related to Kubernetes resources. Recommendations respect [namespaces](#namespaces) constraint regex patterns.

Currently, Kubernetes source plugin can send recommendation about 2 resources: `Pods` and `Ingresses`.

**Example**

In order to send recommendation for the Pods that have containers with `latest` tag or the Pods without labels, use the following configuration.

```yaml
recommendations:
  # Recommendations for Pod Kubernetes resource.
  pod:
    # If true, notifies about Pod containers that use `latest` tag for images.
    noLatestImageTag: true
    # If true, notifies about Pod resources created without labels.
    labelsSet: true
```

If you want to receive recommendations for Ingress that contains invalid backend service definition or TLS secret, use the following configuration.

```yaml
recommendations:
  # Recommendations for Ingress Kubernetes resource.
  ingress:
    # If true, notifies about Ingress resources with invalid backend service reference.
    backendServiceValid: true
    # If true, notifies about Ingress resources with invalid TLS secret reference.
    tlsSecretValid: true
```

#### Filters

The filter configuration allows you to configure filters which are used for all processed Kubernetes events.

```yaml
# Filter settings for various sources.
# Currently, all filters are globally enabled or disabled.
# You can enable or disable filters with `@Botkube filters` commands.
filters:
  kubernetes:
    # If true, enables support for `botkube.io/disable` resource annotations.
    objectAnnotationChecker: true
    # If true, filters out Node-related events that are not important.
    nodeEventsChecker: true
```

### Syntax

This plugin supports the following configuration:

```yaml
# Describes configuration for various recommendation insights.
recommendations:
  # Recommendations for Pod Kubernetes resource.
  pod:
    # If true, notifies about Pod containers that use `latest` tag for images.
    noLatestImageTag: true
    # If true, notifies about Pod resources created without labels.
    labelsSet: true
  # Recommendations for Ingress Kubernetes resource.
  ingress:
    # If true, notifies about Ingress resources with invalid backend service reference.
    backendServiceValid: true
    # If true, notifies about Ingress resources with invalid TLS secret reference.
    tlsSecretValid: true

# Filter settings for various sources.
filters:
  # If true, enables support for `botkube.io/disable` resource annotation.
  objectAnnotationChecker: true
  # If true, filters out Node-related events that are not important.
  nodeEventsChecker: true
# Describes namespaces for every Kubernetes resources you want to watch or exclude.
# These namespaces are applied to every resource specified in the resources list.
# However, every specified resource can override this by using its own namespaces object.
namespaces: &k8s-events-namespaces
  # Include contains a list of allowed Namespaces.
  # It can also contain regex expressions:
  #  `- ".*"` - to specify all Namespaces.
  include:
    - ".*"
  # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
  # It can also contain regex expressions:
  #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
  # Exclude list is checked before the Include list.
  # exclude: []

# Describes event constraints for Kubernetes resources.
# These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
event:
  # Lists all event types to be watched.
  types:
    - create
    - delete
    - error
  # Optional list of exact values or regex patterns to filter events by event reason.
  # Skipped, if both include/exclude lists are empty.
  reason:
    # Include contains a list of allowed values. It can also contain regex expressions.
    include: []
    # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
    # Exclude list is checked before the Include list.
    exclude: []
  # Optional list of exact values or regex patterns to filter event by event message. Skipped, if both include/exclude lists are empty.
  # If a given event has multiple messages, it is considered a match if any of the messages match the constraints.
  message:
    # Include contains a list of allowed values. It can also contain regex expressions.
    include: []
    # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
    # Exclude list is checked before the Include list.
    exclude: []

# Filters Kubernetes resources to watch by annotations. Each resource needs to have all the specified annotations.
# Regex expressions are not supported.
annotations: {}
# Filters Kubernetes resources to watch by labels. Each resource needs to have all the specified labels.
# Regex expressions are not supported.
labels: {}

# Describes the Kubernetes resources to watch.
# Resources are identified by its type in `{group}/{version}/{kind (plural)}` format. Examples: `apps/v1/deployments`, `v1/pods`.
# Each resource can override the namespaces and event configuration by using dedicated `event` and `namespaces` field.
# Also, each resource can specify its own `annotations`, `labels` and `name` regex.
resources:
  - type: v1/pods
  #          namespaces:             # Overrides 'source'.kubernetes.namespaces
  #            include:
  #              - ".*"
  #            exclude: []
  #          annotations: {}         # Overrides 'source'.kubernetes.annotations
  #          labels: {}              # Overrides 'source'.kubernetes.labels
  #          # Optional resource name constraints.
  #          name:
  #            # Include contains a list of allowed values. It can also contain regex expressions.
  #            include: []
  #            # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
  #            # Exclude list is checked before the Include list.
  #            exclude: []
  #          event:
  #            # Overrides 'source'.kubernetes.event.reason
  #            reason:
  #              include: []
  #              exclude: []
  #            # Overrides 'source'.kubernetes.event.message
  #            message:
  #              include: []
  #              exclude: []
  #            # Overrides 'source'.kubernetes.event.types
  #            types:
  #              - create

  - type: v1/services
  - type: networking.k8s.io/v1/ingresses
  - type: v1/nodes
    event:
      message:
        exclude:
          - ".*nf_conntrack_buckets.*" # Ignore node related noisy messages from GKE clusters
  - type: v1/namespaces
  - type: v1/persistentvolumes
  - type: v1/persistentvolumeclaims
  - type: v1/configmaps
  - type: rbac.authorization.k8s.io/v1/roles
  - type: rbac.authorization.k8s.io/v1/rolebindings
  - type: rbac.authorization.k8s.io/v1/clusterrolebindings
  - type: rbac.authorization.k8s.io/v1/clusterroles
  - type: apps/v1/daemonsets
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.numberReady
  - type: batch/v1/jobs
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.conditions[*].type
  - type: apps/v1/deployments
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.availableReplicas
  - type: apps/v1/statefulsets
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.readyReplicas
commands:
  # Configures which verbs are available in actionable items.
  verbs: ["api-resources", "api-versions", "cluster-info", "describe", "explain", "get", "logs", "top"]
  # Configure which resources are available in actionable items.
  resources:
    - "deployments"
    - "pods"
    - "namespaces"
    - "daemonsets"
    - "statefulsets"
    - "storageclasses"
    - "nodes"
    - "configmaps"
    - "services"
    - "ingresses"
# Define extra buttons to be displayed beside the actionable notification message.
extraButtons:
  - enabled: false
    trigger:
      type: ["error"]
    button:
      displayName: "Describe"
      commandTpl: "kubectl describe {{ Kind | lower }}{{ if .Namespace }} -n {{ .Namespace }}{{ end }} {{ .Name }}"
# Logger configuration
log:
  level: info
  disableColors: false
```

### Examples

This section lists all examples for Kubernetes source plugin.

#### Recommendation events only

```yaml
# Describes configuration for various recommendation insights.
recommendations:
  # Recommendations for Pod Kubernetes resource.
  pod:
    # If true, notifies about Pod containers that use `latest` tag for images.
    noLatestImageTag: true
    # If true, notifies about Pod resources created without labels.
    labelsSet: true
  # Recommendations for Ingress Kubernetes resource.
  ingress:
    # If true, notifies about Ingress resources with invalid backend service reference.
    backendServiceValid: true
    # If true, notifies about Ingress resources with invalid TLS secret reference.
    tlsSecretValid: true
```

#### All events

```yaml
# Logging configuration
log:
  # Log level
  level: info
# Describes namespaces for every Kubernetes resources you want to watch or exclude.
# These namespaces are applied to every resource specified in the resources list.
# However, every specified resource can override this by using its own namespaces object.
namespaces:
  # Include contains a list of allowed Namespaces.
  # It can also contain regex expressions:
  #  `- ".*"` - to specify all Namespaces.
  include:
    - ".*"
  # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
  # It can also contain regex expressions:
  #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
  # Exclude list is checked before the Include list.
  # exclude: []

# Describes event constraints for Kubernetes resources.
# These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
event:
  # Lists all event types to be watched.
  types:
    - create
    - delete
    - error
  # Optional list of exact values or regex patterns to filter events by event reason.
  # Skipped, if both include/exclude lists are empty.
  reason:
    # Include contains a list of allowed values. It can also contain regex expressions.
    include: []
    # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
    # Exclude list is checked before the Include list.
    exclude: []
  # Optional list of exact values or regex patterns to filter event by event message. Skipped, if both include/exclude lists are empty.
  # If a given event has multiple messages, it is considered a match if any of the messages match the constraints.
  message:
    # Include contains a list of allowed values. It can also contain regex expressions.
    include: []
    # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
    # Exclude list is checked before the Include list.
    exclude: []

# Filters Kubernetes resources to watch by annotations. Each resource needs to have all the specified annotations.
# Regex expressions are not supported.
annotations: {}
# Filters Kubernetes resources to watch by labels. Each resource needs to have all the specified labels.
# Regex expressions are not supported.
labels: {}

# Describes the Kubernetes resources to watch.
# Resources are identified by its type in `{group}/{version}/{kind (plural)}` format. Examples: `apps/v1/deployments`, `v1/pods`.
# Each resource can override the namespaces and event configuration by using dedicated `event` and `namespaces` field.
# Also, each resource can specify its own `annotations`, `labels` and `name` regex.
# See the `values.yaml` file for full object.
resources:
  - type: v1/pods
  #          namespaces:             # Overrides 'source'.kubernetes.namespaces
  #            include:
  #              - ".*"
  #            exclude: []
  #          annotations: {}         # Overrides 'source'.kubernetes.annotations
  #          labels: {}              # Overrides 'source'.kubernetes.labels
  #          # Optional resource name constraints.
  #          name:
  #            # Include contains a list of allowed values. It can also contain regex expressions.
  #            include: []
  #            # Exclude contains a list of values to be ignored even if allowed by Include. It can also contain regex expressions.
  #            # Exclude list is checked before the Include list.
  #            exclude: []
  #          event:
  #            # Overrides 'source'.kubernetes.event.reason
  #            reason:
  #              include: []
  #              exclude: []
  #            # Overrides 'source'.kubernetes.event.message
  #            message:
  #              include: []
  #              exclude: []
  #            # Overrides 'source'.kubernetes.event.types
  #            types:
  #              - create

  - type: v1/services
  - type: networking.k8s.io/v1/ingresses
  - type: v1/nodes
  - type: v1/namespaces
  - type: v1/persistentvolumes
  - type: v1/persistentvolumeclaims
  - type: v1/configmaps
  - type: rbac.authorization.k8s.io/v1/roles
  - type: rbac.authorization.k8s.io/v1/rolebindings
  - type: rbac.authorization.k8s.io/v1/clusterrolebindings
  - type: rbac.authorization.k8s.io/v1/clusterroles
  - type: apps/v1/daemonsets
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.numberReady
  - type: batch/v1/jobs
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.conditions[*].type
  - type: apps/v1/deployments
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.availableReplicas
  - type: apps/v1/statefulsets
    event: # Overrides 'source'.kubernetes.event
      types:
        - create
        - update
        - delete
        - error
    updateSetting:
      includeDiff: true
      fields:
        - spec.template.spec.containers[*].image
        - status.readyReplicas
  ## Custom resource example
  # - type: velero.io/v1/backups
  #   namespaces:
  #     include:
  #       - ".*"
  #     exclude:
  #       -
  #   event:
  #     types:
  #       - create
  #       - update
  #       - delete
  #       - error
  #   updateSetting:
  #     includeDiff: true
  #     fields:
  #       - status.phase
# List of available commands that can be used in actionable items under kubernetes events.
commands:
  # Configures which verbs are available in actionable items.
  verbs: ["api-resources", "api-versions", "cluster-info", "describe", "explain", "get", "logs", "top"]
  # Configure which resources are available in actionable items.
  resources:
    [
      "deployments",
      "pods",
      "namespaces",
      "daemonsets",
      "statefulsets",
      "storageclasses",
      "nodes",
      "configmaps",
      "services",
      "ingresses",
    ]
# Filter settings for various sources.
# Currently, all filters are globally enabled or disabled.
# You can enable or disable filters with `@Botkube enable/disable filters` commands.
filters:
  kubernetes:
    # If true, enables support for `botkube.io/disable` resource annotations.
    objectAnnotationChecker: true
    # If true, filters out Node-related events that are not important.
    nodeEventsChecker: true
```

#### Error events

```yaml
# Describes namespaces for every Kubernetes resources you want to watch or exclude.
# These namespaces are applied to every resource specified in the resources list.
# However, every specified resource can override this by using its own namespaces object.
namespaces:
  # Include contains a list of allowed Namespaces.
  # It can also contain regex expressions:
  #  `- ".*"` - to specify all Namespaces.
  include:
    - ".*"
  # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
  # It can also contain regex expressions:
  #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
  # Exclude list is checked before the Include list.
  # exclude: []

# Describes event constraints for Kubernetes resources.
# These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
event:
  # Lists all event types to be watched.
  types:
    - error

# Describes the Kubernetes resources you want to watch.
# See the `values.yaml` file for full object.
resources:
  - type: v1/pods
  - type: v1/services
  - type: networking.k8s.io/v1/ingresses
  - type: v1/nodes
  - type: v1/namespaces
  - type: v1/persistentvolumes
  - type: v1/persistentvolumeclaims
  - type: v1/configmaps
  - type: rbac.authorization.k8s.io/v1/roles
  - type: rbac.authorization.k8s.io/v1/rolebindings
  - type: rbac.authorization.k8s.io/v1/clusterrolebindings
  - type: rbac.authorization.k8s.io/v1/clusterroles
  - type: apps/v1/deployments
  - type: apps/v1/statefulsets
  - type: apps/v1/daemonsets
  - type: batch/v1/jobs
```

#### Error events for resources with logs

Useful together with the [logs automated action](../features/automated-actions.md#predefined-actions).

```yaml
# Describes namespaces for every Kubernetes resources you want to watch or exclude.
# These namespaces are applied to every resource specified in the resources list.
# However, every specified resource can override this by using its own namespaces object.
namespaces:
  # Include contains a list of allowed Namespaces.
  # It can also contain regex expressions:
  #  `- ".*"` - to specify all Namespaces.
  include:
    - ".*"
  # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
  # It can also contain regex expressions:
  #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
  # Exclude list is checked before the Include list.
  # exclude: []

# Describes event constraints for Kubernetes resources.
# These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
event:
  # Lists all event types to be watched.
  types:
    - error

# Describes the Kubernetes resources you want to watch.
# See the `values.yaml` file for full object.
resources:
  - type: v1/pods
  - type: apps/v1/deployments
  - type: apps/v1/statefulsets
  - type: apps/v1/daemonsets
  - type: batch/v1/jobs
  # `apps/v1/replicasets` excluded on purpose - to not show logs twice for a given higher-level resource (e.g. Deployment)
```

#### Create events

```yaml
# Describes namespaces for every Kubernetes resources you want to watch or exclude.
# These namespaces are applied to every resource specified in the resources list.
# However, every specified resource can override this by using its own namespaces object.
namespaces:
  # Include contains a list of allowed Namespaces.
  # It can also contain regex expressions:
  #  `- ".*"` - to specify all Namespaces.
  include:
    - ".*"
  # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
  # It can also contain regex expressions:
  #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
  # Exclude list is checked before the Include list.
  # exclude: []
# Describes event constraints for Kubernetes resources.
# These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
event:
# Lists all event types to be watched.
types:
  - create

# Describes the Kubernetes resources you want to watch.
# See the `values.yaml` file for full object.
resources:
  - type: v1/pods
  - type: v1/services
  - type: networking.k8s.io/v1/ingresses
  - type: v1/nodes
  - type: v1/namespaces
  - type: v1/configmaps
  - type: apps/v1/deployments
  - type: apps/v1/statefulsets
  - type: apps/v1/daemonsets
  - type: batch/v1/jobs
```

## Implementation details

Kubernetes source plugin uses [Kubernetes Informers](https://pkg.go.dev/k8s.io/client-go/informers) to get Kubernetes events in real-time. As the informer's synchronized data is cached in-memory and, in some cases, might take a significant amount of memory, Kubernetes plugin comes with memory usage optimization.

During startup, the plugin loads all Kubernetes source configurations and groups them by different Kubeconfigs. For each group, the plugin creates shared informers (`SharedInformerFactory`) and starts them in parallel in goroutines.

As there are less background processes than actual Kubernetes source configurations, the plugin takes the very first source configuration (sorted alphabetically) as the "system" one.
Then, the `log` and `informerResyncPeriod` configuration properties are used for all background processes except actual event handling.

For more details, see the [Kubernetes plugin source code](https://github.com/kubeshop/botkube/blob/main/cmd/source/kubernetes/main.go).
