---
title: "ElasticSearch notifier development"
weight: 11
---

To develop BotKube with Elasticsearch notifier enabled, install it locally:

1. Install Elasticsearch:

    ```bash
    helm repo add elastic https://helm.elastic.co
    helm install elasticsearch elastic/elasticsearch --set replicas=1 --set resources.requests.cpu="100m" --set resources.requests.memory="512M" --wait
    ```

1. Install BotKube with Elasticsearch, according to the [Elasticsearch installation](/installation/elasticsearch) instruction, where:

    - `ELASTICSEARCH_USERNAME` is `elastic`,
    - `ELASTICSEARCH_PASSWORD` is `changeme`,
    - `ELASTICSEARCH_ADDRESS` is `http://elasticsearch-master.default:9200`.

    You don't need to set index name, type, shards and replicas.


To review if the events are properly saved in Elasticsearch, follow these steps:

1. Do port forward:

    ```bash
    kubectl port-forward svc/elasticsearch-master 9200
    ```

1. Fetch Elasticsearch indices:

    ```bash
    curl http://localhost:9200/_cat/indices
    ```


1. Copy the index name with the `botkube-` prefix and export it as environment variable:

    ```bash
    INDEX_NAME="botkube-2022-06-06"
    ```

1. See Elasticsearch index details with logged events:

    ```bash
    curl http://localhost:9200/$INDEX_NAME/_search\?pretty
    ```
