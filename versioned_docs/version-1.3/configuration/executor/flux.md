---
id: flux
title: Flux
sidebar_position: 6
---

The Botkube Flux executor plugin allows you to run the [`flux`](https://fluxcd.io/) CLI commands directly within the chat window of your chosen communication platform.

The Flux plugin is hosted in the official Botkube plugin repository. To enable the Flux plugin, ensure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.3.0/plugins-index.yaml
```

## Enabling plugin

To enable the GitHub plugin, add the following flag to the Botkube [`install` command](../../cli/commands/botkube_install.md):

```sh
--set 'executors.flux.botkube/flux.enabled'=true
```

The Flux plugin comes with integrated GitHub support. To enable it, you'll need a valid [GitHub token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token). Set the token using the following command:

```sh
--set 'executors.flux.botkube/flux.config.github.auth.accessToken=<GitHub token>'
```

By default, the Flux plugin has read-only access. To perform actions like creating or deleting Flux-related sources, you'll need to customize the [RBAC](../rbac.md#configuration).

## Plugin Configuration Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  flux:
    botkube/flux:
      enabled: false
      config:
        github:
          auth:
            # GitHub access token.
            # Instructions for token creation: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token.
            # Lack of token may limit functionality, e.g., adding comments to pull requests or approving them.
            accessToken: ""
        log:
          level: "info"
```

For the default Helm chart configuration, refer to the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
