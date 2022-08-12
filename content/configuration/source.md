---
menutitle: "Source"
title: "Source"
weight: 23
---

The source settings contains:
- Resource list you want to watch,
- Namespaces you want to filter,
- The type of events you want to get notifications about,
- Settings to monitor updates for the specific resource fields,
- Ability to turn on/off specific recommendations per a given source.

Sources are bound to specific channels in the communications configuration. To learn more, read the [Source and Executor Bindings](/configuration/communication/#source-and-executor-bindings) section.

## Recommendations

For every source you can configure recommendations related to Kubernetes resources. The full recommendation configuration is as follows:

```yaml
kubernetes:

  # ... trimmed ...

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

### Merging strategy

If multiple source bindings are specified for a given communication channel, the recommendations are merged. If any bound source has a given recommendation enabled, it is enabled for the channel.

Consider the following example source configuration:

```yaml
sources:
  'first-source':
    kubernetes:
      # ... trimmed ...
      recommendations:
        pod:
          noLatestImageTag: false
          labelsSet: true
        ingress:
          backendServiceValid: true
          tlsSecretValid: true
  'second-source':
    kubernetes:
      # ... trimmed ...
      recommendations:
        pod:
          noLatestImageTag: false
          labelsSet: true
        ingress:
          backendServiceValid: false
          tlsSecretValid: true
```

And the following source bindings:

```yaml
communications:
    'default-group':
        slack:
            # ... trimmed ...
            channels:
                'random':
                    name: "random"
                    # ... trimmed ...
                    bindings:
                        # ... trimmed ...
                        sources:
                            - first-source
                            - second-source
```

In a result, for the `random` channel, the merged recommendation configuration is as follows:

```yaml
recommendations:
    pod:
        noLatestImageTag: false # none of the sources has this property set to true
        labelsSet: true
    ingress:
        backendServiceValid: true
        tlsSecretValid: true
```

## Syntax

```yaml
# Map of sources. Source contains configuration for Kubernetes events and sending recommendations.
# The property name under `sources` object is an alias for a given configuration. You can define multiple sources configuration with different names.
# Key name is used as a binding reference.
#
# Format: sources.<alias>
sources:
  'k8s-events':

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

      # Describes the Kubernetes resources you want to watch.
      resources:
        - name: v1/pods             # Name of the resource. Resource name must be in group/version/resource (G/V/R) format
                                    # resource name should be plural (e.g apps/v1/deployments, v1/pods)

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
          events:                   # List of lifecycle events you want to receive, e.g create, update, delete, error OR all
            - create
            - delete
            - error
        - name: v1/services
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: apps/v1/deployments
          namespaces:
            include:
              - ".*"
          events:
            - create
            - update
            - delete
            - error
          updateSetting:
            includeDiff: true
            fields:
              - spec.template.spec.containers[*].image
              - status.availableReplicas
        - name: apps/v1/statefulsets
          namespaces:
            include:
              - ".*"
          events:
            - create
            - update
            - delete
            - error
          updateSetting:
            includeDiff: true
            fields:
              - spec.template.spec.containers[*].image
              - status.readyReplicas
        - name: networking.k8s.io/v1/ingresses
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: v1/nodes
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: v1/namespaces
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: v1/persistentvolumes
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: v1/persistentvolumeclaims
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: v1/configmaps
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: apps/v1/daemonsets
          namespaces:
            include:
              - ".*"
          events:
            - create
            - update
            - delete
            - error
          updateSetting:
            includeDiff: true
            fields:
              - spec.template.spec.containers[*].image
              - status.numberReady
        - name: batch/v1/jobs
          namespaces:
            include:
              - ".*"
          events:
            - create
            - update
            - delete
            - error
          updateSetting:
            includeDiff: true
            fields:
              - spec.template.spec.containers[*].image
              - status.conditions[*].type
        - name: rbac.authorization.k8s.io/v1/roles
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: rbac.authorization.k8s.io/v1/rolebindings
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: rbac.authorization.k8s.io/v1/clusterrolebindings
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
        - name: rbac.authorization.k8s.io/v1/clusterroles
          namespaces:
            include:
              - ".*"
          events:
            - create
            - delete
            - error
       ## Custom resource example
       # - name: velero.io/v1/backups
       #   namespaces:
       #     include:
       #       - ".*"
       #   events:
       #     - create
       #     - update
       #     - delete
       #     - error
       #   updateSetting:
       #     includeDiff: true
       #     fields:
       #       - status.phase
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
