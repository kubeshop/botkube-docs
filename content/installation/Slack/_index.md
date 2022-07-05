+++
title = "Slack"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 10
toc = true
+++

### Install BotKube to the Slack workspace

Follow the steps below to install BotKube Slack app to your Slack workspace.

#### Install BotKube Slack app to your Slack workspace

Click the **Add to Slack** button provided to install BotKube Slack application to your workspace. Once you have authorized the application, you will be provided a BOT Access token. Kindly note down that token as it will be required while deploying BotKube backend to your Kubernetes cluster.

{{< raw_html >}}
<a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=12637824912.515475697794"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
{{< /raw_html >}}

Alternatively, you can install BotKube Slack app [from Slack app directory](https://slack.com/apps/AF5DZLHPC-botkube).

#### Add BotKube user to a Slack channel

After installing BotKube app to your Slack workspace, you could see a new bot user with the name "BotKube" added in your workspace. Add that bot to a Slack channel you want to receive notification in.<br> (You can add it by inviting **@BotKube** in a channel)

### Install BotKube Backend in Kubernetes cluster

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  $ helm repo add botkube https://infracloudio.github.io/charts
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace \
  --set communications.slack.enabled=true \
  --set communications.slack.channel=<SLACK_CHANNEL_NAME> \
  --set communications.slack.token=<SLACK_API_TOKEN_FOR_THE_BOT> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set config.settings.kubectl.enabled=<ALLOW_KUBECTL> \
  --set image.tag=v0.12.4 \
  botkube/botkube
  ```

  where,<br>
  - **SLACK_CHANNEL_NAME** is the channel name where @BotKube is added<br>
  - **SLACK_API_TOKEN_FOR_THE_BOT** is the Token you received after installing BotKube app to your Slack workspace<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

   Configuration syntax is explained [here](/configuration).
   Complete list of helm options is documented [here](/configuration/helm-options).

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

#### Remove BotKube from Slack workspace

- Goto Slack <a href="https://slack.com/apps/manage">manage apps</a> page<br>
- Click on "BotKube" and click on "Remove App" button

### Remove BotKube from Kubernetes cluster

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster.

```bash
$ helm uninstall botkube
```
