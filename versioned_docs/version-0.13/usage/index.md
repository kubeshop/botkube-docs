---
id: usage
title: "Usage"
sidebar_position: 3
---

## Debugging deployments using Botkube

@Botkube allows you to execute kubectl commands on your Kubernetes cluster.
Run **/botkubehelp** to find more information about the supported commands.

![help](assets/help.png)

By default, kubectl command execution is disabled. To enable this feature, set `executors.<configuration-name>.kubectl.enabled: true` in [Executor configuration](../configuration/executor).

As suggested in help message, to execute kubectl commands, send message in following format in the channel where Botkube is already added or as a direct message to Botkube.

```
@Botkube <kubectl command without `kubectl` prefix> [--cluster-name <cluster_name>]
```

### Checking allowed commands

While deploying Botkube controller, you can specify which kubectl commands you want to allow Botkube to execute through <a href="../configuration">configuration</a>.

To check which commands are allowed for users to execute through Botkube, run **@Botkube commands list**

![commands_list](assets/commands_list.png)

### Run Kubectl commands

Botkube configuration allows you to give execution of kubectl commands

Run **@Botkube < kubectl command without kubectl prefix >** to get kubectl response from the cluster configured with the channel.
This command needs to be executed from configured channel else use `--cluster-name` flag described below.

![get_pods](assets/get_namespaces.png)
![get_pods](assets/mm_get_ns.png)

### Specify cluster name

If you have installed Botkube backend on multiple clusters, you can pass `--cluster-name` flag to execute kubectl command on specific cluster.

To get the list of all clusters configured in botkube, you can use the ping command.

![ping](assets/ping.png)

For cluster-specific response,
use `--cluster-name` flag to specify the cluster's name on which command needs to be executed.
Use of this flag allows you to get response from any channel or group where Botkube is added.
The flag is ignored in notifier commands as they can be executed from the configured channel only.

![flag_clustername_ping](assets/flag_clustername_ping.png)
![flag_clustername_ping](assets/mm_flag_clustername_ping.png)
![flag_clustername_kubectl](assets/flag_clustername_kubectl.png)
![flag_clustername_kubectl](assets/mm_flag_clustername_kubectl.png)

See [Examples](../examples/#h-examples) for the use cases.

## Check Botkube health

Run **@Botkube ping** to the channel where Botkube is added. The Botkube will respond you with the **PONG** message from all the configured clusters. Use `--cluster-name` flag to get response from the cluster mentioned in the flag. Else check the deployment in Kubernetes cluster in the **botkube** namespace.

![ping](assets/ping.png)
![ping](assets/mm_ping.png)

## Managing notifications

Depending upon your configuration, you will receive notifications about Kubernetes resources lifecycle events and their health.
Botkube bot allows you to enable/disable notifications on each configured channel separately. Run **/botkubehelp**, the bot will reply with the help message about the supported message formats.

### View Botkube configuration

Run **@Botkube notifier showconfig** message from the configured channel where Botkube is added. The bot will reply you with the configuration with which the controller is running.

If you wish to change the configuration, you can run **helm upgrade**:

```bash
export CLUSTER_NAME={cluster_name}
export ALLOW_KUBECTL={allow_kubectl}

helm upgrade botkube \
--set settings.clusterName=${CLUSTER_NAME} \
--set executors.kubectl-read-only.kubectl.enabled=${ALLOW_KUBECTL} \
helm/botkube
```

OR

You can also modify the controller configuration at runtime. You have to edit the configmap which will also restart the Botkube pod to update mounted configuration in the pod.

```bash
kubectl edit configmap botkube-global-config -n botkube
```

This command will open configmap specs in vim editor. Do the required changes, save and exit. The Botkube pod will automatically restart to have these configuration in effect.

### Disable notifications

If you want to stop receiving notifications from Botkube, run **@Botkube notifier stop** from the configured channel where Botkube is added. You will no longer receive notifications from the Botkube in a given communication platform.

![notifier-stop](assets/notifier-stop.png)

### Enable notifications

If you want to receive Botkube notifications again, run **@Botkube notifier start** from the configured channel where Botkube is added.

:::note
For MS Teams integration notifications are disabled by default. You need to turn them on manually using this command.
:::

![notifier-start](assets/notifier-start.png)

### Check notifier status

Run **@Botkube notifier status** to check if notifications are enabled for a given communication platform.

![notifier-status](assets/notifier-status.png)

## Manage filters

Botkube allows you to manage filters using @Botkube commands

### List available filters

Run **@Botkube filters list** to get list of available filters and their running status
![List available filters](assets/filters_list.png)

### Disable filter

Run **@Botkube filters disable {filter-name}** to disable perticular filter to skip checks on resource specs
![Disable filter](assets/filters_disable.png)

### Enable filter

Run **@Botkube filters enable {filter-name}** to enable perticular filter to run checks on resource specs
![Enable filter](assets/filters_enable.png)

## Filter events using Annotations

Using Annotations, it is possible -

- to make Botkube ignore events on a specific resource
- Send notification about specific resource to different channel and the configured one

### Ignore events

Annotation `botkube.io/disable: true` disables event notifications for the annotated object.

### Send notification to non-default channel

Annotation `botkube.io/channel: <channel_name>` sends events notifications of the annotated object to the mentioned channel.

:::note
Make sure that you have added Botkube in the channel you want to send notification in
:::
