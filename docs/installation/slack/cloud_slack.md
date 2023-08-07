---
id: cloud_slack
title: Cloud Slack
sidebar_position: 3
---

The Botkube Cloud Slack App uses Botkube's cloud services to manage channels and route executor commands. Events and alerts are sent directly from your cluster to your Slack workspace for reliable, fast notifications.

## Prerequisites

- A Botkube Cloud account with paid subscription which you can create one [here](https://app.botkube.io)

## Create a Botkube Cloud Instance

1. Go to Botkube Cloud [Web App](https://app.botkube.io/) and click on `New Instance` button.
   ![New Instance](assets/cloud_slack_new_instance.png "Create new instance")

2. Fill in the `Instance Display Name` and click `Next` button.
   ![Instance Display Name](assets/cloud_slack_instance_display_name.png "Instance display name")

3. Click `Add platform` dropdown, and select `Slack` option.
   ![Slack Platform Select](assets/cloud_slack_select_slack.png "Select slack platform")

4. In the popup, select `Official Botkube Slack App` option and click `Select` button.
   ![Official Slack App](assets/cloud_slack_official_slack_app_select.png "Official slack app")

5. Click `Add to Slack` button to add Cloud Slack integration to your Slack workspace
   ![Add to Slack](assets/cloud_slack_add_to_slack.png "Add to Slack")

6. Click `Allow` to grant permission to Botkube Cloud Slack app to access your Slack workspace.
   ![Cloud Slack Grant](assets/cloud_slack_grant.png "Cloud Slack grant")

7. Provide the Slack app details as described follows and click `Next` button.

   - **Connected Slack Workspace:** Slack workspace that you granted permission in previous step.
   - **Display Name:** Display name of the Cloud Slack integration.
   - **Channel:** Slack channel where you can execute Botkube commands and receive notification.
     ![Cloud Slack Workspace](assets/cloud_slack_workspace_details.png "Cloud Slack workspace")

8. Add plugins you want to enable in your Botkube instance and click `Next` button.
   ![Cloud Slack Plugins](assets/cloud_slack_add_plugins.png "Cloud Slack plugins")

9. Include optional `default aliases` and `default actions` and click `Create` button to create Botkube Cloud instance.

![Cloud Slack Create](assets/cloud_slack_create.png "Cloud Slack create")

10. Follow the instructions in the summary page to deploy Botkube into your environment.

![Cloud Slack Summary](assets/cloud_slack_summary.png "Cloud Slack summary")

## Remove Botkube Cloud Instance

1. Go to Botkube Cloud instances page and click `Manage` button of the instance you want to remove.

![Cloud Slack Instance Manage](assets/cloud_slack_instance_list_manage.png "Cloud Slack instances manage")

2. Click `Delete instance` button, type instance name in the popup and click `Delete instance`.

![Cloud Slack Instance Delete](assets/cloud_slack_instance_delete.png "Cloud Slack instances delete")

## Remove Botkube from Kubernetes Cluster

Execute the following command to completely remove Botkube and related resources from your cluster:

```bash
botkube uninstall
```
