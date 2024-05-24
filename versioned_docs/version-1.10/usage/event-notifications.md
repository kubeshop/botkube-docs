---
id: event-notifications
title: "Event notifications"
sidebar_position: 1
---

# Event notifications

Botkube sends notifications according to the [sources](../configuration/source/index.md) configuration.

## Actionable notifications

If you have [`kubectl` executor enabled](../configuration/executor/kubectl.md) for a given channel, you can run commands related to a resource from the notification itself. Use the dropdown on the left to select and run a given command:

![Actionable notifications](./assets/actionable-notifications.png)

The command dropdown is disabled for resource deletion events. It uses executor bindings to determine which commands are available for a given resource.

:::info
Actionable notifications are only available for the [Slack](../installation/slack/index.md) and [Microsoft Teams](../installation/teams/index.md) platforms that supports interactive messages. Currently, only a selected list of commands are supported, such as `describe`, `get`, or `logs`.
:::

## Managing notifications

Depending upon your configuration, you will receive notifications about Kubernetes resources lifecycle events and their health.
Botkube bot allows you to enable/disable notifications on each configured channel separately. Run `@Botkube help`, the bot will reply with the help message about the supported message formats.

### View Botkube configuration

Run `@Botkube show config` message from the configured channel where Botkube is added. The bot will reply to you with the configuration with which the controller is running.

To see how to update the configuration, see the [Updating the configuration](../configuration/index.mdx#updating-the-configuration) section in the Configuration document.

### Change notification sources

To change the notification sources, you can:

- run `@Botkube edit SourceBindings` command from the configured channel where Botkube is added.

  When you save the new notification sources, changes are applied once the Botkube is restarted. It is an automated process which usually takes a few seconds.

- For Botkube Cloud: edit Botkube Instance configuration in the Botkube Cloud dashboard.
- For self-hosted installations: run `helm upgrade` with updated installation command.

### Disable notifications

If you want to stop receiving notifications from Botkube, run `@Botkube disable notifications` from the configured channel where Botkube is added. You will no longer receive notifications from the Botkube in a given communication platform.

The notification settings are persisted across Botkube app restarts.

### Enable notifications

If you want to receive Botkube notifications again, run `@Botkube enable notifications` from the configured channel where Botkube is added.

The notification settings are persisted across Botkube app restarts.

### Check notifications status

Run `@Botkube status notifications` to check if notifications are enabled for a given communication platform.
