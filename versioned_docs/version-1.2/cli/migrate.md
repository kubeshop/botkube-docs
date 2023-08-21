---
id: migrating-installation-to-botkube-cloud
title: "Migrating installation to Botkube Cloud"
sidebar_position: 2
---

## Migrating installation to Botkube Cloud

If you have started using Botkube with the Open Source installation, you have the option to migrate this instance to be managed using [Botkube Cloud](https://app.botkube.io/).

To make the migration process easier, we provide a dedicated `botkube cloud migrate` command that seamlessly transfers your Botkube installation to Botkube Cloud.

Supported Botkube platforms:

- Socket Slack
- Discord
- Mattermost

## Steps

:::note
Export valid `KUBECONFIG` environment variable before running migration command.
:::

1. [Install Botkube CLI](./getting-started.mdx#installation)
2. [Login into Botkube Cloud](./getting-started.mdx#first-use)
3. Run Botkube migrate:

   ```bash
   botkube cloud migrate
   ```

## Limitations

The following list contains current limitations that we will address in the near future:

- All custom RBAC settings assigned to plugins are ignored and will be replaced by default read-only permissions.
- All 3rd-party plugins are ignored.
- Minimal supported Botkube version is v1.0.0.

## See more

To learn more about `botkube cloud migrate` and all supported settings, visit the [Botkube migrate](./commands/botkube_migrate.md) document.
