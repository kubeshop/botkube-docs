---
id: argocd
title: ArgoCD
sidebar_position: 5
---

ArgoCD source plugin sends events from ArgoCD to configured communication platforms. During startup, the plugin configures ArgoCD webhooks, triggers, templates and subscriptions based on the [ArgoCD Notification Catalog](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/catalog/).
It uses native [ArgoCD notifications](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/) configuration to send the events to Botkube communication platforms.

The plugin is hosted in the official Botkube plugin repository. To enable the GitHub plugin, ensure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.4.0/plugins-index.yaml
```

## Prerequisite elevated RBAC permissions

ArgoCD plugin requires specific RBAC permissions. If you use Botkube self-hosted installation in version 1.4.1 or newer, you can create them during Botkube install/upgrade by specifying `--set="rbac.groups.argocd.create=true"` override.

However, you can also create them manually:

```shell
cat > /tmp/argocd-rbac.yaml << ENDOFFILE
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argocd
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "update"]
  - apiGroups: ["argoproj.io"]
    resources: ["applications"]
    verbs: ["get", "patch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argocd
subjects:
- kind: Group
  name: argocd
  apiGroup: rbac.authorization.k8s.io
ENDOFFILE

kubectl apply -f /tmp/argocd-rbac.yaml
```

Next, use the `argocd` group in the plugin RBAC configuration:

```yaml
"argocd":
  botkube/argocd:
    enabled: true
    config:
      # ...
    context:
      rbac:
        group:
          type: Static
          static:
            values: ["argocd"]
```

## Enabling plugin

:::note
In order to enable the plugin, ArgoCD has to be already installed on the cluster and all watched Applications need to be created.

Also, remember to create RBAC resources for the plugin. See the [Elevated RBAC permissions required](#elevated-rbac-permissions-required)) section.
:::

To enable the ArgoCD plugin and watch a single ArgoCD Application named `guestbook` in `argocd` Namespace, add the following flag to the Botkube [`install` command](../../cli/commands/botkube_install.md):

```sh
--set 'sources.argocd.botkube/argocd.enabled'=true \
--set='rbac.groups.argocd.create'=true \ # flag available in Botkube 1.4.1+
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[0].name'=guestbook \
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[0].namespace'=argocd
```

You can watch multiple ArgoCD Applications by specifying `config.defaultSubscriptions.applications[n]` values, such as:

```sh
--set 'sources.argocd.botkube/argocd.enabled'=true  \
--set='rbac.groups.argocd.create'=true \ # flag available in Botkube 1.4.1+
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[0].name'=first-app \
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[0].namespace'=first-app-ns \
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[1].name'=second-app \
--set 'sources.argocd.botkube/argocd.config.defaultSubscriptions.applications[1].namespace'=second-app-ns
```

## Syntax

### Basic configuration

This section lists all basic configuration options for the ArgoCD source plugin. The ArgoCD notification config is created automatically during plugin startup and uses triggers and templates based on the [ArgoCD Notification Catalog](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/catalog/).

```yaml
sources:
  "argocd":
    botkube/argocd:
      enabled: true
      context:
        rbac:
          group:
            type: Static
            static:
              values: ["argocd"]
      # Config contains configuration for ArgoCD source plugin.
      # This section lists only basic options, and uses default triggers and templates
      # which are based on ArgoCD Notification Catalog ones (https://github.com/argoproj/argo-cd/blob/master/notifications_catalog/install.yaml).
      # Advanced customization (including triggers and templates) is described in the documentation.
      config:
        defaultSubscriptions:
          # -- Provide application name and namespace to subscribe to all events for a given application.
          applications:
            - name: "guestbook"
              namespace: "argocd"
        argoCD:
          # ArgoCD UI base URL. It is used for generating links in the incoming events.
          uiBaseUrl: http://localhost:8080
          # ArgoCD Notifications ConfigMap reference.
          notificationsConfigMap:
            name: argocd-notifications-cm
            namespace: argocd
```

### Advanced configuration

You can customize all triggers, templates, webhook registration and more. For advanced properties, see the [`default-config.yaml`](https://github.com/kubeshop/botkube/blob/main/internal/source/argocd/default-config.yaml) file.
