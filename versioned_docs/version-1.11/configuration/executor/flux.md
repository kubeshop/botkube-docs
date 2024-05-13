---
id: flux
title: Flux
sidebar_position: 6
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

The Botkube Flux executor plugin allows you to run the [`flux`](https://fluxcd.io/) CLI commands directly within the chat window of your chosen communication platform.

The Flux plugin is hosted by the Botkube Cloud plugin repository and requires active Botkube Cloud account.

## Prerequisite elevated RBAC permissions

One of the plugin capabilities is the `flux diff` command. To use it, you need to update the Flux plugin RBAC configuration. This is necessary because the command performs a server-side dry run that requires patch permissions, as specified in the [Kubernetes documentation](https://kubernetes.io/docs/reference/using-api/api-concepts/#dry-run-authorization).

First, create RBAC resources on your cluster:

```shell
cat > /tmp/flux-rbac.yaml << ENDOFFILE
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: flux
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["get", "watch", "list", "patch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: flux
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: flux
subjects:
- kind: Group
  name: flux
  apiGroup: rbac.authorization.k8s.io
ENDOFFILE

kubectl apply -f /tmp/flux-rbac.yaml
```

Next, use the `flux` group in the plugin RBAC configuration:

![Flux RBAC](./assets/flux-rbac.png)

## Enabling plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../../installation/index.mdx) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Flux plugin.
6. Click **Configure** button and then **Configuration as Code** tab.
7. Configure optional GitHub access token.

The Flux plugin comes with integrated GitHub support. To enable it, you'll need a valid [GitHub token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token). Set the token with the following configuration:

```yaml
github:
  auth:
    accessToken: "" # your GitHub access token
```

6. Click **Save** button.

By default, the Flux plugin has read-only access. To perform actions like creating or deleting Flux-related sources, you'll need to customize the [RBAC](../rbac.md#configuration).

## Configuration Syntax

The plugin supports the following configuration:

```yaml
github:
  auth:
    # GitHub access token.
    # Instructions for token creation: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token.
    # Lack of token may limit functionality, e.g., adding comments to pull requests or approving them.
    accessToken: ""
log:
  level: "info"
```
