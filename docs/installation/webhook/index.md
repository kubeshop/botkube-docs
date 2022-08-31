---
id: webhook
title: "Outgoing webhook"
sidebar_position: 6
---

## Install BotKube Backend in Kubernetes cluster

BotKube can be integrated with external apps via Webhooks. A webhook is essentially a POST request sent to a callback URL. So you can configure BotKube to send events on specified URL.

- We use [Helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  helm repo add botkube https://charts.botkube.io
  helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  export CLUSTER_NAME={cluster_name}
  export WEBHOOK_URL={url}
  
  helm install --version v0.13.0 botkube --namespace botkube --create-namespace \
  --set communications.default-group.webhook.enabled=true \
  --set communications.default-group.webhook.url=${WEBHOOK_URL} \
  --set settings.clusterName=${CLUSTER_NAME} \
  botkube/botkube
  ```

  where,<br/>
    - **WEBHOOK_URL** is an outgoing webook URL to which BotKube will POST the events <br/>
    - **CLUSTER_NAME** is the cluster name set in the incoming messages<br/>

  Configuration syntax is explained [here](../../configuration).
  Full Helm chart parameters list is documented [here](../../configuration/helm-chart-parameters).

  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br/>
  If you wish to monitor only specific resources, follow the steps given below:

  1. Create a new `config.yaml` file and add Kubernetes resource configuration as described on the [source](../../configuration/source) page.
  2. Pass the YAML file as a flag to `helm install` command, e.g.:

      ```
      helm install --version v0.13.0 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
      ```

  Alternatively, you can also update the configuration at runtime as documented [here](../../configuration/#updating-the-configuration-at-runtime)

## Remove BotKube

Execute following command to completely remove BotKube and related resources from your cluster

```bash
helm uninstall botkube
```
