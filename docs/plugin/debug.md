---
id: debugging
title: "Debugging"
sidebar_position: 10
---

Embedded logging allows you to access more information about the runtime operations of Botkube plugins.

By default:

- the gRPC client log level is set to `info`,
- the standard error ([`stderr`](<https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)>)) of a plugin binary is logged at `error` level,
- the standard output ([`stdout`](<https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)>)) of a plugin binary is ignored.

To change the default log level, export a dedicated environment variable following this pattern `LOG_LEVEL_{pluginType}_{pluginRepo}_{pluginName}`, e.g., `LOG_LEVEL_EXECUTOR_BOTKUBE_KUBECTL`. The possible log level values are:

- `trace`
- `debug`
- `info`
- `warning`
- `error`
- `fatal`
- `panic`

The plugin standard output is logged only if `debug` level is set.

:::info
The plugin name is normalized and all characters different from letters, digits, and the underscore (`_`) are replaced with underscore (`_`).
:::

To change the log level for a given plugin directly in the Botkube deployment, specify `extraEnv` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file. For example:

```yaml
extraEnv:
  - name: LOG_LEVEL_EXECUTOR_BOTKUBE_HELM
    value: "debug"
```
