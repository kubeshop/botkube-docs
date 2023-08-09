---
id: socket-slack-cloud
title: Socket Slack for Botkube Cloud
sidebar_position: 3
---

## Prerequisites

- Botkube Cloud account which you can create [here](https://app.botkube.io) for free.

## Install Socket Slack App in Your Slack workspace

// TODO: Basically copy "Install Socket Slack App in Your Slack workspace" and adjust it so that env variables are not needed.

## Create a Botkube Cloud Instance

1. Go to Botkube Cloud [Web App](https://app.botkube.io/) and click on `New Instance` button.

   ![New Instance](../assets/cloud_slack_new_instance.png "Create new instance")

2. Fill in the `Instance Display Name` and click `Next` button.

   ![Instance Display Name](../assets/cloud_slack_instance_display_name.png "Instance display name")

3. Click `Add platform` dropdown, and select `Slack` option.

   ![Slack Platform Select](../assets/cloud_slack_select_slack.png "Select slack platform")

4. In the popup, select `Custom Slack app` option and click `Select` button.

   ![Custom Slack App](../assets/cloud_slack_custom_slack_app_select.png "Custom slack app")

5. Provide the Slack app details as described follows and click `Next` button.

   - **Display :** This is the name of the Slack app which will be displayed in your platform list.
   - **App Token:** Grab `SLACK_API_APP_TOKEN` as described [here](./self_hosted.md#generate-and-obtain-app-level-token).
   - **Bot Token:** Grab `SLACK_API_BOT_TOKEN` as described [here](./self_hosted.md#obtain-bot-token).
   - **Channel Name:** Slack channel where you can execute Botkube commands and receive notification.

   ![Cloud Slack Credentials](../assets/cloud_slack_credentials.png "Cloud Slack credentials")

6. Add plugins you want to enable in your Botkube instance and click `Next` button.

   ![Cloud Slack Plugins](../assets/cloud_slack_add_plugins.png "Cloud Slack plugins")

7. Include optional `default aliases` and `default actions` and click `Create` button to create Botkube Cloud instance.

   ![Cloud Slack Create](../assets/cloud_slack_create.png "Cloud Slack create")

8. Follow the instructions on the summary page to deploy Botkube into your environment.

   ![Cloud Slack Summary](../assets/cloud_slack_summary.png "Cloud Slack summary")

## Clean up

1. Go to Botkube Cloud instances page and click `Manage` button of the instance you want to remove.

   ![Cloud Slack Instance Manage](../assets/cloud_slack_instance_list_manage.png "Cloud Slack instances manage")

2. Click `Delete instance` button, type the instance name in the popup and click `Delete instance`.

   :::caution
   Remember to execute the displayed command to completely remove Botkube and related resources from your cluster.
   :::

   ![Cloud Slack Instance Delete](../assets/cloud_slack_instance_delete.png "Cloud Slack instances delete")
