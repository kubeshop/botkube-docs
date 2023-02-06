---
id: configuration
title: Configuration
sidebar_position: 2
---

Botkube backend allows you to specify [source](./source), [executor](./executor), [communication](./communication), and [general](./general) Botkube settings. Check the related documents for more detailed explanation.

The configuration settings are read from two sources:

- the configuration files specified by the `BOTKUBE_CONFIG_PATHS` environment variable or `--config/-c` flag. For example:

  ```bash
  export BOTKUBE_CONFIG_PATHS="global.yaml,team-b-specific.yaml"
  # or
  ./botkube --config "global.yaml,team-b-specific.yaml"
  ```

  You can split individual settings into multiple configuration files. The priority will be given to the last (right-most) file specified. Files with `_` name prefix are always read as the last ones. See the [merging strategy](#merging-strategy) section for more details.

  :::note
  For Helm installation, Botkube uses `_runtime_state.yaml` and `_startup_state.yaml` files to store its internal state. Remember to keep these files in the `BOTKUBE_CONFIG_PATHS` environment variable.
  :::

- the exported [environment variables](#environment-variables) that overrides the configuration specified in the files.

## Helm install options

Advanced Helm install options are documented [here](helm-chart-parameters).

## Updating the configuration

To update Botkube configuration, you can either:

- upgrade Botkube installation with Helm,
- or use dedicated `@Botkube` commands, to e.g. toggle notifications or edit Source Bindings. See the [Usage](../usage/index.md) document for more details.

If you wish to change the configuration with Helm, create a `/tmp/values.yaml` file that contains the new values and use the **helm upgrade** command:

```bash
helm upgrade -n botkube botkube -f /tmp/values.yaml helm/botkube --wait
```

As both Helm release upgrade and some of the `@Botkube` commands modify the same configuration, it is merged during the **helm upgrade** command.
Whenever you specify a new value in the `/tmp/values.yaml` file, it will override the existing value in the configuration.

### Preventing overrides by default Helm chart values

Keep in mind that even if you don't specify custom values in the `/tmp/values.yaml` file, Helm can override the existing values with the default ones.

Consider the following config:

```yaml
communications:
  "default-group":
    socketSlack:
      enabled: true
      botToken: "{botToken}"
      appToken: "{appToken}"
      channels:
        "default":
          name: general
          notification:
            disabled: false # default from the Helm chart
          bindings:
            sources:
              - k8s-all-events # default from the Helm chart
# (...)
```

Assume that users ran the following commands:

```
@Botkube edit SourceBindings k8s-err-events, k8s-recommendation-events
@Botkube disable notifications
```

Which effectively result in the following config that Botkube sees:

```yaml
communications:
  "default-group":
    socketSlack:
      enabled: true
      botToken: "{botToken}"
      appToken: "{appToken}"
      channels:
        "default":
          name: general
          notification:
            disabled: true # set by user command
          bindings:
            sources:
              - k8s-err-events # set by user command
              - k8s-recommendation-events # set by user command
# (...)
```

To persist the configuration that users provided, and not overwrite notification and source bindings values, run Helm upgrade with:

```yaml
communications:
  "default-group":
    socketSlack:
      channels:
        "default":
          name: general
          notification: null # explicitly not use defaults from Helm chart
          bindings:
            sources: null # explicitly not use defaults from Helm chart
# (...) other values
```

The following properties need such `null` value during upgrade, if you want to keep the previous configuration:

- `communications.default-group.{communication-platform}.channels.default.notifications`, where `{communication-platform}` is any communication platform supported except Microsoft Teams,
- `communications.default-group.{communication-platform}.channels.default.bindings.sources`, where `{communication-platform}` is any communication platform supported except Microsoft Teams,
- `communications.default-group.teams.bindings.sources`.

To learn more, read the [Deleting a default key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) paragraph in Helm documentation.

## Environment variables

The individual communication settings can be specified via environment variables. They take priority and override the configuration specified in the file.

To construct the environment variable name, take any property from the configuration file and make it uppercase. Use the underscore for properties that are nested. Use the double underscore for all camelCase properties. Finally, add the `BOTKUBE_` prefix.

For example, such configuration property from YAML:

```yaml
settings:
  kubectl:
    defaultNamespace: "NAMESPACE"
```

is mapped to the `BOTKUBE_SETTINGS_KUBECTL_DEFAULT__NAMESPACE` environment variable.

This is a useful feature that allows you to store the overall configuration in a file, where sensitive data, such as tokens, can be put in environment variables. See the [**Tokens from Vault via CSI driver**](./communication/vault-csi/) tutorial for an example use-case.

## Merging strategy

Botkube allows you to split individual settings into multiple configuration files. The following rules apply:

- The priority will be given to the last (right-most) file specified.
- Files with `_` name prefix are always read as the last ones following the initial order.
- Objects are merged together and primitive fields are overridden. For example:

  ```yaml
  # a.yaml - first file
  settings:
    clusterName: dev-cluster
    configWatcher: true
    kubectl:
      enabled: false
  ```

  ```yaml
  # _a.yaml - second file with `_` prefix
  settings:
    clusterName: demo-cluster
  ```

  ```yaml
  # b.yaml - third file
  settings:
    kubectl:
      enabled: true
  ```

  ```yaml
  # result
  settings:
    clusterName: demo-cluster
    configWatcher: true
    kubectl:
      enabled: true
  ```

- The arrays items are not merged, they are overridden. For example:

  ```yaml
  # a.yaml
  settings:
    kubectl:
      enabled: true
      commands:
        verbs:
          ["api-resources", "api-versions", "cluster-info", "describe", "diff", "explain", "get", "logs", "top", "auth"]
  ```

  ```yaml
  # b.yaml
  settings:
    kubectl:
      commands:
        verbs: ["get", "logs", "top", "auth"]
  ```

  ```yaml
  # result
  settings:
    kubectl:
      enabled: true
      commands:
        verbs: ["get", "logs", "top", "auth"]
  ```
