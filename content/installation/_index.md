+++
title = "Installation"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 10
toc = true
+++
BotKube has two components that need to be installed.

1. BotKube Slack app to your Slack workspace
2. BotKube controller which will watch and send notifications to the Slack app in your workspace

<h3 class="section-head" id="h-install-BotKube-slack"><a href="#h-install-BotKube-slack">Install BotKube to the Slack workspace</a></h3>

<p>Follow the following steps to install BotKube Slack app to your Slack workspace.</p>

<h4>Install BotKube Slack app to your Slack workspace</h4>

Click the **Add to Slack** button provided to install BotKube Slack application to your workspace. Once you authorized the application, you will be provided a BOT Access token. Kindly note down that token which will be required while deploying BotKube controller to your cluster.
<a href="https://slack.com/oauth/authorize?scope=bot&client_id=12637824912.515475697794"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

Alternetively, you can install BotKube Slack app from Slack app directory.

<h4>Add BotKube user to a Slack channel</h4>

After installing BotKube app to your Slack workspace, you could see new bot user with name 'BotKube' added in your workspace. Add that bot to a Slack channel you want to receive notification in.<br>
(You can add it by inviting posting **@BotKube** message in a channel)

<h3 class="section-head" id="h-install-BotKube-k8s"><a href="#h-install-BotKube-k8s">Install BotKube controller to the kubernetes cluster</a></h3>

<h4>Using helm</h4>

- We will be using [helm](https://helm.sh/) to install our k8s controller. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already
- Clone the BotKube github repository.
```bash
$ git clone https://github.com/infracloudio/botkube.git
```

- Update default **config** in **helm/botkube/values.yaml** to watch the resources you want. (by default you will receive **create**, **delete** and **error** events for all the resources in all the namespaces.)
If you are not interested in events about perticular resource, just remove it's entry from the config file.
- Deploy BotKube controller using **helm install** in your cluster.
```bash
$ helm install --name botkube --namespace botkube --set config.communications.slack.channel=<SLACK_CHANNEL_NAME>,config.communications.slack.token=<SLACK_API_TOKEN_FOR_THE_BOT>,config.settings.clustername=<CLUSTER_NAME>,config.settings.allowkubectl=<ALLOW_KUBECTL> helm/botkube/
```
where,<br>
**SLACK_CHANNEL_NAME** is the channel name where @BotKube is added<br>
**SLACK_API_TOKEN_FOR_THE_BOT** is the Token you received after installing BotKube app to your Slack workspace<br>
**CLUSTER_NAME** is the cluster name set in the incoming messages<br>
**ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

	Configuration syntax is explained [here](/configuration).

- Send **@BotKube ping** in the channel to see if BotKube is running and responding.

<br>
<h4>Using kubectl</h4>

- Make sure that you have kubectl cli installed and have access to kubernetes cluster
- Download deployment specs yaml

```bash
$ wget -q https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml
```

- Open downloaded **deploy-all-in-one.yaml** and update the configuration.<br>
Set *SLACK_CHANNEL*, *SLACK_API_TOKEN*, *clustername*, *allowkubectl* and update the resource events configuration you want to receive notifications for in the configmap.<br>
where,<br>
**SLACK_CHANNEL** is the channel name where @BotKube is added<br>
**SLACK_API_TOKEN** is the Token you received after installing BotKube app to your Slack workspace<br>
**clustername** is the cluster name set in the incoming messages<br>
**allowkubectl** set true to allow kubectl command execution by BotKube on the cluster<br>

	Configuration syntax is explained [here](/configuration).

- Create **botkube** namespace and deploy resources

```bash
$ kubectl create ns botkube && kubectl create -f deploy-all-in-one.yaml -n botkube
```

- Check pod status in botkube namespace. Once running, send **@BotKube ping** in the Slack channel to confirm if BotKube is responding correctly.


<br>
<h3 class="section-head" id="h-uninstall-BotKube-slack"><a href="#h-uninstall-BotKube-slack">Remove BotKube from Slack workspace</a></h3>

- Goto Slack <a href="https://slack.com/apps/manage">manage apps</a> page<br>
- Click on "BotKube" and click on "Remove App" button

<h3 class="section-head" id="h-uninstall-BotKube-k8s"><a href="#h-uninstall-BotKube-k8s">Remove BotKube controller from kubernetes cluster</a></h3>
<h4>Using helm</h4>
<p>If you have installed BotKube controller using **helm**, execute following command to completely remove BotKube and related resources from your cluster</p>

```bash
$ helm delete --purge botkube
```

<h4>Using kubectl</h4>

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml -n botkube
```

