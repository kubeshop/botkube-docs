---
id: teams
title: "Microsoft Teams"
sidebar_position: 5
---

:::info

The previous Microsoft Teams integration has been deprecated. If you need to use the legacy Microsoft Teams integration, see the [Botkube 1.5 Documentation](https://969c27c7.botkube-docs-58l.pages.dev/1.5/installation/teams/). It is recommended to migrate to the new Microsoft Teams app per the below instructions.

:::

## Botkube Cloud Microsoft Teams App

The Botkube Cloud Microsoft Teams app offers several advanced features:

- Simplified installation into your Microsoft Teams workspace
- Multi-cluster executor support with a single Microsoft Teams app
- Manage Teams channels directly from the Botkube web app and ensure the Botkube bot is invited to the correct channels

The Botkube Cloud Microsoft Teams app uses Botkube's cloud services to manage channels and route source events and executor commands. Currently, it requires a manual side-loading of the app, but we are working on getting it listed in Microsoft AppSource.

You can directly try Botkube Cloud Microsoft Teams app for free by creating an account in the [Botkube Web App](https://app.botkube.io). Follow the steps below to install the app.

## Prerequisites

- A Botkube Cloud account.

  You can try out the Botkube Cloud Microsoft Teams app for free by creating an account in the [Botkube Cloud app](https://app.botkube.io).

## Create a Botkube Cloud Instance with Microsoft Teams

### Connect Botkube Cloud to your Kubernetes cluster

1. Go to Botkube Cloud [Web App](https://app.botkube.io/) and click on `New Instance` button.

   ![New Instance](assets/cloud_teams_new_instance.png "Create new instance")

1. Install Botkube Agent on your Kubernetes cluster by following the instructions on the page.

   ![Install Agent](assets/cloud_teams_install.png "Install Agent")

1. Click `Add platform` dropdown, and select `Teams` option.

   ![Teams Platform Select](assets/cloud_teams_select_platform.png "Select Teams platform")

Proceed with the next section.

### Install Botkube app to your Microsoft Teams organization and add it to your team

1. Download the Botkube Cloud Microsoft Teams app by clicking the `Download Botkube App for Teams` button.

   ![Download Teams App](assets/cloud_teams_download_app.png "Download Teams App")

1. Sideload the Botkube app to your Microsoft Teams organization via Teams Admin Center, following the [official documentation](https://learn.microsoft.com/en-us/microsoftteams/teams-custom-app-policies-and-settings#upload-a-custom-app-using-teams-admin-center).

   :::info
   This step requires administrator permissions on your Microsoft Teams organization. Sideloading app is needed only once for the whole organization.
   :::

   - Ensure the Botkube app is allowed for the organization in the [Teams Admin Center](https://admin.teams.microsoft.com/policies/manage-apps)

   ![Teams Admin Center](assets/cloud_teams_admin_center.png "Teams Admin Center")

1. Add the Botkube app to your team.

   1. In your Microsoft Teams application, navigate to the **Apps** tab.
   1. Select the **Built for your organization** tab.
   1. On the Botkube app card, click on the **Add** button.

      ![Add Botkube App](assets/cloud_teams_add_app.png "Add Botkube App")

   1. Click the **Add to a team** button.

      ![Add app to team](assets/cloud_teams_botkube_app_add.png "Add app to team")

   1. Select the team and default channel, where you'll get the welcome message.

      ![Select a team](assets/cloud_teams_select_team.png "Select a team")

   1. Click the **Set up a bot** button.

Once the Botkube app is added to your team, you'll receive a welcome message.

![Botkube Cloud Microsoft Teams Welcome Message](assets/cloud_teams_welcome_msg.png "Botkube Cloud Microsoft Teams welcome message")

Proceed with the next section.

### Grant permissions for Botkube app

:::info
This step requires administrator permissions on your Microsoft Teams organization. Granting permissions is needed only once for the whole organization.
:::

1. Click on the **Grant access** button.
1. Select your Microsoft account.

   ![Select account](assets/cloud_teams_permissions_select_account.png "Select account")

1. Click the **Accept** button.

   ![Grant access](assets/cloud_teams_permissions_accept.png "Grant access")

1. You will be redirected to the confirmation page.

   ![Confirmation page](assets/cloud_teams_permissions_success.png "Confirmation page")

Close the page and proceed with the next section.

### Connect your team to Botkube Cloud

Go back to the Microsoft Teams app channel, where you received the welcome message.

1. Click the **Connect to Botkube Cloud** button in the welcome message.
1. Log in to Botkube Cloud, if you haven't already. Ensure that you selected the correct organization, where you want to connect your team.
1. Click the **Connect** button.

   ![Connect to Botkube Cloud](assets/cloud_teams_team_connect.png "Connect to Botkube Cloud")

1. You will see a confirmation page.

   ![Confirmation page](assets/cloud_teams_team_connect_success.png "Confirmation page")

Close the page and proceed with the next section.

### Finalize Botkube Cloud instance configuration

Go back to the Botkube Cloud instance creation.

1. In step 2, select your connected team and provide other details.

   - **Connected Microsoft Teams team:** Teams team that you connected in the previous section.
   - **Display Name:** Display name of the Microsoft Teams team configuration.
   - **Channels:** Teams channels where you can execute Botkube commands and receive notification.

   ![Botkube Cloud Instance Configuration](assets/cloud_teams_config.png "Botkube Cloud Instance Configuration")

2. Add plugins you want to enable in your Botkube instance and click `Next` button.

   ![Microsoft Teams Plugins](assets/cloud_teams_add_plugins.png "Microsoft Teams plugins")

3. Include optional default command aliases and actions and click `Apply Changes` button to update Botkube Cloud instance.

   ![Microsoft Teams Create](assets/cloud_teams_create.png "Microsoft Teams create")

## Using Botkube Cloud Microsoft Teams App

You can start using Botkube Cloud Microsoft Teams by typing `@Botkube cloud help` in one of the channels in the team you configured in one of the previous steps.

![Botkube Cloud Microsoft Teams Command Help](assets/cloud_teams_command_help.png "Botkube Cloud Microsoft Teams command help")

### Listing Cloud Instances

You can list all your Botkube Cloud instances by typing `@Botkube cloud list` in the Microsoft Teams channel, or click the button `List connected instances` in the help command response. Besides the instance `name`, `ID`, and `status` in the list response, you can also click the `Get details` button to go to instance details on Botkube Cloud Dashboard.

![Botkube Cloud Microsoft Teams List Instances](assets/cloud_teams_list_instances.png "Botkube Cloud Microsoft Teams list instances")

### Setting Default Instance

Once a Botkube command is executed, it will be handled on target Kubernetes cluster specified with `--cluster-name` flag. This is an optional flag,
where if you have not specified it, Botkube Cloud will select the first instance. However, you can also achieve setting default instance with command `@Botkube cloud set default-instance`.

![Cloud Microsoft Teams Set Default Instances](assets/cloud_teams_command_set_default.png "Cloud Microsoft Teams set default instance")

After this point, all of your commands will be executed on the default instance. Moreover, if you want to execute a command on all the target clusters, you can use `--all-clusters` flag.

![Cloud Microsoft Teams All Clusters](assets/cloud_teams_command_all_clusters.png "Cloud Microsoft Teams all clusters")

## Cleanup

1. Go to Botkube Cloud instances page and click `Manage` button of the instance you want to remove.

   ![Cloud Teams Instance Manage](assets/cloud_teams_instance_list_manage.png "Cloud Microsoft Teams instances manage")

2. Click `Delete instance` button, type instance name in the popup and click `Delete instance`.

   :::caution
   Remember to execute the displayed command to completely remove Botkube and related resources from your cluster.
   :::

   ![Cloud Teams Instance Delete](assets/cloud_teams_instance_delete.png "Cloud Microsoft Teams instances delete")

## Limitations

Botkube Cloud Microsoft Teams App currently doesn't support the following features yet:

- Processing states from selected dropdowns, e.g., used for the `kubectl` command builder. In a result, the command builder is not available.
- Adding 👀 and ✅ reactions to messages indicating process status.

  This seems to be a limitation of the Microsoft Teams platform, however we'll investigate if there is a workaround.

- Sending messages visible only to specific users.
- Replacing messages with new content, e.g., used for pagination. Currently, a new card is sent as a new message.
- User mentions in messages. Instead, Botkube app uses plaintext mentions with first and last name.
- The `ChannelName` RBAC group mapping is not supported in Botkube Agent 1.6. This will be supported in the Botkube Agent 1.7 release.
