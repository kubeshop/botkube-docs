---
id: teams
title: "Microsoft Teams"
sidebar_position: 5
---

:::info

Botkube is currently working on a beta version of the **new Botkube for Microsoft Teams** bot. If you are a Microsoft Teams user we would love to have you as a part of the beta program. The new bot will feature:

- Single-click installation of Botkube via Microsoft AppSource
- Interactive command builder for simple interaction with Kubernetes for non-experts
- No need for ingress to your Kubernetes cluster to use Botkube with Microsoft Teams

Please join the beta program for the new Botkube for Microsoft Teams bot, help us shape the future direction of Botkube for Teams, and get early access to the new Teams bot.

Sign up to find out more about the Botkube for Microsoft Teams beta by sending us a message on the [Contact Us](https://botkube.io/contact) page. You can also leave a comment on the Botkube for Microsoft Teams [GitHub Issue](https://github.com/kubeshop/botkube/issues/1212).

:::

## Prerequisites

- Botkube CLI installed according to the [Getting Started guide](../../cli/getting-started.mdx#installation)
- Access to Kubernetes cluster
- MS Teams account
- Ability to expose endpoints using [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources.
  Unlike Slack/Mattermost, MS Teams apps communicate with backends by sending POST requests to the public endpoints. So to establish communications between Teams app and respective backend, it needs to be reachable from the outside world.

## Register Botkube as a bot with Microsoft Bot Framework.

We will use the "Developer Portal for Teams" to register and install Botkube as an app on MS Teams.

But first, ensure that you have [registered the app in Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal) - you'll need the "Application (client) ID" to fully configure your app.

Then, configure your app by following the steps below,

1. Log into [Developer Portal for Teams](https://dev.teams.microsoft.com).

2. Click on the "Apps" left-hand side menu item and choose "+ New app"

   ![Developer Portal - Add App](assets/teams_add_app.png "Teams add app")

3. You'll see an "Add app" pop-up. Add an app name.

4. You should now see your app listed in the "Apps" table, Click the app to continue.

5. Fill in the App details in the "Configure/Basic information" section.

   | Field                                 | Value                                                                                                                                                                         |
   | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | App name / Short name                 | Botkube                                                                                                                                                                       |
   | Descriptions / Short description      | Botkube is a bot for your Kubernetes cluster                                                                                                                                  |
   | Descriptions / Long description       | Botkube helps you monitor your Kubernetes cluster, debug critical deployments and gives recommendations for standard practices by running checks on the Kubernetes resources. |
   | Version                               | 1.0.0                                                                                                                                                                         |
   | Developer Information / Developer ... | Botkube                                                                                                                                                                       |
   | Developer Information / Website       | https://botkube.io                                                                                                                                                            |
   | App URLs / Privacy policy             | https://botkube.io/privacy                                                                                                                                                    |
   | App URLs / Terms of use               | https://botkube.io/license                                                                                                                                                    |
   | Application (client) ID               | Add the Application (client) ID you obtained from Azure Active Directory                                                                                                      |

   ![Developer Portal - Basic Information](assets/teams_add_app_info.png "Teams add app info")

6. Click the "Save" button to save your details.

7. Navigate to "Configure / Branding" left-hand side menu item. Click to open the "Branding" section.

8. Download Botkube icons from https://github.com/kubeshop/botkube/tree/main/branding/logos and update Branding icons.

### Add the Bot feature to the App

On the left-hand side menu click "Configure / App features"

1. In "App features / Select a feature to add", click the "Bot" button

   ![Developer Portal - App features](assets/teams_add_bot_feature.png "Teams add bot feature to app")

2. In "Bot / Identify your bot", select "Create a bot", click the "+ New Bot" and enter a name for the Bot. Export it also as the `BOT_NAME` environment variable.

   ![Developer Portal - Add bot](assets/teams_add_bot.png "Teams add bot")

   ```
   export BOT_NAME={name}
   ```

3. In the "Configure" screen, set the **Endpoint address**.
   The Endpoint address is the URL on which Botkube backend listens for incoming requests from MS Teams. While deploying the Botkube backend you can give an option to expose Botkube via Ingress. Please check the [prerequisites](./#prerequisites) for more details. The default URL format is: `{your_domain}/bots/teams/v1/messages`. For example, `https://example.com/bots/teams/v1/messages`.

   ![Developer Portal - Configure bot](assets/teams_add_bot_endpoint.png "Teams add bot endpoint address")

4. Navigate to the "Client secret" screen, then click the "Add a client secret for your bot". Export it as the `APPLICATION_PASSWORD` environment variable.

   ```
   export APPLICATION_PASSWORD={client_secret}
   ```

5. Navigate back the Bot management screen, and **copy the Bot ID displayed next to the Bot name in the table**. Export it also as the `APPLICATION_ID` environment variable.

   ```
   export APPLICATION_ID={id}
   ```

6. Navigate to the Apps section, select your App, click "Configure / App features", select "Bot".

7. In "Identify your bot / Select an existing bot", select the bot you just created.

   ![Developer Portal - Select bot](assets/teams_select_existing_bot.png "Teams select existing bot")

8. In "Bot / Identify your bot" enable

   - What can your bot do?: **[x] Upload and download files**
   - Select the scopes in which people can use this command: **[x] Personal** & **[x] Team**

9. Then click "Save".

### Install Bot to Teams

Go to "Publish / Publish to org" and click on **Publish your app** to install the Botkube app on MS Teams for your org.

![Developer Portal - Publish bot](assets/teams_publish_app.png "Teams publish app")

An admin has to approve this app in the [Teams Admin Center](https://admin.teams.microsoft.com/policies/manage-apps).

:::note
If you face "You don't have permissions to add Botkube to this team.", contact your admin to provide an access to install apps on teams.
If you are using a free version of teams which does not have an admin center, you can click on **Download** to download the app manifest and then choose **Upload a custom app** option in the App center to install the app.
:::

## Deploy Botkube

The Botkube app we created on Teams sends messages to the endpoint we provided while configuring the app. To POST the requests to the Botkube controller, it needs to be reachable from the outside world.

Now there are few different ways to enable access to the K8s Service from the outside cluster. But we will be discussing the most common way i.e exposing using [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources.

### Prerequisites

Before we start, make sure you have:

- a domain name with the ability to configure DNS
- TLS cert and key for the registered domain name to configure SSL termination
- nginx-ingress controller deployed on your cluster

Create a Kubernetes TLS Secret in the `botkube` namespace:

```bash
kubectl create namespace botkube
kubectl create secret tls botkube-tls -n botkube --cert=/path/to/cert.pem --key=/path/to/privatekey.pem
```

We use this TLS Secret while deploying Botkube.

To deploy Botkube agent in your cluster, run:

```bash
export CLUSTER_NAME={cluster_name}
export ALLOW_KUBECTL={allow_kubectl}
export ALLOW_HELM={allow_helm}
export HOST={host} # e.g. example.com

botkube install --version v1.3.0 --namespace botkube \
--set communications.default-group.teams.enabled=true \
--set communications.default-group.teams.appID=${APPLICATION_ID} \
--set communications.default-group.teams.appPassword=${APPLICATION_PASSWORD} \
--set communications.default-group.teams.botName=${BOT_NAME} \
--set settings.clusterName=${CLUSTER_NAME} \
--set 'executors.k8s-default-tools.botkube/kubectl.enabled'=${ALLOW_KUBECTL} \
--set 'executors.k8s-default-tools.botkube/helm.enabled'=${ALLOW_HELM} \
--set ingress.create=true \
--set ingress.host=${HOST} \
--set ingress.tls.enabled=true \
--set ingress.tls.secretName=botkube-tls
```

where:

- **APPLICATION_ID** is the Botkube application ID generated while registering Bot to Teams,
- **APPLICATION_PASSWORD** is the Botkube application password generated while registering Bot to Teams,
- **BOT_NAME** is the bot name set while registering Bot to Teams (usually it is `Botkube`),
- **CLUSTER_NAME** is the cluster name set in the incoming messages,
- **ALLOW_KUBECTL** set true to allow `kubectl` command execution by Botkube on the cluster,
- **ALLOW_HELM** set true to allow `helm` command execution by Botkube on the cluster,
- **HOST** is the Hostname of endpoint provided while registering Botkube to Teams,

Configuration syntax is explained [here](../../configuration).
All possible installation parameters are documented [here](../../configuration/helm-chart-parameters).

Send `@Botkube ping` in the channel to see if Botkube is running and responding.

### Verify if Botkube endpoint is reachable

Curl on the endpoint to confirm that the Botkube endpoint is reachable and serving the requests.

```bash
curl -k https://<HOST>/<URLPATH>
Authentication headers are missing in the request # Expected response
```

If you get 404, please check the ingress configuration or endpoint you configured while registering the app.

## Add Botkube to a channel

1. Go to Apps and select Botkube.

2. Click the drop-down option besides the "Open" button. That should show "Add to a team" option.
   ![Teams - Add bot to a channel](assets/teams_add_to_team.png "Teams Botkube add to teams")

3. Type and select the channel name in which you want to receive notifications.

4. Once added, browse to the channel and type `@Botkube ping` to make sure Botkube is responding.
   If Botkube responds, send `@Botkube enable notifications` to enable notifications.
   ![Teams - check bot health](assets/teams_ping.png "Teams Botkube ping")

   :::caution
   The MS Teams integration doesn't support persistence for notifications settings. As a result, when Botkube restarts, e.g. during automated configuration reload, each time you need to send `@Botkube enable notifications` to re-enable notifications.
   :::

## Remove Botkube from Kubernetes cluster

Execute the following command to completely remove Botkube and related resources from your cluster:

```bash
botkube uninstall
```

## Troubleshooting

### Botkube doesn't respond

**Symptoms**

When you send Botkube command on MS Teams, in Botkube logs you see:

```plaintext
Failed to parse Teams request. Authentication failed.: Unauthorized: invalid AppId passed on token" bot="MS Teams"
```

**Solution**

You need to make sure that the configuration used by Botkube is valid.

1. Connect to the Kubernetes cluster where Botkube is running.
2. Get and decode the communication Secret details:
   ```bash
   kubectl get secret botkube-communication-secret -n botkube --template='{{index .data "comm_config.yaml" | base64decode }}'
   ```
3. Make sure that:
   - The Bot name in `communications.default-group.teams.botName` is equal to the name from the step 2 in [**Add the Bot feature to the App**](#add-the-bot-feature-to-the-app) section.
   - The password in `communications.default-group.teams.appPassword` is equal to the value from the step 4 in [**Add the Bot feature to the App**](#add-the-bot-feature-to-the-app) section.
   - The App ID in `communications.default-group.teams.appID` is equal to the value from the step 5 in [**Add the Bot feature to the App**](#add-the-bot-feature-to-the-app) section.
