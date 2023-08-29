---
id: elasticsearch-develop
title: "ElasticSearch notifier development"
sidebar_position: 3
---

The easiest way to develop Botkube with Elasticsearch notifier enabled is to install Elasticsearch on your local Kubernetes cluster via [ECK](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-deploy-eck.html).

## Steps

1. Install Elasticsearch:
   1. Install ECK custom resource definitions:
      ```bash
      kubectl create -f https://download.elastic.co/downloads/eck/2.9.0/crds.yaml
      ```
   2. Install ECK operator:
      ```bash
      kubectl apply -f https://download.elastic.co/downloads/eck/2.9.0/operator.yaml
      ```
   3. Deploy Elasticsearch:
      ```bash
      cat <<EOF | kubectl apply -f -
      apiVersion: elasticsearch.k8s.elastic.co/v1
      kind: Elasticsearch
      metadata:
        name: elasticsearch
      spec:
        version: 8.9.1
        nodeSets:
        - name: default
          count: 1
          config:
            node.store.allow_mmap: false
      EOF
      ```

1. Install Botkube with Elasticsearch, according to the [Elasticsearch installation](../../installation/elasticsearch) instruction, where:

   - `ELASTICSEARCH_USERNAME` is `elastic`,
   - `ELASTICSEARCH_PASSWORD` is `$PASSWORD`,
   - `ELASTICSEARCH_ADDRESS` is `http://elasticsearch-es-internal-http.default:9200`.

   You don't need to set index name, type, shards and replicas.

To review if the events are properly saved in Elasticsearch, follow these steps:

1. Do port forward:

   ```bash
   kubectl port-forward svc/elasticsearch-es-internal-http 9200
   ```

1. Retrieve password
   ```bash
   PASSWORD=$(kubectl get secret elasticsearch-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
   ```

1. Fetch Elasticsearch indices:

   ```bash
   curl -u "elastic:$PASSWORD" -k https://localhost:9200/_cat/indices
   ```

1. Copy the index name with the `botkube-` prefix and export it as environment variable. For example:

   ```bash
   export INDEX_NAME="botkube-2022-06-06"
   ```

1. See Elasticsearch index details with logged events:

   ```bash
   curl -u "elastic:$PASSWORD" -k https://localhost:9200/$INDEX_NAME/_search\?pretty
   ```
