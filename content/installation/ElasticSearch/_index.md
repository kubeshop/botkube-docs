+++
title = "ElasticSearch"
draft = false
weight = 30
toc = true
+++

### Install BotKube Backend in Kubernetes cluster

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already
- Add **infracloudio** chart repository

  ```bash
  $ helm repo add infracloudio https://infracloudio.github.io/charts
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster.

  {{< tabs >}}
  {{% tab name="Helm 3" %}}

  ```bash
  $ helm install --version v0.10.0 botkube --namespace botkube \
  --set config.communications.elasticsearch.enabled=true \
  --set config.communications.elasticsearch.server=<ELASTICSEARCH_ADDRESS> \
  --set config.communications.elasticsearch.username=<ELASTICSEARCH_USERNAME> \
  --set config.communications.elasticsearch.password=<ELASTICSEARCH_PASSWORD> \
  --set config.communications.elasticsearch.index.name=<ELASTICSEARCH_INDEX_NAME> \
  --set config.communications.elasticsearch.index.type=<ELASTICSEARCH_INDEX_TYPE> \
  --set config.communications.elasticsearch.index.shards=<ELASTICSEARCH_INDEX_SHARDS> \
  --set config.communications.elasticsearch.index.replicas=<ELASTICSEARCH_INDEX_REPLICAS> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=v0.10.0 \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{% tab name="Helm 2" %}}

  ```bash
  $ helm install --version v0.10.0 --name botkube --namespace botkube \
  --set config.communications.elasticsearch.enabled=true \
  --set config.communications.elasticsearch.server=<ELASTICSEARCH_ADDRESS> \
  --set config.communications.elasticsearch.username=<ELASTICSEARCH_USERNAME> \
  --set config.communications.elasticsearch.password=<ELASTICSEARCH_PASSWORD> \
  --set config.communications.elasticsearch.index.name=<ELASTICSEARCH_INDEX_NAME> \
  --set config.communications.elasticsearch.index.type=<ELASTICSEARCH_INDEX_TYPE> \
  --set config.communications.elasticsearch.index.shards=<ELASTICSEARCH_INDEX_SHARDS> \
  --set config.communications.elasticsearch.index.replicas=<ELASTICSEARCH_INDEX_REPLICAS> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=v0.10.0 \
  infracloudio/botkube
  ```

  {{% /tab %}}
  {{< /tabs >}}

  where,<br>
  - **ELASTICSEARCH_ADDRESS** is an address on which ElasticSearch server is reachable e.g https://example.com:9243 <br>
  - **ELASTICSEARCH_USERNAME** is the username for authentication to Els server<br>
  - **ELASTICSEARCH_PASSWORD** is a password for the username to authenticate with Els server<br>
  - **ELASTICSEARCH_INDEX_NAME** _(optional)_ is an index name on which BotKube events will be stored _(default: botkube)_<br>
  - **ELASTICSEARCH_INDEX_TYPE** _(optional)_ contains type for the BotKube index _(default: botkube-event)_<br>
  - **ELASTICSEARCH_INDEX_SHARDS** _(optional)_ denotes number of shards for BotKube index _(default: 1)_<br>
  - **ELASTICSEARCH_INDEX_REPLICAS** _(optional)_ is the number of replicas of the shards  _(default: 0)_<br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>

     Configuration syntax is explained [here](/configuration).

  {{% notice note %}}
    With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
    If you wish to monitor only specific resources, follow the steps given below:
  {{% /notice%}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://github.com/infracloudio/botkube/tree/master/helm/botkube/sample-res-config.yaml)

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
              -
          events:
            - create
            - update
            - delete
            - error
          updateSetting:
            includeDiff: true
            fields:
              - spec.template.spec.containers[*].image
              - status.conditions[*].type
    ```
  - Pass the yaml file as a flag to `helm install` command.
    e.g

    ```
    helm install --version v0.10.0 --name botkube --namespace botkube -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)


#### Using kubectl

- Make sure that you have kubectl cli installed and have access to Kubernetes cluster
- Download deployment specs yaml

```bash
$ wget -q https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml
```

- Open downloaded **deploy-all-in-one.yaml** and update the configuration.<br>

Set *ELASTICSEARCH_ENABLED*=true, *ELASTICSEARCH_USERNAME*, *ELASTICSEARCH_PASSWORD*, *clustername*, index settings and update the resource events configuration you want to receive notifications for in the configmap.<br>

where,<br>
- **ELASTICSEARCH_ADDRESS** is an address on which ElasticSearch server is reachable e.g https://example.com:9243 <br>
- **ELASTICSEARCH_USERNAME** is the username for authentication to Els server<br>
- **ELASTICSEARCH_PASSWORD** is a password for the username to authenticate with Els server<br>

- Create **botkube** namespace and deploy resources

```bash
$ kubectl create ns botkube && kubectl create -f deploy-all-in-one.yaml -n botkube
```

- Check pod status in botkube namespace.

### Remove BotKube

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster

```bash
$ helm delete --purge botkube
```

#### BotKube install: Using kubectl

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/master/deploy-all-in-one.yaml -n botkube
```

