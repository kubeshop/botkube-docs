---
title: "Usage"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 40
---

<h3 class="section-head" id="h-show-help"><a href="#h-show-help">Debugging deployments using BotKube</a></h3>
@BotKube allows you to execute kubectl commands on your Kubernetes cluster.
Send **@BotKube help** in the Slack channel or directly to the BotKube user to find more information about the supported commands.
![help](/images/help.png)
As suggested in help message, to execute kubectl commands, send message in following format in the Slack chennel where BotKube is already added or as a direct message to BotKube.
```
@BotKube <kubectl command without `kubectl` prefix>
```
See [Examples](/examples/#h-examples) for the use cases.

<h3 class="section-head" id="h-manage-notif"><a href="#h-manage-notif">Managing Slack notifications</a></h3>
Depending upon your configuration, you will receive Slack notifications about Kubernetes resources lifecycle events and their health.
BotKube bot allows you to enable/disable notifications using direct messages. Send **@BotKube help** in the Slack channel where the bot is added or as a direct message to the BotKube, the bot will reply with the help message about the supported message formats.

![BotKube_help](/images/help.png)

<h4 class="section-head" id="h-view-config"><a href="#h-view-config">View BotKube configuration</a></h4>
Send **@BotKube notifier showconfig** message on a channel where BotKube is added. The bot will reply you with the configuration with which the controller is running.

If you wish to change the configuration, you can update config section in **helm/botkube/values.yaml** and then run **helm upgrade**.
```bash
$ helm upgrade botkube --set config.communications.slack.channel=<SLACK_CHANNEL_NAME>,config.communications.slack.token=<SLACK_API_TOKEN_FOR_THE_BOT>,config.settings.clustername=<CLUSTER_NAME>,config.settings.allowkubectl=<ALLOW_KUBECTL> helm/botkube/
```
OR

You can also modify the controller configuration at runtime. You have to edit the configmap which will also restart the BotKube pod to update mounted configuration in the pod.

```bash
$ kubectl edit configmap botkube-configmap -n botkube
```
This command will open configmap specs in vim editor. Do the required changes, save and exit. The BotKube pod will automatically restart to have these configuration in effect.


<h4 class="section-head" id="h-check-health"><a href="#h-check-health">Check BotKube health</a></h4>
Send **@BotKube ping** to the Slack channel where BotKube is added. The BotKube will respond you with message **PONG** if it is running. Else check the deployment in Kubernetes cluster in the **botkube** namespace.

![ping](/images/ping.png)


<h4 class="section-head" id="h-notifer-stop"><a href="#h-notifier-stop">Disable Slack notifications</a></h4>
If you want to stop receiving Slack notifications from BotKube, send
**@BotKube notifier stop**
to the Slack channel where BotKube is added. You will no longer receive notifications from the BotKube

![notifier_stop](/images/notifier_stop.png)

<h4 class="section-head" id="h-notifer-start"><a href="#h-notifier-start">Enable Slack notifications</a></h4>
If you want to receice Slack notifications from BotKube again, send
**@BotKube notifier start**
to the Slack channel where BotKube is added.

![notifier_start](/images/notifier_start.png)

<h4 class="section-head" id="h-notifer-status"><a href="#h-notifier-status">Check notifier status</a></h4>
Send **@BotKube notifier status** to check status of notifier if running or stopped

![notifier_status](/images/notifier_status.png)

