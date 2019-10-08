+++
title = "Slack"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 10
toc = true
+++

<h3 class="section-head" id="h-install-BotKube-slack"><a href="#h-install-BotKube-slack">Install BotKube to the Slack workspace</a></h3>

<p>Follow the steps below to install BotKube Slack app to your Slack workspace.</p>

<h4 id="h-install-BotKube-slackapp">Install BotKube Slack app to your Slack workspace</h4>

Click the **Add to Slack** button provided to install BotKube Slack application to your workspace. Once you have authorized the application, you will be provided a BOT Access token. Kindly note down that token as it will be required while deploying BotKube backend to your Kubernetes cluster.

<a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=12637824912.515475697794"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

Alternetively, you can install BotKube Slack app [from Slack app directory](https://slack.com/apps/AF5DZLHPC-botkube).

<h4 id="h-add-botkube-slackchannel">Add BotKube user to a Slack channel</h4>

After installing BotKube app to your Slack workspace, you could see new bot user with name "BotKube" added in your workspace. Add that bot to a Slack channel you want to receive notification in.<br> (You can add it by inviting **@BotKube** in a channel)

<h3 class="section-head" id="h-install-BotKube-k8s"><a href="#h-install-BotKube-k8s">Install BotKube Backend in Kubernetes cluster</a></h3>

<h4>Using helm</h4>

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already
- Add **infracloudio** chart repository

```bash
$ helm repo add infracloudio https://infracloudio.github.io/charts
```

- Deploy BotKube backend using **helm install** in your cluster.

```bash
$ helm repo update
$ helm install --version v0.9.0 --name botkube --namespace botkube \
--set config.communications.slack.enabled=true \
--set config.communications.slack.channel=<SLACK_CHANNEL_NAME> \
--set config.communications.slack.token=<SLACK_API_TOKEN_FOR_THE_BOT> \
--set image.repository=infracloudio/botkube \
--set image.tag=v0.9.0 \
infracloudio/botkube
```
where,<br>
- **SLACK_CHANNEL_NAME** is the channel name where @BotKube is added<br>
- **SLACK_API_TOKEN_FOR_THE_BOT** is the Token you received after installing BotKube app to your Slack workspace<br>
- **CLUSTER_NAME** is the cluster name set in the incoming messages<br>
- **ALLOW_KUBECTL** set true to allow kubectl command execution by BotKube on the cluster<br>

   Configuration syntax is explained [here](/configuration).

Send **@BotKube ping** in the channel to see if BotKube is running and responding.

{{% notice note %}}
  With default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:
{{% /notice%}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://github.com/infracloudio/botkube/tree/develop/helm/botkube/sample-res-config.yaml)

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
              - dev
          events:
            - create
            - update
            - delete
            - error
    ```
  - Pass the yaml file as a flag to `helm install` command.
    e.g

    ```
    helm install --version v0.9.0 --name botkube --namespace botkube -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)


<h4>Using kubectl</h4>

- Make sure that you have kubectl cli installed and have access to Kubernetes cluster
- Download deployment specs yaml

```bash
$ wget -q https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml
```

- Open downloaded **deploy-all-in-one.yaml** and update the configuration.<br>
Set *SLACK_ENABLED*, *SLACK_CHANNEL*, *SLACK_API_TOKEN*, *clustername*, *allowkubectl* and update the resource events configuration you want to receive notifications for in the configmap.<br>

where,<br>
- **SLACK_ENABLED** set true to enable Slack support for BotKube<br>
- **SLACK_CHANNEL** is the channel name where @BotKube is added<br>
- **SLACK_API_TOKEN** is the Token you received after installing BotKube app to your Slack workspace<br>
- **clustername** is the cluster name set in the incoming messages<br>
- **allowkubectl** set true to allow kubectl command execution by BotKube on the cluster<br>

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

<h3 class="section-head" id="h-uninstall-BotKube-k8s"><a href="#h-uninstall-BotKube-k8s">Remove BotKube from Kubernetes cluster</a></h3>
<h4>Using helm</h4>
<p>If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster</p>

```bash
$ helm delete --purge botkube
```

<h4>BotKube install: Using kubectl</h4>

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml -n botkube
```

