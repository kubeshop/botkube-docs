+++
title = "Getting Started"
description = "Guide to get started"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 20
toc = true
bref = "Guide to install botkube app in your slack workspace and required botkube controller in your kubernetes cluster"
+++

<h3 class="section-head" id="h-install-botkube-slack"><a href="#h-install-botkube-slack">Install botkube to slack workspace</a></h3>

<p>Follow the following steps to install botkube slack app to your slack workspace.</p>

<h4>Install botkube app to your slack workspace</h4>

Click the "Add to Slack" button provided to install `botkube` slack application to your workspace. Once you authorized the application, you will be provided a BOT Access token. Kindly note down that token which will be required while deploying botkube controller to your cluster.

<a href="https://slack.com/oauth/authorize?scope=bot&client_id=12637824912.515475697794"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

Alternetively, you can install botkube slack app from slack app directory.

<h4>Add botkube user to a slack channel</h4>

After installing botkube app to your slack workspace, you could see new bot user with name 'botkube' create in your workspace. Add that bot to a slack channel you want to receive notification in.
(You can add it by inviting using `@botkube` message in a required channel)

<h3 class="section-head" id="h-install-botkube-k8s"><a href="#h-install-botkube-k8s">Install botkube controller to kubernetes cluster</a></h3>

<h4>Using helm</h4>

- We will be using [helm](https://helm.sh/) to install our k8s controller. Follow https://docs.helm.sh/using_helm/#installing-helm guide to install helm if you don't have it installed already
- Clone the botkube github repository.
```bash
$ git clone https://github.com/infracloudio/botkube.git
```

- Update default `config` in `helm/botkube/values.yaml` to watch the resources you want. (by default you will receive `create`, `delete` and `error` events for all the resources in all the namespaces.)
If you are not interested in events about perticular resource, just remove it's entry from the config file.
- Deploy botkube using `helm install` in your cluster.
```bash
$ helm install --name botkube --namespace botkube --set config.communications.slack.channel={SLACK_CHANNEL_NAME} --set config.communications.slack.token={SLACK_API_TOKEN_FOR_THE_BOT} helm/botkube/
```
where,<br>
`SLACK_CHANNEL_NAME` is the channel name where @botkube is added<br>
`SLACK_API_TOKEN_FOR_THE_BOT` is the Token you received after install botkube app to your slack workspace

- Send `@botkube help` in the channel to see if `botkube` is responding.

<h3 class="section-head" id="h-botkube-config"><a href="#h-botkube-config">Configuration</a></h3>
<p>
botkube reads configurations from `config.yaml` file placed at `CONFIG_PATH`

e.g https://github.com/infracloudio/botkube/blob/master/config.yaml

Supported resources for configuration:

- pods
- nodes
- services
- namespaces
- replicationcontrollers
- persistentvolumes
- persistentvolumeclaims
- secrets
- configmaps
- deployments
- daemonsets
- replicasets
- ingresses
- jobs
- roles
- rolebindings
- clusterroles
- clusterrolebindings
</p>
