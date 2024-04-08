---
id: helm
title: Helm
sidebar_position: 3
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

The Botkube Helm executor plugin allows you to run the `helm` command directly in the chat window of each communication platform.

The Helm plugin is hosted by the Botkube Cloud plugin repository and requires active Botkube Cloud account.

By default, just the read-only `helm` commands are supported. For enabling commands that require create, update or delete rules, you need to create specific (Cluster)Role and (Cluster)RoleBinding and reference it in the RBAC configuration. To learn more, refer to the [RBAC section](../rbac.md).

## Enabling plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../../installation/index.mdx) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Helm plugin.
6. Click **Save** button.

## Configuration Syntax

The plugin supports the following configuration:

```yaml
# Configures the default Namespace for executing Botkube `helm` commands. If not set, uses 'default'.
defaultNamespace: "default"
# Allowed values are configmap, secret, memory.
helmDriver: "secret"
# Location for storing Helm configuration.
helmConfigDir: "/tmp/helm/"
config directory.
# Location for storing Helm cache.
helmCacheDir: "/tmp/helm/.cache"
```

## Merging strategy

For all collected `helm` executors bindings, configuration properties are overridden based on the order of the binding list for a given channel. The priority is given to the last binding specified on the list. Empty properties are omitted.
