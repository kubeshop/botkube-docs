---
title: "Usage"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 40
---

<h3 class="section-head" id="h-show-help"><a href="#h-show-help">Debugging deployments using BotKube</a></h3>
@BotKube allows you to execute kubectl commands on your Kubernetes cluster.
Run **/botkubehelp** to find more information about the supported commands.

![help](/images/help.png)
As suggested in help message, to execute kubectl commands, send message in following format in the channel where BotKube is already added or as a direct message to BotKube.
```
@BotKube <kubectl command without `kubectl` prefix> [--cluster-name <cluster_name>]
```
See [Examples](/examples/#h-examples) for the use cases.

<h3 class="section-head" id="h-manage-notif"><a href="#h-manage-notif">Managing notifications</a></h3>
Depending upon your configuration, you will receive notifications about Kubernetes resources lifecycle events and their health.
BotKube bot allows you to enable/disable notifications only from the configured channel. Run **/botkubehelp**, the bot will reply with the help message about the supported message formats.

![help](/images/help.png)

<h3 class="section-head" id="h-view-config"><a href="#h-view-config">View BotKube configuration</a></h3>
Run **@BotKube notifier showconfig** message from the configured channel where BotKube is added. The bot will reply you with the configuration with which the controller is running.

If you wish to change the configuration, you can update config section in **helm/botkube/values.yaml** and then run **helm upgrade**.
```bash
$ helm upgrade botkube \
--set config.settings.clustername=<CLUSTER_NAME> \
--set config.settings.allowkubectl=<ALLOW_KUBECTL> \
helm/botkube
```
OR

You can also modify the controller configuration at runtime. You have to edit the configmap which will also restart the BotKube pod to update mounted configuration in the pod.

```bash
$ kubectl edit configmap botkube-configmap -n botkube
```
This command will open configmap specs in vim editor. Do the required changes, save and exit. The BotKube pod will automatically restart to have these configuration in effect.


<h3 class="section-head" id="h-check-health"><a href="#h-check-health">Check BotKube health</a></h3>
Run **@BotKube ping** to the channel where BotKube is added. The BotKube will respond you with the **PONG** message from all the configured clusters. Use `--cluster-name` flag to get response from the cluster mentioned in the flag. Else check the deployment in Kubernetes cluster in the **botkube** namespace.

![ping](/images/ping.png)
![ping](/images/mm_ping.png)


<h3 class="section-head" id="h-notifer-stop"><a href="#h-notifier-stop">Disable notifications</a></h3>
If you want to stop receiving notifications from BotKube, run
**@BotKube notifier stop**
from the configured channel where BotKube is added. You will no longer receive notifications from the BotKube

![notifier_stop](/images/notifier_stop.png)
![notifier_stop](/images/mm_notifier_stop.png)

<h3 class="section-head" id="h-notifer-start"><a href="#h-notifier-start">Enable notifications</a></h3>
If you want to receice notifications from BotKube again, run
**@BotKube notifier start**
from the configured channel where BotKube is added.

![notifier_start](/images/notifier_start.png)
![notifier_start](/images/mm_notifier_start.png)

<h3 class="section-head" id="h-notifer-status"><a href="#h-notifier-status">Check notifier status</a></h3>
Run **@BotKube notifier status** to check status of notifier if running or stopped from the configured channel.

![notifier_status](/images/notifier_status.png)
![notifier_status](/images/mm_notifier_status.png)

<h3 class="section-head" id="h-manage-filters"><a href="#h-manage-filters">Manage filters</a></h3>
BotKube allows you to manage filters using @BotKube commands
  <h4>List available filters</h4>
  Run **@BotKube filters list** to get list of available filters and their running status
  ![](/images/filters_list.png)

  <h4>Disable filter</h4>
  Run **@BotKube filters disable {filter-name}** to disable perticular filter to skip checks on resource specs
  ![](/images/filters_disable.png)

  <h4>Enable filter</h4>
  Run **@BotKube filters enable {filter-name}** to enable perticular filter to run checks on resource specs
  ![](/images/filters_enable.png)



<h3 class="section-head" id="h-kubectl-pods"><a href="#h-kubectl-pods">Run Kubectl commands</a></h3>
Run **@BotKube < kubectl command without kubectl prefix >** to get kubectl response from the cluster configured with the channel.
This command needs to be executed from configured channel else use `--cluster-name` flag described below.

![get_pods](/images/get_namespaces.png)
![get_pods](/images/mm_get_ns.png)

<h3 class="section-head" id="h-specify-cluster-name"><a href="#h-specify-cluster-name">Specify cluster name</a></h3>
To get the list of all cluster's configured in botkube, you can use the ping command. <br><br>

![ping](/images/ping.png)

For cluster-specific response,
use `--cluster-name` flag to specify the cluster's name on which command needs to be executed. 
Use of this flag allows you to get response from any channel or group where Botkube is added. 
The flag is ignored in notifier commands as they can be executed from the configured channel only.

![flag_clustername_ping](/images/flag_clustername_ping.png)
![flag_clustername_ping](/images/mm_flag_clustername_ping.png)
![flag_clustername_kubectl](/images/flag_clustername_kubectl.png)
![flag_clustername_kubectl](/images/mm_flag_clustername_kubectl.png)
