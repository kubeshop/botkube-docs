---
id: elasticsearch
title: "ElasticSearch"
sidebar_position: 5
---

## Install BotKube Backend in Kubernetes cluster

- We use [Helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **botkube** chart repository:

  ```bash
  helm repo add botkube https://charts.botkube.io
  helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  export CLUSTER_NAME={cluster_name}
  export ELASTICSEARCH_ADDRESS={elasticsearch_address}
  export ELASTICSEARCH_USERNAME={elasticsearch_username}
  export ELASTICSEARCH_PASSWORD={elasticsearch_password}
  export ELASTICSEARCH_INDEX_NAME={elasticsearch_index_name}  
  
  helm install --version v0.13.0 botkube --namespace botkube --create-namespace \
  --set communications.default-group.elasticsearch.enabled=true \
  --set communications.default-group.elasticsearch.server=${ELASTICSEARCH_ADDRESS} \
  --set communications.default-group.elasticsearch.username=${ELASTICSEARCH_USERNAME} \
  --set communications.default-group.elasticsearch.password=${ELASTICSEARCH_PASSWORD} \
  --set communications.default-group.elasticsearch.indices.default.name=${ELASTICSEARCH_INDEX_NAME} \
  --set settings.clusterName=${CLUSTER_NAME} \
  botkube/botkube
  ```

  where,<br/>
  - **ELASTICSEARCH_ADDRESS** is an address on which ElasticSearch server is reachable e.g https://example.com:9243 <br/>
  - **ELASTICSEARCH_USERNAME** is the username for authentication to Els server<br/>
  - **ELASTICSEARCH_PASSWORD** is a password for the username to authenticate with Els server<br/>
  - **ELASTICSEARCH_INDEX_NAME** _(optional)_ is an index name on which BotKube events will be stored _(default: botkube)_<br/>

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
