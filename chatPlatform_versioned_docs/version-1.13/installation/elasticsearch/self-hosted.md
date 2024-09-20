---
id: elasticsearch-self-hosted
title: "Elasticsearch for self-hosted Botkube"
slug: self-hosted
sidebar_position: 1
---

## Prerequisites

- Botkube CLI installed according to the [Getting Started guide](../../cli/getting-started.mdx#installation)
- Access to Kubernetes cluster
- Elasticsearch server

## Install Botkube in Kubernetes cluster

To deploy Botkube agent in your cluster, run:

```bash
export CLUSTER_NAME={cluster_name}
export ELASTICSEARCH_ADDRESS={elasticsearch_address}
export ELASTICSEARCH_USERNAME={elasticsearch_username}
export ELASTICSEARCH_PASSWORD={elasticsearch_password}
export ELASTICSEARCH_INDEX_NAME={elasticsearch_index_name}

botkube install --version v1.13.0 \
--set communications.default-group.elasticsearch.enabled=true \
--set communications.default-group.elasticsearch.server=${ELASTICSEARCH_ADDRESS} \
--set communications.default-group.elasticsearch.username=${ELASTICSEARCH_USERNAME} \
--set communications.default-group.elasticsearch.password=${ELASTICSEARCH_PASSWORD} \
--set communications.default-group.elasticsearch.indices.default.name=${ELASTICSEARCH_INDEX_NAME} \
--set settings.clusterName=${CLUSTER_NAME}
```

where:

- **ELASTICSEARCH_ADDRESS** is an address on which Elasticsearch server is reachable e.g https://example.com:9243,
- **ELASTICSEARCH_USERNAME** is the username for authentication to Els server,
- **ELASTICSEARCH_PASSWORD** is a password for the username to authenticate with Els server,
- **ELASTICSEARCH_INDEX_NAME** _(optional)_ is an index name on which Botkube events will be stored _(default: botkube)_.

Configuration syntax is explained [here](../../self-hosted-configuration).
All possible installation parameters are documented [here](../../self-hosted-configuration/helm-chart-parameters).

## Remove Botkube from Kubernetes cluster

Execute the following command to completely remove Botkube and related resources from your cluster:

```bash
botkube uninstall
```
