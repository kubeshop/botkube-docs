+++
title = "Microsoft Teams"
draft = false
weight = 50
toc = true
+++

1. Register BotKube as a bot with Microsoft Bot Framework.
2. Deploy BotKube controller.
3. Add BotKube app to a channel and enable notifications.

{{% notice note %}}
**Prerequisites:**<br>
- TODO
{{% /notice%}}


TODO: Add currently supported features checklist

### A. Register BotKube as a bot with Microsoft Bot Framework.

We will use "App Studio" to register and install Bot to MS Teams. Please follow the steps below to create and install BotKube App to your Team.

1. Install App Studio from marketplace.
   Search for "App Studio" in Apps section and add to the Teams

2. Open App Studio, Go to "Manifest editor" and choose "Create a new app"

3. Fill in the App details

    | Field      | Value |
    | ---------- | -------- |
    | Short name | BotKube     |
    | Package name | botkube.io |
    | App ID       | \<Click on Generate\> |
    | Version      | 9.99.9 |
    | Short Description | BotKube is a bot for your Kubernetes cluster |
    | Full Description | App that helps you monitor your Kubernetes cluster, debug critical deployments & gives recommendations for standard practices. |
    | Developer/Company Name | BotKube |
    | Website    | https://botkube.io |
    | Privacy statement | https://botkube.io/privacy |
    | Terms of use    | https://botkube.io/license |

    Click checkbox on "Loading indicator" (optional)

4. Download BotKube icons from https://github.com/infracloudio/botkube/tree/develop/branding/logos and update Branding icons.
   ![](/images/teams_app_details.png "Teams BotKube App Details")

####  Add a Bot to the App

Go to Capabilities > Bots and fill in the info

1. Click "Set up"

2. Set "BotKube" name, and enable
    - Messaging bot: `[x] My bot supports uploading and downloading files`
    - Scope: `[x] Personal` & `[x] Team`
    And `Create bot`.

3. On "Bots" page, click on `Generate a new password`. Note down the password required while installing BotKube backend. 

4. Copy App ID displayed below Bot name in the heading. Note that Bot App ID is different than the one we generate in "Apps Details" page.

5. Set **Messaging Endpoint**.
   Messaging endpoint is the URL on which BotKube backend listens for incoming requests from Teams. While deploying BotKube backend you can give option to expose BotKube via Ingress.
   ![](/images/teams_bot.png "Teams BotKube Bot")

#### Install Bot to Teams

Go to Finish and click on Install to install BotKube app on teams.

   {{% notice note %}}
   If you face "You don't have permissions to add BotKube to this team.", contact your admin to provide an access to install apps on teams.<br>
   If you are using free version of teams which does not have admin center, you can click on **Download** to download the app manifest and then choose **Upload a custom app** option in App center to install the app.
   {{% /notice%}}

### B. Deploy BotKube controller

BotKube app we created on Teams sends messages to endpoint we provided while configuring the app. While deploying BotKube backend on Kubernetes we can expose it using [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource.

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
  $ helm install --version v9.99.9-teams botkube --namespace botkube \
  --set communications.teams.enabled=true \
  --set communications.teams.appID=<APPLICATION_ID> \
  --set communications.teams.appPassword=<APPLICATION_PASSWORD> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.allowkubectl=<ALLOW_KUBECTL> \
  --set ingress.create=true \
  --set ingress.host=<HOST> \
  --set ingress.urlPath=<URLPATH> \
  --set ingress.tls.enabled=true \
  --set ingress.tls.secretName=<TLS_SECRET_NAME> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=teams \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{% tab name="Helm 2" %}}

  ```bash
  $ helm install --version v9.99.9-teams --name botkube --namespace botkube \
  --set communications.teams.enabled=true \
  --set communications.teams.appID=<APPLICATION_ID> \
  --set communications.teams.appPassword=<APPLICATION_PASSWORD> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.allowkubectl=<ALLOW_KUBECTL> \
  --set ingress.create=true \
  --set ingress.host=<HOST> \
  --set ingress.urlPath=<URLPATH> \
  --set ingress.tls.enabled=true \
  --set ingress.tls.secretName=<TLS_SECRET_NAME> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=teams \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{< /tabs >}}

  where,<br>
  - **APPLICATION_ID** is the BotKube application ID generated while registering Bot to Teams<br>
  - **APPLICATION_PASSWORD** is the BotKube application password generated while registering Bot to Teams<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>
  - **HOST** is the Hostname of endpoint provided while registering BotKube to Teams<br>
  - **URLPATH** is the path in endpoint URL provided while registering BotKube to Teams<br>

   Configuration syntax is explained [here](/configuration).

  Send **@BotKube ping** in the channel to see if BotKube is running and responding.

  {{% notice note %}}
  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:
  {{% /notice %}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://raw.githubusercontent.com/infracloudio/botkube/v0.10.0/helm/botkube/sample-res-config.yaml)

    ```
    config:
      ## Resources you want to watch
      resources:
        - name: pod                # Name of the resources e.g pod, deployment, ingress, etc.
          namespaces:              # List of namespaces, "all" will watch all the namespaces
            include:
              - all
            ignore:
              - kube-system
          events:                  # List of lifecycle events you want to receive, e.g create, update, delete, error OR all
            - create
            - delete
            - error
        - name: job
          namespaces:
            include:
              - all
            ignore:
              -
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
    $ helm install --version v0.10.0 --name botkube --namespace botkube -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)


#### Using kubectl

- Make sure that you have kubectl cli installed and have access to Kubernetes cluster
- Download deployment specs yaml

```bash
$ wget -q https://raw.githubusercontent.com/infracloudio/botkube/v0.10.0/deploy-all-in-one.yaml
```
TODO


#### Verify if BotKube endpoint is reachable

Curl on the endpoint to confirm that BotKube endpoint is reachable and serving the requests.

```bash
$ curl -k https://<HOST>/<URLPATH>
Authentication headers are missing in the request # Expected response
```

If you get 404, please check ingress configuration or endpoind you configured while registering app.

### Add BotKube to a channel

1. Go to Apps and select BotKube.

2. Click drop-down option besides "Open" button. That should show "Add to a team" option.
   ![](/images/teams_add_to_team.png "Teams BotKube add to teams")

3. Type and select the channel name in which you to receive notification.

4. Once added, browse to the channel and type `@BotKube ping` to make sure BotKube is responding.
   If BotKube responds, send `@BotKube notifier start` to enable notifications.
   ![](/images/teams_ping.png "Teams BotKube ping")

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster.

```bash
$ helm delete --purge botkube
```

#### BotKube install: Using kubectl

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/v0.10.0/deploy-all-in-one.yaml
```

