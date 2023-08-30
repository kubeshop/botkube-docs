---
id: mattermost-cloud
title: Mattermost for Botkube Cloud
sidebar_position: 1
---

## Prerequisites

- Botkube Cloud account which you can create [here](https://app.botkube.io) for free.

## Create a Botkube Cloud Instance with Mattermost

Follow the steps below to install Botkube in your Mattermost instance.

1. Go to Botkube Cloud [Web App](https://app.botkube.io/) and create a new instance.

   You can do it by clicking "Create an Instance" button on Home Page or under this link [Create an Instance](https://app.botkube.io/instances/add)

2. Fill in the `Instance Display Name` and click `Next` button.

   ![Instance Display Name](assets/mattermost_instance_display_name.png "Instance display name")

3. Click `Add platform` dropdown, and select `Mattermost` option.
   ![Mattermost Platform Select](assets/mm_platform_select.png "Select mattermost platform")

4. Follow the [Mattermost instructions](https://developers.mattermost.com/integrate/reference/bot-accounts/) for creating a bot account. When creating the bot account, use the following details:

   - Username — `Botkube`

     :::note
     You can also use a custom username for your bot. Just remember that you'll need to provide this username during a later step of the Botkube installation.
     :::

   - Description — `Botkube helps you monitor your Kubernetes cluster, debug critical deployments and gives recommendations for standard practices by running checks on the Kubernetes resources.`.

   - Icon — You can download the Botkube icon from [this link](https://github.com/kubeshop/botkube/blob/main/branding/logos/botkube-black-192x192.png).

5. Paste the bot name in the form

   ![Bot Name in the form](assets/mm_form_bot_name.png "Bot Name in the form")

6. Past the token in the form

   ![Personal Token in the form](assets/mm_personal_token_form.png "Personal Token in the form")

7. Add Botkube to a channel

   Make sure that the newly created bot account is added to your Mattermost team by following [these instructions](https://developers.mattermost.com/integrate/reference/bot-accounts/#bot-account-creation).

   ![Invite Bot Account](./assets/invite.png)   

   Add Botkube user created to the channel you want to receive notifications in.

   ![Channels in the form](assets/mm_channels_form.png "Channels in the form")

8. Add plugins you want to enable in your Botkube instance and click `Next` button.

   ![Plugins](assets/mm_add_plugins.png "Plugins")

9. Include optional `default aliases` and `default actions` and click `Create` button to create Botkube Cloud instance.

   ![Create](assets/mm_create.png "Create")

10. Follow the instructions in the summary page to deploy Botkube into your environment.

   ![Summary](assets/mm_summary.png "Summary")

## Clean up

### Remove Botkube from Mattermost Team

- Deactivate or remove Botkube user from Mattermost Team. Login as System Admin, in the Menu proceed to System console -> Users -> botkube -> Deactivate.
- Archive Channel created for Botkube communication if required.

### Remove Botkube from Kubernetes cluster

1. Go to Botkube Cloud instances page and click `Manage` button of the instance you want to remove.

2. Click `Delete instance` button, type instance name in the popup and click `Delete instance`.

   :::caution
   Remember to execute the displayed command to completely remove Botkube and related resources from your cluster.
   :::

   ![Delete](assets/mm_instance_delete.png "Delete")
