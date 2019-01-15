---
title: "Usage"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 40
---

<h3 class="section-head" id="h-show-help"><a href="#h-show-help">Debugging deployments using BotKube</a></h3>
@BotKube allows you to execute kubectl commands on your kubernetes cluster.
Send **@BotKube help** in the slack channel or directly to the BotKube user to find more information about the supported commands.
![help](/help.png)
As suggested in help message, to execute kubectl commands, send message in following format in the slack chennel where BotKube is already added or as a direct message to BotKube.
```
@BotKube <kubectl command without `kubectl` prefix>
```
See [Examples](/examples/#h-examples) for the use cases.

<h3 class="section-head" id="h-manage-notif"><a href="#h-manage-notif">Managing slack notifications</a></h3>
Depending upon your configuration, you will receive slack notifications about kubernetes resources lifecycle events and their health.
BotKube bot allows you to enable/disable notifications using direct messages. Send **@BotKube help** in the slack channel where the bot is added or as a direct message to the BotKube, the bot will reply with the help message about the supported message formats.

![BotKube_help](/help.png)

<h4 class="section-head" id="h-view-config"><a href="#h-view-config">View BotKube configuration</a></h4>
Send **@BotKube notifier showconfig** message on a channel where BotKube is added. The bot will reply you with the configuration with which the controller is running.

If you wish to change the configuration, you can update config section in **helm/botkube/values.yaml** and then run **helm upgrade**.
```bash
$ helm upgrade BotKube --set config.communications.slack.channel={SLACK_CHANNEL_NAME} --set config.communications.slack.token={SLACK_API_TOKEN_FOR_THE_BOT} helm/BotKube/
```

<h4 class="section-head" id="h-check-health"><a href="#h-check-health">Check BotKube health</a></h4>
Send **@BotKube ping** to the slack channel where BotKube is added. The BotKube will respond you with message **PONG** if it is running. Else check the deployment in kubernetes cluster in the **botkube** namespace.

![ping](/ping.png)


<h4 class="section-head" id="h-notifer-stop"><a href="#h-notifier-stop">Disable slack notifications</a></h4>
If you want to stop receiving slack notifications from BotKube, send
**@BotKube notifier stop**
to the slack channel where BotKube is added. You will no longer receive notifications from the BotKube

![notifier_stop](/notifier_stop.png)

<h4 class="section-head" id="h-notifer-start"><a href="#h-notifier-start">Enable slack notifications</a></h4>
If you want to receice slack notifications from BotKube again, send
**@BotKube notifier start**
to the slack channel where BotKube is added.

![notifier_start](/notifier_start.png)

<h4 class="section-head" id="h-notifer-status"><a href="#h-notifier-status">Check notifier status</a></h4>
Send **@BotKube notifier status** to check status of notifier if running or stopped

![notifier_status](/notifier_status.png)

