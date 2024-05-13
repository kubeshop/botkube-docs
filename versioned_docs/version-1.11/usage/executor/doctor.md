---
id: doctor
title: "Doctor"
sidebar_position: 4
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

Botkube allows you to execute `doctor` commands on your Kubernetes cluster. By default, `doctor` command execution is disabled. See the [**Enabling plugin**](../../configuration/executor/doctor.md#enabling-plugin) section from the `doctor` configuration documentation.

To execute the `doctor` commands, send message in following formats in the channel where Botkube is already added:

- Kubernetes native prompt:
  ```
  @Botkube doctor --namespace=[namespace] --resource=[resource] --error=[error]
  ```
- Free-form question:
  ```
  @Botkube doctor "[free-form question]"
  ```

By default, `chatgpt` is configured as alias for the `doctor` command. You can use them on par with the `doctor` command. To read more about aliases configuration, see the [Alias](../../configuration/alias.md) section.

This command needs to be executed from configured channel.
