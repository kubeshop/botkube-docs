---
id: troubleshooting.md
title: "Troubleshooting"
sidebar_position: 6
---

This document describes how to identify and resolve issues that might occur.

### Missing source events

**Symptoms**

You don't get event message on a given communication platform even though the event occurred in your 3rd party service.

**Debugging steps**

- [Enable debugging mode for a given plugin](debug.md).
  Once enabled, check the Botkube logs. You can filter them by your plugin name. You should see information about downloading and starting your source. For example:

  ```bash
  INFO[2023-01-09T21:21:24+01:00] Starting Plugin Manager for all enabled plugins  component="Plugin Manager" enabledSources=botkube/cm-watcher
  INFO[2023-01-09T21:21:24+01:00] Downloading plugin.                           binPath=/tmp/plugins/botkube/source_v0.13.0_cm-watcher component="Plugin Manager" url="http://host.k3d.internal:3000/static/source_cm-watcher_darwin_amd64"
  INFO[2023-01-09T21:21:24+01:00] source plugin registered successfully.        binPath=/tmp/plugins/botkube/source_v0.13.0_cm-watcher component="Plugin Manager" plugin=botkube/cm-watcher version=v0.13.0
  INFO[2023-01-09T21:21:25+01:00] Start source streaming...                     pluginName=botkube/cm-watcher sources="[plugin-based]"
  ```

  If you don't see any of the above log messages:

  - Make sure that `source.{group_name}.{plugin_name}.enabled` property is set to `true`
  - Make sure that a given source configuration (`sources.{group_name}`) is bind to a given communication platform (`bindings.sources: [{group_name}]`)

  If the source is not bound to any communication platform Botkube will not download and start such plugin. Even if it's enabled.

- [Make sure that your plugin didn't crash](#plugin-process-exited).

### Missing executor response

**Symptoms**

You run a given executor command in a chat window, but you don't get any response.

**Debugging steps**

- [Enable debugging mode for a given plugin](debug.md).
  Once enabled, run a given executor command once again, and check the Botkube logs. You can filter them by your plugin name. You should see information about downloading and registering your executor. For example:

  ```bash
  INFO[2023-01-09T21:21:24+01:00] Starting Plugin Manager for all enabled plugins  component="Plugin Manager" enabledExecutors=botkube/echo
  INFO[2023-01-09T21:21:24+01:00] Downloading plugin.                           binPath=/tmp/plugins/botkube/executor_v0.13.0_echo component="Plugin Manager" url="http://host.k3d.internal:3000/static/executor_echo_darwin_amd64"
  INFO[2023-01-09T21:21:24+01:00] executor plugin registered successfully.      binPath=/tmp/plugins/botkube/executor_v0.13.0_echo component="Plugin Manager" plugin=botkube/echo version=v0.13.0
  ```

  If you don't see any of the above log messages:

  - Make sure that `executors.{group_name}.{plugin_name}.enabled` property is set to `true`
  - Make sure that a given executor configuration (`executors.{group_name}`) is bind to a given communication platform (`bindings.executors: [{group_name}]`)

  If the executor is not bound to any communication platform Botkube will not download and start such plugin. Even if it's enabled.

- [Make sure that your plugin didn't crash](#plugin-process-exited).

### Plugin process exited

**Symptoms**

In Botkube logs, you see an error similar to:

```bash
ERRO[2023-01-09T21:21:25+01:00] plugin process exited                         error="exit status 1" path=/tmp/plugins/botkube/executor_v0.13.0_echo pid=71127 plugin=botkube/echo
```

**Solution**

It means that your plugin exited once it was started by Botkube [plugin manager](../architecture/index.md#plugin-manager). To start you plugin again, you need to restart the Botkube core process, as a crashed won't be restarted automatically. This issue is tracked in [botkube#878](https://github.com/kubeshop/botkube/issues/878). You need to make sure that our plugin doesn't exit once it's started. You should return each error on Botkube plugin interface, instead of crashing your application. To see your plugin standard output [set the `debug` for a given plugin](debug.md).

### Plugin not found error

**Symptoms**

In Botkube logs, you see an error similar to:

```bash
2023/01/09 21:37:04 while starting plugins manager: not found source plugin called "cm-test" in "botkube" repository
```

**Debugging steps**

- Make sure that a given repository is defined under `plugins.repository`.
- Check that a given entry is defined in a given repository index file. You should find under `entries` a plugin with a given name, version and type (source or executor).
