---
id: contribute
title: "Contribute"
sidebar_position: 1
---

# How to Contribute to Botkube

We'd love your help!

Botkube is [MIT Licensed](/license/) and accepts contributions via GitHub pull requests. This document outlines some of the conventions on development workflow, commit message formatting, contact points and other resources to make it easier to get your contributions accepted.

We gratefully welcome improvements to [documentation](https://botkube.io/ "Go to documentation site") as well as to code.

## Contributing to documentation

You can contribute to documentation by following [these instructions](https://github.com/kubeshop/botkube-docs#contributing "Contributing to Botkube Docs")

## Compile Botkube from source code

Before you proceed, make sure you have installed Botkube Slack/Mattermost/Teams app and copied the required token as per the steps documented [here](/docs/installation)

### Prerequisite

- Make sure you have [`go 1.18`](https://go.dev) installed.
- You will also need `make` and [`docker`](https://docs.docker.com/install/) installed on your machine.
- Clone the source code

  ```sh
  git clone https://github.com/kubeshop/botkube.git
  ```

Now you can build and run Botkube by one of the following ways

### Build and install on Kubernetes

1. Build Botkube and create a new container image tagged as `ghcr.io/kubeshop/botkube:v9.99.9-dev`. Choose one option:

   - **Single target build for your local K8s cluster**

     This is ideal for running Botkube on a local cluster, e.g. using [kind](https://kind.sigs.k8s.io) or [`minikube`](https://minikube.sigs.k8s.io/docs/).

     Remember to set the `IMAGE_PLATFORM` env var to your target architecture. For example, the command below builds the `linux/arm64` target. By default, the build targets `linux/amd64`.

     ```sh
     IMAGE_PLATFORM=linux/arm64 make container-image-single
     docker tag ghcr.io/kubeshop/botkube:v9.99.9-dev <your_account>/botkube:v9.99.9-dev
     docker push <your_account>/botkube:v9.99.9-dev
     ```

     Where `<your_account>` is Docker hub account to which you can push the image.

   - **Multi-arch target builds for any K8s cluster**

     This is ideal for running Botkube on remote clusters.

     When tagging your dev image take care to add your target image architecture as a suffix. For example, in the command below we added `-amd64` as our target architecture.

     This ensures the image will run correctly on the target K8s cluster.

     > **Note**
     > This command takes some time to run as it builds the images for multiple architectures.

     ```sh
     make container-image
     docker tag ghcr.io/kubeshop/botkube:v9.99.9-dev-amd64 <your_account>/botkube:v9.99.9-dev
     docker push <your_account>/botkube:v9.99.9-dev
     ```

     Where `<your_account>` is Docker hub account to which you can push the image.

2. Deploy the newly created image in your cluster:

   ```sh
   export IMAGE_REGISTRY="docker.io"
   export IMAGE_REPOSITORY="<your_account>/botkube"
   export SLACK_CHANNEL_NAME="<your_slack_channel_name>"
   export SLACK_API_BOT_TOKEN="<slack_api_bot_token>"

   helm install botkube --namespace botkube --create-namespace \
   --set communications.default-group.slack.enabled=true \
   --set communications.default-group.slack.channels.default.name=${SLACK_CHANNEL_NAME} \
   --set communications.default-group.slack.token=${SLACK_API_BOT_TOKEN} \
   --set settings.clusterName=${CLUSTER_NAME} \
   --set executors.kubectl-read-only.kubectl.enabled=${ALLOW_KUBECTL} \
   --set image.registry=${IMAGE_REGISTRY} \
   --set image.repository=${IMAGE_REPOSITORY} \
   --set image.tag=v9.99.9-dev \
   ./helm/botkube
   ```

   Check [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) for default options.

### Build and run Botkube locally

For faster development, you can also build and run Botkube outside K8s cluster.

1. Build Botkube binary if you don't want to build the container image, you can build the binary like this,

   ```sh
   # Fetch the dependencies
   go mod download
   # Build the binary
   go build ./cmd/botkube/
   ```

2. Use templates to create configuration files:

   ```sh
   cp resource_config.yaml.tpl resource_config.yaml
   cp comm_config.yaml.tpl comm_config.yaml
   ```

   Edit the newly created `resource_config.yaml` and `comm_config.yaml` files to configure resource and set communication credentials.

3. Export paths for configuration files:

   ```sh
   export BOTKUBE_CONFIG_PATHS="$(pwd)/resource_config.yaml,$(pwd)/comm_config.yaml"
   ```

4. Export the path to Kubeconfig:

   ```sh
   export BOTKUBE_SETTINGS_KUBECONFIG=/Users/$USER/.kube/config # set custom path if necessary
   ```

5. Make sure you are able to access your Kubernetes cluster.

   Run command:

   ```bash
   kubectl cluster-info
   ```

   The output should be similar to:

   ```console
   Kubernetes master is running at https://192.168.39.233:8443
   CoreDNS is running at https://192.168.39.233:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   ```

6. Run Botkube binary
   ```sh
   ./botkube
   ```

## Making A Change

- Before making any significant changes, please [open an issue](https://github.com/kubeshop/botkube/issues). Discussing your proposed changes ahead of time will make the contribution process smooth for everyone.

- Once we've discussed your changes and you've got your code ready, make sure that the build steps mentioned above pass. Open your pull request against [`main`](http://github.com/kubeshop/botkube/tree/main) branch.

- To avoid build failures in CI, install [`golangci-lint` v1.46](https://golangci-lint.run/usage/install/) and run:

  ```sh
  # From project root directory
  make lint
  ```

  This will run the `golangci-lint` tool to lint the Go code.

- [Run e2e tests](https://github.com/kubeshop/botkube/blob/main/test/README.md)

- Make sure your pull request has [good commit messages](https://chris.beams.io/posts/git-commit/):

  - Separate subject from body with a blank line
  - Limit the subject line to 50 characters
  - Capitalize the subject line
  - Do not end the subject line with a period
  - Use the imperative mood in the subject line
  - Wrap the body at 72 characters
  - Use the body to explain _what_ and _why_ instead of _how_

- Try to squash unimportant commits and rebase your changes on to the `main` branch, this will make sure we have clean log of changes.
