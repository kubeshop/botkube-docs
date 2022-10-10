---
id: slack
title: Slack (Legacy)
sidebar_position: 2
---

## Install Botkube to the Slack workspace

Follow the steps below to install Botkube Slack app to your Slack workspace.

### Install Botkube Slack app to your Slack workspace

Click the **Add to Slack** button provided to install Botkube Slack application to your workspace. Once you have authorized the application, you will be provided a Bot Access token. Copy the token and export it as an environment variable:

```bash
export SLACK_API_BOT_TOKEN="{token}"
```

<a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=551945394612.515475697794">
  <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
</a>

Alternatively, you can install Botkube Slack app [from Slack app directory](https://slack.com/apps/AF5DZLHPC-botkube).

### Add Botkube user to a Slack channel

After installing Botkube app to your Slack workspace, you could see a new bot user with the name "Botkube" added in your workspace. Add that bot to a Slack channel you want to receive notification in.<br/> (You can add it by inviting **@Botkube** in a channel)

## Install Botkube Backend in Kubernetes cluster

- We use [Helm](https://helm.sh/) to install Botkube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  helm repo add botkube https://charts.botkube.io
  helm repo update
  ```

- Deploy Botkube backend using **helm install** in your cluster:

  ```bash
  export CLUSTER_NAME={cluster_name}
  export ALLOW_KUBECTL={allow_kubectl}
  export SLACK_CHANNEL_NAME={channel_name}

  helm install --version v0.14.0 botkube --namespace botkube --create-namespace \
  --set communications.default-group.slack.enabled=true \
  --set communications.default-group.slack.channels.default.name=${SLACK_CHANNEL_NAME} \
  --set communications.default-group.slack.token=${SLACK_API_BOT_TOKEN} \
  --set settings.clusterName=${CLUSTER_NAME} \
  --set executors.kubectl-read-only.kubectl.enabled=${ALLOW_KUBECTL} \
  botkube/botkube
  ```

  where,<br/>

  - **SLACK_CHANNEL_NAME** is the channel name where @Botkube is added<br/>
  - **SLACK_API_BOT_TOKEN** is the Token you received after installing Botkube app to your Slack workspace<br/>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br/>
  - **ALLOW_KUBECTL** set true to allow kubectl command execution by Botkube on the cluster<br/>

  Configuration syntax is explained [here](../../configuration).
  Full Helm chart parameters list is documented [here](../../configuration/helm-chart-parameters).

  Send **@Botkube ping** in the channel to see if Botkube is running and responding.

  With the default configuration, Botkube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br/>
  If you wish to monitor only specific resources, follow the steps given below:

  1. Create a new `config.yaml` file and add Kubernetes resource configuration as described on the [source](../../configuration/source) page.
  2. Pass the YAML file as a flag to `helm install` command, e.g.:

     ```
     helm install --version v0.14.0 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
     ```

  Alternatively, you can also update the configuration at runtime as documented [here](../../configuration/#updating-the-configuration-at-runtime)

### Remove Botkube from Slack workspace

- Goto Slack <a href="https://slack.com/apps/manage">manage apps</a> page<br/>
- Click on "Botkube" and click on "Remove App" button

## Remove Botkube from Kubernetes cluster

Execute following command to completely remove Botkube and related resources from your cluster.

```bash
helm uninstall botkube --namespace botkube
```
