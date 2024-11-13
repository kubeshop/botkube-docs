---
id: plugins
title: Plugins
sidebar_position: 4
---

There are two types of the plugins:

- **Source plugins**, which emit events to the communication platforms,
- **Executor plugins**, responsible for handling commands from the supported chat platforms.

This section aggregates all officially maintained Botkube plugins, which are available under two repositories.
You can configure both of the repositories with the following configuration during Botkube installation or upgrade:

```yaml
plugins:
  # ...
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.14.0/plugins-index.yaml
    botkubeExtra:
      url: https://github.com/kubeshop/botkube-plugins/releases/download/v1.14.0/plugins-index.yaml
```

To learn how to build your own plugin, see the [Plugin development](./development/index.md) section.
