+++
title = "Mattermost"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 20
toc = true
+++

### Install BotKube to the Mattermost team

Follow the steps below to install BotKube in your Mattermost Team (v5.14.0).

#### 1. Enable Personal Access Token
Login with System Admin account, and in the Menu proceed to **System console > Integrations > Integration Management** and enable **Personal Access Token**.

![mm_token_access](/images/mm_token_access.png)

#### 2. Create BotKube user
To create a BotKube user, if not already created, proceed to the menu and Get a team invite link. Logout from the admin account and paste the link in the address bar and create a user with the username **BotKube**.

{{% notice note %}}
You can also use a custom username for your bot. However, it needs to be passed during BotKube installation in one of the further steps.
{{% /notice%}}

![mm_botkube_user](/images/mm_botkube_user.png)

#### 3. Manage Roles for BotKube user
Login as System Admin, in the Menu, proceed to **System console > Users**. For BotKube user, Manage Roles and allow tokens and post_all access.

![mm_botkube_roles](/images/mm_botkube_roles.png)

#### 4. Create a Token for BotKube user
Login as BotKube user, in the Menu, proceed to **Account Settings > Security > Personal Access Token > Create** and save the token.

![mm_botkube_token](/images/mm_botkube_token.png)

#### 5. Add BotKube to a channel
Add BotKube user created to the channel you want to receive notifications in.

### Configure /botkubehelp Slash Command

**1.** First, go to **Main Menu > Integrations > Slash Commands**. (If you don’t have the Integrations option in your Main Menu, slash commands may not be enabled on your Mattermost server or maybe disabled for non-admins. Enable them from System Console > Integrations > Custom Integrations in prior versions)

**2.** Click **Add Slash Command** and add the following details for the command and click **Save**.

| Field                | Value                              |
|----------------------|------------------------------------|
| Title                | BotKube                            |
| Description          | Show BotKube help                  |
| Command Trigger Word | botkubehelp                        |
| Request URL          | https://botkube.herokuapp.com/help |
| Request Method       | POST                               |
| Autocomplete         | True                               |

![mm_botkube_slash_cmd](/images/mm_botkube_slash_cmd.png)

**3.** Verify executing **/botkubehelp** in a channel.

![mm_botkube_help](/images/mm_botkube_help.png)


### Install BotKube in Kubernetes cluster

#### BotKube install: Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  $ helm repo add botkube https://charts.botkube.io
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace \
  --set communications.mattermost.enabled=true \
  --set communications.mattermost.url=<MATTERMOST_SERVER_URL> \
  --set communications.mattermost.cert=<MATTERMOST_CERT> \
  --set communications.mattermost.token=<MATTERMOST_TOKEN> \
  --set communications.mattermost.team=<MATTERMOST_TEAM> \
  --set communications.mattermost.channel=<MATTERMOST_CHANNEL> \
  --set communications.mattermost.botName=<MATTERMOST_BOT_NAME> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set image.tag=v0.12.4 \
  botkube/botkube
  ```

  where,<br>
  - **MATTERMOST_SERVER_URL** is the URL (including http/https schema) where Mattermost is running<br>
  - **MATTERMOST_CERT** is the SSL certificate file for HTTPS connection. Place it in Helm directory and specify the path<br>
  - **MATTERMOST_TOKEN** is the Token received by creating Personal Access Token for BotKube user<br>
  - **MATTERMOST_TEAM** is the Team name where BotKube is added<br>
  - **MATTERMOST_CHANNEL** is the Channel name where BotKube is added and used for communication<br>
  - **MATTERMOST_BOT_NAME** is the Mattermost bot username (usually it is `BotKube`)<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

  - To deploy with TLS, replace **MATTERMOST_CERT** with the location of the SSL certificate file placed in Helm directory. Leave this value to None if deploying without TLS.

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

### Remove BotKube from Mattermost Team

- Deactivate or remove BotKube user from Mattermost Team. Login as System Admin, in the Menu proceed to System console -> Users -> botkube -> Deactivate<br>
- Archive Channel created for BotKube communication if required.

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster

```bash
$ helm uninstall botkube
```
