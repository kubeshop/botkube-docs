---
id: commands
title: "Commands"
sidebar_position: 2
---

# Commands

## Login

To login to Botkube Cloud, run:

```bash
# interactive login flow with Botkube Cloud
botkube login
```

## Migrate

To migrate your Botkube configuration to Botkube Cloud, run:

```bash
# you need to be already logged it to Botkube Cloud
botkube migrate
```

```bash
Usage:
  botkube migrate [OPTIONS] [flags]

Flags:
      --cloud-api-url string         Botkube Cloud API URL (default "https://api.botkube.io")
      --cloud-dashboard-url string   Botkube Cloud URL (default "https://app.botkube.io")
  -h, --help                         help for migrate
      --instance-name string         Botkube Cloud Instance name that will be created
  -l, --label string                 Label of Botkube pod (default "app=botkube")
  -n, --namespace string             Namespace of Botkube pod (default "botkube")
  -q, --skip-connect                 Skips connecting to Botkube Cloud instance after migration
      --token string                 Botkube Cloud authentication token
```

Supported Botkube bot platforms for migration:
* Socket Slack
* Discord
* Mattermost

Limitations:
* RBAC is defaulted
* Plugins are sourced from Botkube repository

