---
id: keptn
title: Keptn
sidebar_position: 4
---

The Botkube Keptn source plugin allows you to consume events from Keptn deployment and notify in configured platforms.

The Keptn plugin is hosted by the official Botkube plugin repository. To enable the Keptn plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.2.0/plugins-index.yaml
```

## Enabling plugin

To enable Keptn plugin, add `--set 'sources.keptn.botkube/keptn.enabled=true'` to a given Botkube [`install` command](../../cli/commands/botkube_install.md).

## Syntax

```yaml
# Map of sources. The `sources` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: sources.{alias}
sources:
  "keptn":
    botkube/keptn: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        project: "" # Keptn project name
        url: "http://api-gateway-nginx.keptn" # Keptn API Gateway to fetch events.
        token: "" # Keptn API Token to authenticate API Gateway to fetch events.
```
