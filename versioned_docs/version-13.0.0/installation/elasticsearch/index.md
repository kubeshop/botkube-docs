---
id: elasticsearch
title: "ElasticSearch"
sidebar_position: 5
---

## Install BotKube Backend in Kubernetes cluster

### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  $ helm repo add botkube https://charts.botkube.io
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace \
  --set communications.elasticsearch.enabled=true \
  --set communications.elasticsearch.server=<ELASTICSEARCH_ADDRESS> \
  --set communications.elasticsearch.username=<ELASTICSEARCH_USERNAME> \
  --set communications.elasticsearch.password=<ELASTICSEARCH_PASSWORD> \
  --set communications.elasticsearch.index.name=<ELASTICSEARCH_INDEX_NAME> \
  --set communications.elasticsearch.index.type=<ELASTICSEARCH_INDEX_TYPE> \
  --set communications.elasticsearch.index.shards=<ELASTICSEARCH_INDEX_SHARDS> \
  --set communications.elasticsearch.index.replicas=<ELASTICSEARCH_INDEX_REPLICAS> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set image.tag=v0.12.4 \
  botkube/botkube
  ```

  where,<br/>
    - **ELASTICSEARCH_ADDRESS** is an address on which ElasticSearch server is reachable e.g https://example.com:9243 <br/>
    - **ELASTICSEARCH_USERNAME** is the username for authentication to Els server<br/>
    - **ELASTICSEARCH_PASSWORD** is a password for the username to authenticate with Els server<br/>
    - **ELASTICSEARCH_INDEX_NAME** _(optional)_ is an index name on which BotKube events will be stored _(default: botkube)_<br/>
    - **ELASTICSEARCH_INDEX_TYPE** _(optional)_ contains type for the BotKube index _(default: botkube-event)_<br/>
    - **ELASTICSEARCH_INDEX_SHARDS** _(optional)_ denotes number of shards for BotKube index _(default: 1)_<br/>
    - **ELASTICSEARCH_INDEX_REPLICAS** _(optional)_ is the number of replicas of the shards  _(default: 0)_<br/>
    - **CLUSTER_NAME** is the cluster name set in the incoming messages<br/>

  Configuration syntax is explained [here](../../configuration).
  Full Helm chart parameters list is documented [here](../../configuration/helm-chart-parameters).

  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br/>
  If you wish to monitor only specific resources, follow the steps given below:

  1. Create a new `config.yaml` file and add Kubernetes resource configuration as described on the [source](../../configuration/source) page.
  2. Pass the YAML file as a flag to `helm install` command, e.g.:

    ```bash
    helm install --version v0.12.4 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](../../configuration/#updating-the-configuration-at-runtime)

## Remove BotKube

### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster

```bash
$ helm uninstall botkube
```
