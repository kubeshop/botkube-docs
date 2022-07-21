+++
title = "Microsoft Teams"
draft = false
weight = 25
toc = true
+++

1. Register BotKube as a bot with Microsoft Bot Framework.
2. Deploy the BotKube controller.
3. Add the BotKube app to a channel and enable notifications.

#### Prerequisites

Unlike Slack/Mattermost, MS Teams apps communicate with backends by sending POST requests to the public endpoints. So to establish communications between Teams app and respective backend, it needs to be reachable from the outside world.

Now there are few different ways to enable access to the K8s Service from the outside cluster.
We will be discussing the most common way i.e exposing using [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources.

 Before we start, make sure you have -

- a domain name with the ability to configure DNS
- TLS cert and key for the registered domain name to configure SSL termination
- nginx-ingress controller deployed on your cluster

### A. Register BotKube as a bot with Microsoft Bot Framework.

We will use "App Studio" to register and install Bot to MS Teams. Please follow the steps below to create and install BotKube App to your Team.

1. Install App Studio from the marketplace.
   Search for "App Studio" in the Apps section and add to the Teams

2. Open App Studio, Go to "Manifest editor" and choose "Create a new app"

3. Fill in the App details

    | Field                  | Value                                                                                                                          |
    |------------------------|--------------------------------------------------------------------------------------------------------------------------------|
    | Short name             | BotKube                                                                                                                        |
    | Package name           | botkube.io                                                                                                                     |
    | App ID                 | \<Click on Generate\>                                                                                                          |
    | Version                | 0.11.0                                                                                                                         |
    | Short Description      | BotKube is a bot for your Kubernetes cluster                                                                                   |
    | Full Description       | App that helps you monitor your Kubernetes cluster, debug critical deployments & gives recommendations for standard practices. |
    | Developer/Company Name | BotKube                                                                                                                        |
    | Website                | https://botkube.io                                                                                                             |
    | Privacy statement      | https://botkube.io/privacy                                                                                                     |
    | Terms of use           | https://botkube.io/license                                                                                                     |

    Click the checkbox on "Loading indicator" (optional)

4. Download BotKube icons from https://github.com/kubeshop/botkube/tree/main/branding/logos and update Branding icons.
   ![](/images/teams_app_details.png "Teams BotKube App Details")

####  Add a Bot to the App

Go to Capabilities > Bots and fill in the info

1. Click "Set up"

2. Set "BotKube" name, and enable
    - Messaging bot: **[x] My bot supports uploading and downloading files**
    - Scope: **[x] Personal** & **[x] Team**
    And Create bot.

3. On the "Bots" page, click on **Generate a new password**. Note down the password required while installing BotKube backend.

4. **Copy App ID displayed below Bot name in the heading. Note that Bot App ID is different than the one we generate on the "Apps Details" page.**

5. Set **Messaging Endpoint**.
   The messaging endpoint is the URL on which BotKube backend listens for incoming requests from Teams. While deploying the BotKube backend you can give an option to expose BotKube via Ingress. Please check the [prerequisites](/installation/teams/#prerequisites) for more details.

   ![](/images/teams_bot.png "Teams BotKube Bot")

#### Install Bot to Teams

Go to Finish >> Test and distribute and click on **Install** to install the BotKube app on teams.

   {{% notice note %}}
   If you face "You don't have permissions to add BotKube to this team.", contact your admin to provide an access to install apps on teams.<br>
   If you are using a free version of teams which does not have an admin center, you can click on **Download** to download the app manifest and then choose **Upload a custom app** option in the App center to install the app.
   {{% /notice%}}

### B. Deploy BotKube controller

The BotKube app we created on Teams sends messages to the endpoint we provided while configuring the app. To POST the requests to the BotKube controller, it needs to be reachable from the outside world.

Now there are few different ways to enable access to the K8s Service from the outside cluster. But we will be discussing the most common way i.e exposing using [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources.

#### Prerequisites

 Before we start, make sure you have -

- a domain name with the ability to configure DNS
- TLS cert and key for the registered domain name to configure SSL termination
- nginx-ingress controller deployed on your cluster

Create a K8s TLS secret from cert and key for the SSL termination in botkube namespace:

```bash
$ kubectl create namespace botkube
$ kubectl create secret tls botkube-tls -n botkube --cert=/path/to/cert.pem --key=/path/to/privatekey.pem
```
We will use this TLS secret while deploying the BotKube backend.

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  $ helm repo add botkube https://charts.botkube.io
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace\
  --set communications.teams.enabled=true \
  --set communications.teams.appID=<APPLICATION_ID> \
  --set communications.teams.appPassword=<APPLICATION_PASSWORD> \
  --set config.settings.clusterName=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set ingress.create=true \
  --set ingress.host=<HOST> \
  --set ingress.urlPath=<URLPATH> \
  --set ingress.tls.enabled=true \
  --set ingress.tls.secretName=<TLS_SECRET_NAME> \
  botkube/botkube
  ```

  where,<br>
  - **APPLICATION_ID** is the BotKube application ID generated while registering Bot to Teams<br>
  - **APPLICATION_PASSWORD** is the BotKube application password generated while registering Bot to Teams<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>
  - **HOST** is the Hostname of endpoint provided while registering BotKube to Teams<br>
  - **URLPATH** is the path in endpoint URL provided while registering BotKube to Teams<br>
  - **TLS_SECRET_NAME** is the K8s TLS secret name for the SSL termination<br>

   Configuration syntax is explained [here](/configuration).
   A Full Helm chart parameters list is documented [here](/configuration/helm-chart-parameters)

  Send **@BotKube ping** in the channel to see if BotKube is running and responding.

  {{% notice note %}}
  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:
  {{% /notice %}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://raw.githubusercontent.com/kubeshop/botkube/v0.12.4/helm/botkube/sample-res-config.yaml)

  ```yaml
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

  - Pass the YAML file as a flag to `helm install` command, e.g.:

    ```bash
    $ helm install --version v0.12.4 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)

#### Verify if BotKube endpoint is reachable

Curl on the endpoint to confirm that the BotKube endpoint is reachable and serving the requests.

```bash
$ curl -k https://<HOST>/<URLPATH>
Authentication headers are missing in the request # Expected response
```

If you get 404, please check the ingress configuration or endpoint you configured while registering the app.

### Add BotKube to a channel

1. Go to Apps and select BotKube.

2. Click the drop-down option besides the "Open" button. That should show "Add to a team" option.
   ![](/images/teams_add_to_team.png "Teams BotKube add to teams")

3. Type and select the channel name in which you want to receive notifications.

4. Once added, browse to the channel and type `@BotKube ping` to make sure BotKube is responding.
   If BotKube responds, send `@BotKube notifier start` to enable notifications.
   ![](/images/teams_ping.png "Teams BotKube ping")

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute the following command to completely remove BotKube and related resources from your cluster.

```bash
$ helm uninstall botkube
```
