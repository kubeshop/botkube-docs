+++
title = "Discord"
date = 2020-10-02T15:46:02+05:30
draft = false
weight = 25
toc = true
+++

### Install BotKube to the Discord Server:

Follow the steps below to install BotKube Discord app to your Discord server.

#### Create BotKube app at your Discord Server

1. Reach https://discordapp.com/developers/applications.

    ![discord_applications_portal](/images/discord_applications_portal.png)

2. Create a "New Application" named BotKube and add a bot named **BotKube** into the Application.

    ![discord_create_new](/images/discord_create_new.png)

3. Copy the Application **APPLICATION ID** and note it as it is required for BotKube installation.

    ![discord_copy_client_id](/images/discord_copy_application_id.png)

    Add a description - `BotKube is a messaging bot for monitoring and debugging Kubernetes clusters. Visit https://botkube.io/usage for help.`.

    Set the BotKube icon (BotKube icon can be downloaded from [this link](https://github.com/kubeshop/botkube/raw/main/branding/logos/botkube_192x192.png)).

    Click on Save Changes to update the Bot.

4. Now, reach the **Bot** page and Click **Add Bot** to add a Discord Bot to your application.

    ![discord_add_bot](/images/discord_add_bot.png)

5. After Bot creation, now you can see a bot is added to your application. Click on the **Reset Token** button.

    ![discord_bot_created](/images/discord_bot_created.png)

    Note the token as it is required for BotKube installation.

6. Go to the **OAuth2** page. Generate the URL with suitable permissions using the **OAuth2 URL Generator** available under the OAuth2 section to add bot to your Discord server.

    ![discord_bot_scope](/images/discord_bot_scope.png)

    the generated URL contains **YOUR_CLIENT_ID**, Scope and permission details.

    ```
    https://discord.com/api/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&permissions=<SET_OF_PERMISSIONS>&scope=bot
    ```

7. Copy and Paste the generated URL in a new tab, select the discord server to which you want to add the bot, click Continue and Authorize Bot addition.

    ![discord_bot_auth](/images/discord_bot_auth.png)

    ![discord_bot_auth_2](/images/discord_bot_auth_2.png)

8. Switch to the Discord app. Navigate to **User settings** and select **Advanced** tab.

    Enable the **Developer Mode**.

    ![discord_developer_mode](/images/discord_developer_mode.png)

9. Create a new channel or select an existing one and copy the **CHANNEL ID**.

   To get the channel ID, right-click on a channel you want to receive notification in and click on **Copy ID**.

   ![discord_copy_channel_id.png](/images/discord_copy_channel_id.png)

   Note the copied channel ID as it is required for BotKube installation.

10. Now, go ahead and install the BotKube backend on your Kubernetes cluster.

{{% notice note %}}

Follow the first 4 mins of this [Video Tutorial](https://youtu.be/8o25pRbXdFw) to understand the process visually.

{{% /notice%}}


### Install BotKube Backend in Kubernetes cluster

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  $ helm repo add botkube https://charts.botkube.io
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace \
  --set communications.discord.enabled=true \
  --set communications.discord.channel=<DISCORD_CHANNEL_ID> \
  --set communications.discord.botID=<DISCORD_BOT_ID> \
  --set communications.discord.token=<DISCORD_TOKEN> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set image.tag=v0.12.4 \
  botkube/botkube
  ```

  where,<br>
  - **DISCORD_CHANNEL_ID** is the channel name where @BotKube needs to send notifications<br>
  - **DISCORD_BOT_ID** is the BotKube Application Client ID<br>
  - **DISCORD_TOKEN** is the Token you received after adding BotKube bot to your Discord Application<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

   Configuration syntax is explained [here](/configuration).
   Full Helm chart parameters list is documented [here](/configuration/helm-chart-parameters).

  Send **@BotKube ping** in the channel to see if BotKube is running and responding.

  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:

  1. Create a new `config.yaml` file and add Kubernetes resource configuration as described on the [source](/configuration/source) page.
  2. Pass the YAML file as a flag to `helm install` command, e.g.:

      ```
      helm install --version v0.12.4 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
      ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)

#### Remove BotKube from Discord Server

- Goto Discord Developers Portel <a href="https://discord.com/developers/applications">Applications</a> page<br>
- Click on "BotKube" and click on "Delete App" button

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster.

```bash
$ helm uninstall botkube
```

