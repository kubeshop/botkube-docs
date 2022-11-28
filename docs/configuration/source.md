---
id: source
title: Source
sidebar_position: 3
---

The source settings contains:

- Resource list you want to watch,
- Namespaces you want to filter,
- The type of events you want to get notifications about,
- Settings to monitor updates for the specific resource fields,
- Ability to turn on/off specific recommendations per a given source.

Sources are bound to specific channels in the communications configuration. To learn more, read the [Source and Executor Bindings](./communication/#source-and-executor-bindings) section.

## Kubernetes resource events

A Kubernetes source produces events for configured Kubernetes resources. These events can be sent to communication channels or actions. To learn how to bind sources to communication channels or actions, read the [Communication](./communication/index.md) and [Action](./action.md) documents.

### Event and resource constraints

Define constraints for Kubernetes events to narrow down the events you want to receive.

You can define both global constraints, that are applied to all resources within a given source, and also resource-specific constraints, which override global constraints. See the [Syntax](#syntax) paragraph for more details.

There are the following types of constraints:

- `namespaces` - Include and/or exclude namespaces to watch. You can use regex expressions to specify namespaces.

  **Example**

  ```yaml
  namespaces:
    include:
      - ".*" # include all...
    exclude:
      - "testing-.*" # ...except any namespace that has `testing-` prefix
  ```

- `labels` - Specify exact match for resource labels. The watched resources must have all the specified labels.

  **Example**

  ```yaml
  labels: # Match only the resources that have all the specified labels
    app: "my-app"
    environment: "production"
  ```

- `annotations` - Specify exact match for resource annotations. The watched resources must have all the specified annotations.

  **Example**

  ```yaml
  annotations: # Match only the resources that have all the specified annotations.
    app: "my-app"
    my-annotation: "true"
  ```

- `name` - Regex expression to match the resource name. If empty, all resource names are matched.

  **Example**

  ```yaml
  name: "testing-.*" # match resource names that have `testing-` prefix
  ```

  This constraint can be set per resource only. See the [Syntax](#syntax) paragraph for more details.

- `event.types` - List all event types to watch.

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

- `event.reason` - Define regex expression to match the event reason. If empty, all events are watched.

  **Example**

  ```yaml
  event:
    reason: "^BackOff$" # match events with reason equal to `BackOff`
  ```

- `event.message` - Define regex expression to match the event message. If empty, all event messages are matched.

  **Example**

  ```yaml
  event:
    message: "^Back-off.*" # match all events with message starting with `Back-off`
  ```

### Merging strategy

When a channel binds to more than one source, the resource notifications are merged across all sources.

Let's say you have a resource defined in more than one source but wired with different events and namespaces.

```yaml
sources:
  "k8s-events":
    kubernetes:
      resources:
        - type: v1/configmaps
          namespaces:
            include:
              - (botk.*|default)
          event:
            types:
              - create
              - update
              - delete
  "k8s-updates":
    kubernetes:
      resources:
        - type: v1/configmaps
          namespaces:
            include:
              - botkube
          event:
            types:
              - update
```

The bound channel `monitor-config` (below) will notify on the merged events and namespaces across all resource/source definitions.

```yaml
communications:
  "default-group":
    slack:
      # ... trimmed ...
      channels:
        "monitor-config":
          name: "monitor-config"
          # ... trimmed ...
          bindings:
            # ... trimmed ...
            sources:
              - k8s-events
              - k8s-updates
```

Meaning, channel `monitor-config` will receive notifications for `v1/configmaps` events matching,

- the `botk.*|default` and `botkube` namespaces.
- the `create`, `delete` and `update` event types.

## Recommendations

For every source, you can configure recommendations related to Kubernetes resources.

### Merging Strategy

Recommendations take a different approach from the [Kubernetes resource events merge strategy](#kubernetes-resource-events).

If multiple source bindings are specified for a given communication channel, the recommendations are merged with an override strategy. The order of bindings here is important, as it affects the final values of properties. The priority is given to the last binding specified on the list.

Consider the following example source configuration:

```yaml
sources:
  "first-source":
    kubernetes:
      # ... trimmed ...
      recommendations:
        pod:
          labelsSet: true
          noLatestImageTag: false
        ingress:
          backendServiceValid: false
  "second-source":
    kubernetes:
      # ... trimmed ...
      recommendations:
        pod:
          noLatestImageTag: true
        ingress:
          backendServiceValid: false
          tlsSecretValid: true
  "third-source":
    kubernetes:
      # ... trimmed ...
      recommendations:
        pod:
          noLatestImageTag: false
        ingress:
          backendServiceValid: true
```

And the following source bindings:

```yaml
communications:
  "default-group":
    slack:
      # ... trimmed ...
      channels:
        "random":
          name: "random"
          # ... trimmed ...
          bindings:
            # ... trimmed ...
            sources:
              - first-source
              - second-source
              - third-source
```

In a result, for the `random` channel, the merged recommendation configuration is as follows:

```yaml
recommendations:
  pod:
    noLatestImageTag: false # set in `first-source`, overriden in `third-source` with the same value
    labelsSet: true # set to `true` in `first-source`, other sources didn't specify its value
  ingress:
    backendServiceValid: true # set in `first-source` and `second-source` to `false`, overriden in `third-source` to `true`
    tlsSecretValid: true # set in `second-source`
```

## Syntax

```yaml
# Map of sources. Source contains configuration for Kubernetes events and sending recommendations.
# The property name under `sources` object is an alias for a given configuration. You can define multiple sources configuration with different names.
# Key name is used as a binding reference.
#
# Format: sources.{alias}
sources:
  "k8s-recommendation-events":
    displayName: "Kubernetes Recommendations"
    # Describes Kubernetes source configuration.
    kubernetes:
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

  "k8s-all-events":
    displayName: "Kubernetes Info"
    # Describes Kubernetes source configuration.
    kubernetes:
      # Describes namespaces for every Kubernetes resources you want to watch or exclude.
      # These namespaces are applied to every resource specified in the resources list.
      # However, every specified resource can override this by using its own namespaces object.
      namespaces: &k8s-events-namespaces
        # Include contains a list of allowed Namespaces.
        # It can also contain a regex expressions:
        #  `- ".*"` - to specify all Namespaces.
        include:
          - ".*"
        # Exclude contains a list of Namespaces to be ignored even if allowed by Include.
        # It can also contain a regex expressions:
        #  `- "test-.*"` - to specif all Namespaces with `test-` prefix.
        # exclude: []

      # Describes event constraints for Kubernetes resources.
      # These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
      event:
        # Lists all event types to be watched.
        types:
          - create
          - delete
          - error
        # Optional regex to filter events by event reason.
        reason: ""
        # Optional regex to filter events by message. If a given event has multiple messages, it is considered a match if any of the messages match the regex.
        message: ""

      # Filters Kubernetes resources to watch by annotations.
      annotations: {}
      # Filters Kubernetes resources to watch by labels.
      labels: {}

      # Describes the Kubernetes resources to watch.
      # Resources are identified by its type in `{group}/{version}/{kind (plural)}` format. Examples: `apps/v1/deployments`, `v1/pods`.
      # Each resource can override the namespaces and event configuration by using dedicated `event` and `namespaces` field.
      # Also, each resource can specify its own `annotations`, `labels` and `name` regex.
      resources:
        - type: v1/pods
        #  namespaces:             # Overrides 'source'.kubernetes.namespaces
        #    include:
        #      - ".*"
        #    exclude: []
        #  annotations: {}         # Overrides 'source'.kubernetes.annotations
        #  labels: {}              # Overrides 'source'.kubernetes.labels
        #  name: "" # Optional resource name regex.
        #  event:
        #    reason: ""            # Overrides 'source'.kubernetes.event.reason
        #    message: ""           # Overrides 'source'.kubernetes.event.message
        #    types:                # Overrides 'source'.kubernetes.event.types
        #      - create

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

  "k8s-err-events":
    displayName: "Kubernetes Errors"

    # Describes Kubernetes source configuration.
    kubernetes:
      # Describes namespaces for every Kubernetes resources you want to watch or exclude.
      # These namespaces are applied to every resource specified in the resources list.
      # However, every specified resource can override this by using its own namespaces object.
      namespaces: *k8s-events-namespaces

      # Describes event constraints for Kubernetes resources.
      # These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
      event:
        # Lists all event types to be watched.
        types:
          - error

      # Describes the Kubernetes resources you want to watch.
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

  "k8s-err-with-logs-events":
    displayName: "Kubernetes Errors for resources with logs"

    # Describes Kubernetes source configuration.
    kubernetes:
      # Describes namespaces for every Kubernetes resources you want to watch or exclude.
      # These namespaces are applied to every resource specified in the resources list.
      # However, every specified resource can override this by using its own namespaces object.
      namespaces: *k8s-events-namespaces

      # Describes event constraints for Kubernetes resources.
      # These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
      event:
        # Lists all event types to be watched.
        types:
          - error

      # Describes the Kubernetes resources you want to watch.
      resources:
        - type: v1/pods
        - type: apps/v1/deployments
        - type: apps/v1/statefulsets
        - type: apps/v1/daemonsets
        - type: batch/v1/jobs
        # `apps/v1/replicasets` excluded on purpose - to not show logs twice for a given higher-level resource (e.g. Deployment)

  "k8s-create-events":
    displayName: "Kubernetes Resource Created Events"

    # Describes Kubernetes source configuration.
    kubernetes:
      # Describes namespaces for every Kubernetes resources you want to watch or exclude.
      # These namespaces are applied to every resource specified in the resources list.
      # However, every specified resource can override this by using its own namespaces object.
      namespaces: *k8s-events-namespaces

      # Describes event constraints for Kubernetes resources.
      # These constraints are applied for every resource specified in the `resources` list, unless they are overridden by the resource's own `events` object.
      event:
        # Lists all event types to be watched.
        types:
          - create

      # Describes the Kubernetes resources you want to watch.
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

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
