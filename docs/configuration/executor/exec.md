---
id: exec
title: Exec
sidebar_position: 4
---

The `exec` executor plugin allows you to install and run CLI applications directly from chat (e.g., Slack, Discord, or Mattermost) without any hassle.

The `exec` plugin is hosted by the official Botkube plugin repository. To enable the `exec` plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.1.1/plugins-index.yaml
```

## Enabling plugin

To enable `exec` plugin, add `--set 'executors.bins-management.botkube/exec=true'` to a given Helm install command. By default, the read-only `KUBECONFIG` is assigned.

For enabling commands that require create, update or delete rules, you need to create specific (Cluster)Role and (Cluster)RoleBinding and reference it from plugin's `context` configuration. To learn more refer to the [RBAC section](../rbac.md).

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  bins-management:
    # Exec executor configuration.
    # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
    botkube/exec:
      enabled: false
      # Custom Exec plugin configuration.
      config:
        # An array of templates that define how to convert the command output into an interactive message.
        templates:
          # Link to templates source
          # It uses the go-getter library, which supports multiple URL formats (such as HTTP, Git repositories, or S3) and is able to unpack archives.
          # For more details, see the documentation at https://github.com/hashicorp/go-getter.
          - ref: github.com/kubeshop/botkube//cmd/executor/exec/templates?ref=main
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
