+++
title = "Discord"
date = 2020-10-02T15:46:02+05:30
draft = false
weight = 10
toc = true
+++

### Install BotKube to the Discord Server:

Follow the steps below to install BotKube Discord app to your Discord server.

#### Create BotKube app at your Discord Server

1. Reach https://discordapp.com/developers/applications 

![discord_applications_portal](/images/discord_applications_portal.png)

2. Create New Application named Botkube and add a bot named **Botkube** into the Application

![discord_create_new](/images/discord_create_new.png)

3. Copy the Application **CLIENT ID** and place it under _Dischord.botid_ in comm-config.yaml

![discord_copy_client_id](/images/discord_copy_client_id.png)


4. Now Reach the **Bot** page and Click **Add Bot** to add a Discord Bot to your application.


![discord_add_bot](/images/discord_add_bot.png)

5. Autoring Bot creation, now you can see a bot being added to your application. Copy Bot **TOKEN** and place it under _Dischord.token_ in comm-config.yaml

![discord_bot_created](/images/discord_bot_created.png)


6. Now Reach the **OAuth2** page. Generate the URL with suitable permissions using the **OAuth2 URL Generator** available under OAuth2 section to the add bot to your Discord server

![discord_bot_scope](/images/discord_bot_scope.png)

the generated URL contains **YOUR_CLIENT_ID**, Scope and permission details

```
https://discordapp.com/oauth2/authorize?&client_id=<YOUR_CLIENT_ID>&scope=bot&permissions=<SET_OF_PERMISSIONS>
```

6. Copy and Paste the generated URL in a new tab, select the discord sever to which you want to add the bot, click Continue and Authorise Bot addition.

![discord_bot_auth](/images/discord_bot_auth.png)

![discord_bot_auth_2](/images/discord_bot_auth_2.png)


Kudos to you..!!, you have successfully added botkube bot to you server

![discord_new_channel](/images/discord_new_channel.png)

7. Create a new channel and/or copy the  **CHANNEL ID** of an existing one that you want to use frome the dicrod url https://discord.com/channels/XXXX/CHANNEL_ID and place it under _Dischord.channel_

```yaml
  # Settings for Discord
  discord:
    enabled: true
    token: 'DISCORD_TOKEN'	    # BotKube Bot Token 
    botid: 'DISCORD_BOT_ID'         # BotKube Application Client ID 
    channel: 'DISCORD_CHANNEL_ID'   # Discord Channel id for receiving BotKube alerts 
    notiftype: short                # Change notification type short/long you want to receive. notiftype is optional and Default notification type is short (if not specified)
```

8. start the botkube app ( if already installed ), and have fun..!!



#####  Note: Follow the first 4 mins of this [Video Tutorial](https://youtu.be/8o25pRbXdFw) to understand the process visually.


### Install BotKube Backend in Kubernetes cluster

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already
- Add **infracloudio** chart repository

  ```bash
  $ helm repo add infracloudio https://infracloudio.github.io/charts
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster.

  {{< tabs >}}
  {{% tab name="Helm 3" %}}

  ```bash
  $ helm install --version v0.11.0 botkube --namespace botkube \
  --set communications.discord.enabled=true \
  --set communications.discord.channel=<DISCORD_CHANNEL_ID> \
  --set communications.discord.botid=<DISCORD_BOT_ID> \
  --set communications.discord.token=<DISCORD_TOKEN> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=v0.11.0 \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{% tab name="Helm 2" %}}

  ```bash
  $ helm install --version v0.11.0 --name botkube --namespace botkube \
  --set communications.discord.enabled=true \
  --set communications.discord.channel=<DISCORD_CHANNEL_ID> \
  --set communications.discord.botid=<DISCORD_BOT_ID> \
  --set communications.discord.token=<DISCORD_TOKEN> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=v0.11.0 \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{< /tabs >}}

  where,<br>
  - **DISCORD_CHANNEL_ID** is the channel name where @BotKube needs to send notidications<br>
  - **DISCORD_BOT_ID** is the BotKube Application Client ID
  - **DISCORD_TOKEN** is the Token you received after adding BotKube bot to your Discord Application<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

   Configuration syntax is explained [here](/configuration).
   Complete list of helm options is documented [here](/configuration/#helm-install-options).

  Send **@BotKube ping** in the channel to see if BotKube is running and responding.

  {{% notice note %}}
  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:
  {{% /notice %}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://raw.githubusercontent.com/infracloudio/botkube/v0.11.0/helm/botkube/sample-res-config.yaml)

  ```
  config:
    ## Resources you want to watch
    resources:
    - name: v1/pods        # Name of the resource. Resource name must be in 
                           # group/version/resource (G/V/R) format
                           # resource name should be plural
                           # (e.g apps/v1/deployments, v1/pods)
      namespaces:          # List of namespaces, "all" will watch all the namespaces
        include:
        - all
        ignore:            # List of namespaces to be ignored, used only with include: all
        - kube-system      # example : include [all], ignore [x,y,z]
      events:              # List of lifecycle events you want to receive,
                           # e.g create, update, delete, error OR all
      - create
      - delete
      - error
    - name: batch/v1/jobs
      namespaces:
        include:
        - ns1
        - ns2
      events:
      - create
      - update
      - delete
      - error
      updateSetting:
        includeDiff: true
        fields:
        - spec.template.spec.containers[*].image
        - status.conditions[*].type
    ```
  - Pass the yaml file as a flag to `helm install` command.
    e.g

    ```
    $ helm install --version v0.11.0 --name botkube --namespace botkube -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)


#### Using kubectl

- Make sure that you have kubectl cli installed and have access to Kubernetes cluster
- Download deployment specs yaml

```bash
$ wget -q https://raw.githubusercontent.com/infracloudio/botkube/v0.11.0/deploy-all-in-one.yaml
```

- Open downloaded **deploy-all-in-one.yaml** and update the configuration.<br>
Set *DISCORD_ENABLED*, *DISCORD_BOTID*,  *DISCORD_CHANNEL*, *DISCORD_TOKEN*, *clustername*, *kubectl.enabled* and update the resource events configuration you want to receive notifications for in the configmap.<br>

where,<br>
- **DISCORD_CHANNEL_ID** is the channel name where @BotKube needs to send notidications<br>
  - **DISCORD_BOT_ID** is the BotKube Application Client ID
  - **DISCORD_TOKEN** is the Token you received after adding BotKube bot to your Discord Application<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

Configuration syntax is explained [here](/configuration).

- Deploy the resources

```bash
$ kubectl create -f deploy-all-in-one.yaml
```

- Check pod status in botkube namespace. Once running, send **@BotKube ping** in the Discord channel to confirm if BotKube is responding correctly.


#### Remove BotKube from Discord Server

- Goto Discord Developers Portel <a href="https://discord.com/developers/applications">Applications</a> page<br>
- Click on "BotKube" and click on "Delete App" button

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster.

```bash
$ helm delete --purge botkube
```

#### Using kubectl

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/v0.11.0/deploy-all-in-one.yaml
```

