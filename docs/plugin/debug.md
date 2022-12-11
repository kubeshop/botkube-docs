# Debugging

Embedded logging allows you to access more information about the runtime operations of Botkube plugins.

By default:

- the gRPC client log level is set to `info`,
- the standard error ([`stderr`](<https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)>)) of a plugin binary is logged at `error` level,
- the standard output ([`stdout`](<https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)>)) of a plugin binary is ignored.

To change the default log level, export a dedicated environment variable following such pattern `LOG_LEVEL_{pluginType}_{pluginRepo}_{pluginName}`, e.g., `LOG_LEVEL_EXECUTOR_BOTKUBE_KUBECTL`. The plugin standard output is logged only if `debug` level is set.

:::note
The plugin name is normalized and all characters different from letters, digits, and the underscore (`_`) are replaced with underscore (`_`).
:::
