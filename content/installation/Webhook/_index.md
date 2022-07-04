+++
title = "Outgoing Webhook"
draft = false
weight = 40
toc = true
+++

### Install BotKube Backend in Kubernetes cluster

BotKube can be integrated with external apps via Webhooks. A webhook is essentially a POST request sent to a callback URL. So you can configure BotKube to send events on specified URL.

#### Using helm

- We will be using [helm](https://helm.sh/) to install BotKube in Kubernetes. Follow [this](https://docs.helm.sh/using_helm/#installing-helm) guide to install helm if you don't have it installed already.
- Add **infracloudio** chart repository:

  ```bash
  $ helm repo add infracloudio https://infracloudio.github.io/charts
  $ helm repo update
  ```

- Deploy BotKube backend using **helm install** in your cluster:

  ```bash
  $ helm install --version v0.12.4 botkube --namespace botkube --create-namespace \
  --set communications.webhook.enabled=true \
  --set communications.webhook.url=<WEBHOOK_URL> \
  --set config.settings.clustername=<CLUSTER_NAME> \
  --set image.repository=infracloudio/botkube \
  --set image.tag=v0.12.4 \
  infracloudio/botkube
  ```

  where,<br>
  - **WEBHOOK_URL** is an outgoing webook URL to which BotKube will POST the events <br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>

   Configuration syntax is explained [here](/configuration).
   Complete list of helm options is documented [here](/configuration/helm-options).

  {{% notice note %}}
  With the default configuration, BotKube will watch all the resources in all the namespaces for _create_, _delete_ and _error_ events.<br>
  If you wish to monitor only specific resources, follow the steps given below:
  {{% /notice%}}

  - Create new file config.yaml and add resource configuration as described on the [configuration](/configuration) page.

    (You can refer sample config from https://raw.githubusercontent.com/infracloudio/botkube/v0.12.4/helm/botkube/sample-res-config.yaml)

  ```yaml
  config:
    ## Resources you want to watch
    resources:
    - name: v1/pods        # Name of the resource. Resource name must be in
                           # group/version/resource (G/V/R) format
                           # resource name should be plural
                           # (e.g apps/v1/deployments, v1/pods)
      namespaces:          # List of namespaces, "all" will watch all the namespaces
        include:
        - all
        ignore:            # List of namespaces to be ignored, used only with include: all
        - kube-system      # example : include [all], ignore [x,y,z]
      events:              # List of lifecycle events you want to receive,
                           # e.g create, update, delete, error OR all
      - create
      - delete
      - error
    - name: batch/v1/jobs
      namespaces:
        include:
        - ns1
        - ns2
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
  - Pass the YAML file as a flag to `helm install` command, e.g.:

    ```bash
    $ helm install --version v0.12.4 --name botkube --namespace botkube --create-namespace -f /path/to/config.yaml --set=...other args..
    ```

  Alternatively, you can also update the configuration at runtime as documented [here](/configuration/#updating-the-configuration-at-runtime)


#### Using kubectl

- Make sure that you have kubectl cli installed and have access to Kubernetes cluster.
- Download deployment specs YAML:

  ```bash
  $ wget -q https://raw.githubusercontent.com/infracloudio/botkube/v0.12.4/deploy-all-in-one.yaml
  ```

- Open downloaded **deploy-all-in-one.yaml** and update the configuration.<br>

  Set *WEBHOOK_ENABLED*=true, *WEBHOOK_URL*, *clustername* and update the resource events configuration you want to receive notifications for in the configmap.<br>

  where,<br>
  - **WEBHOOK_URL** is an outgoing webook URL to which BotKube will POST the events <br>
  - **CLUSTER_NAME** is the cluster name set in the incoming messages<br>

- Deploy the resources:

  ```bash
  $ kubectl create -f deploy-all-in-one.yaml
  ```

- Check pod status in botkube namespace.

### Remove BotKube

#### Using helm

If you have installed BotKube backend using **helm**, execute following command to completely remove BotKube and related resources from your cluster

```bash
$ helm uninstall botkube
```

#### Using kubectl

```bash
$ kubectl delete -f https://raw.githubusercontent.com/infracloudio/botkube/v0.12.4/deploy-all-in-one.yaml
```

