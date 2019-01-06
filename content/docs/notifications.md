+++
title = "Manage Notifications"
description = "Manage slack notifications"
date = 2019-01-04T16:59:38+05:30
weight = 30
toc = true
bref = "Guide to manage incoming slack notification by botkube"
+++

<p>Depending upon your configuration, you will receive slack notifications about kubernetes resources lifecycle events and their health.</p>

<h3 class="section-head" id="h-manage-notif"><a href="#h-manage-notif">Managing slack notifications</a></h3>
<p>botkube bot allows you to enable/disable notifications using direct messages. Send `@botkube help` in the slack channel where the bot is added or as a direct message to the botkube, the bot will reply with the help message about the supported message formats.</p>

![botkube_help](/help.png)

<h3 class="section-head" id="h-view-config"><a href="#h-view-config">View botkube configuration</a></h3>
<p>Send `@botkube notifier showconfig` message on channel where botkube is added. The bot will reply you with the configuration with which the controller is running.

If you wish to change the configuration, you can update config section in `helm/botkube/values.yaml` and then run `helm upgrade`.</p>
```bash
$ helm upgrade botkube --set config.communications.slack.channel={SLACK_CHANNEL_NAME} --set config.communications.slack.token={SLACK_API_TOKEN_FOR_THE_BOT} helm/botkube/
```

<h3 class="section-head" id="h-check-health"><a href="#h-check-health">Check botkube health</a></h3>
<p>Send `@botkube ping` to the slack channel where botkube is added. The botkube will respond you with message `PONG` if it is running. Else check the deployment in kubernetes cluster in `botkube` namespace.</p>

![ping](/ping.png)


<h3 class="section-head" id="h-notifer-stop"><a href="#h-notifier-stop">Disable slack notifications</a></h3>
<p>If you want to stop receiving slack notifications from botkube, send</p>
```
@botkube notifier stop
```
<p>to the slack channel where botkube is added. You will no longer receive notifications from the botkube</p>

![notifier_stop](/notifier_stop.png)

<h3 class="section-head" id="h-notifer-start"><a href="#h-notifier-start">Enable slack notifications</a></h3>
<p>If you want to receice slack notifications from botkube again, send</p>
```
@botkube notifier start
```
<p>to the slack channel where botkube is added.</p>

![notifier_start](/notifier_start.png)

<h3 class="section-head" id="h-notifer-status"><a href="#h-notifier-status">Check notifier status</a></h3>
<p>Send `@botkube notifier status` to check status of notifier if running or stopped</p>

![notifier_status](/notifier_status.png)

<h3 class="section-head" id="h-notif-sc"><a href="#h-notif-sc">Notification screenshots</a></h3>
<h4>Resource created</h4>
![created](/create.png)

<h4>Resource deleted</h4>
![deleted](/delete.png)

<h4>Failed to pull image</h4>
![image_failed](/image-failed.png)

<h4>Error in pod</h4>
![error](/error.png)

<h4>Readiness probe failed for the pod</h4>
![readiness](/readiness.png)
