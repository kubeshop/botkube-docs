# Common problems

This document describes how to identify and resolve common Botkube problems that might occur.

## Incompatible plugin API version

**Symptoms**

- Botkube agent Pod is restarting
- In [Botkube agent logs](diagnostics.mdx#agent-logs), you see such entry:

  ```text
  while running application: while waiting for goroutines to finish gracefully: 1 error occurred:
  	* while starting plugins manager: while creating executor plugins: Incompatible API version with plugin. Plugin version: 2, Client versions: [1]
  ```

**Debugging steps**

- [Check Botkube agent version](diagnostics.mdx#agent-version).

- [Check plugin repository version](diagnostics.mdx#check-configured-plugin-repositories).

**Solution**

In order to fix the problem, you need to make sure that the agent version is the same as the plugin repository version. For example, for agent image `ghcr.io/kubeshop/botkube:v1.5.0` you need to configure official plugin repository in version `v1.5.0`: `https://github.com/kubeshop/botkube/releases/download/v1.5.0/plugins-index.yaml`.
To change the repository URL, run:

```bash
helm upgrade botkube botkube/botkube -n botkube --reuse-values --set plugins.repositories.botkube.url="https://github.com/kubeshop/botkube/releases/download/v1.5.0/plugins-index.yaml"
```

## Helm chart loading error

**Symptoms**

- You encounter the following errors when running the `botkube install` command:

  ```text
  Error: while loading Helm chart: Chart.yaml file is missing
  ```

  or

  ```text
  Error: while loading Helm chart: file 'botkube' does not appear to be a gzipped archive; got 'application/octet-stream'
  ```

**Solution**

If you're experiencing these errors, it means that there is a conflict with a file or directory named `botkube` in the location where you executed the `botkube install` command. To resolve this issue, follow these steps:

1. **rename or remove 'botkube':** You cannot have a file or directory named `botkube` in the same location where you are trying to install Botkube. You should either rename or remove the conflicting `botkube` file or directory.

2. **Change Directory:** Alternatively, you can navigate to a different directory in your command line interface before executing the `botkube install` command. Ensure that the directory where you run the command does not contain any conflicting `botkube` files or directories.

## Network connections

Botkube can work in private clusters where inbound connections are limited. However, you need to allow outgoing connections to all configured plugin repositories and API endpoints, depending on the communication platform you intend to use.

### Botkube official plugins

The official Botkube plugin index and binaries are hosted on [GitHub releases](https://github.com/kubeshop/botkube/releases). For instance, for the version `v1.5.0` the following URLs are used:

- Plugin index URL: https://github.com/kubeshop/botkube/releases/download/v1.10.0/plugins-index.yaml
- Kubectl plugin binary for `linux/amd64`: https://github.com/kubeshop/botkube/releases/download/v1.10.0/executor_kubectl_linux_amd64.tar.gz

As a result, you need to allow outbound connections for Botkube to successfully download GitHub assets.

Additionally, each plugin may define additional dependencies that the [plugin manager](../architecture/index.md#plugin-manager) downloads on startup. For example, the Helm plugin for `linux/amd64` requires `https://get.helm.sh/helm-v3.6.3-linux-amd64.tar.gz`.
To learn more about all URLs that need to be accessible, you can download a plugin index and check all plugin definitions that you want to enable.

### Socket Slack

For the Slack communication platform, we use the [Socket mode](https://api.slack.com/apis/connections/socket) approach.
In order to make this integration work, you need to allow all Slack API URLs defined under https://my.slack.com/help/urls, especially:

- api.slack.com
- upload.slack.com
- universal-upload-edge.slack.com
- global-upload-edge.slack.com
- wss://wss-backup.slack.com
- wss://wss-mobile.slack.com
- wss://wss-primary.slack.com

Visit [Slack official guide](https://slack.com/help/articles/360001603387-Manage-Slack-connection-issues#network-settings) for troubleshooting your Slack connection.

### Cloud Slack

Cloud Slack integration communicates via gRPC with the Botkube control-plane. In order to make this integration work, you need to allow access to `api.botkube.io`.

## Plugin's permissions

If you experience problems while configuring RBAC (Role-Based Access Control) for plugins, you can refer to the [troubleshooting](../configuration/rbac.md#troubleshooting) guide for assistance.

## Botkube doesn't respond on MS Teams

In order to solve the problem, please refer to the [troubleshooting](../installation/teams/index.md#troubleshooting) guide for assistance.

## I can't see my Slack private channels in Cloud Dashboard

To comply with Slack's privacy policy, private channels won't be visible until you create a public alias for the respective channel. Refer to the provided instructions for guidance on completing this process: [Setting Public Alias for Private Channels](../installation/slack/cloud-slack#setting-public-alias-for-private-channels)

## Air-Gap installation

**Please note that we do not support air-gap installations.** However, here are some suggestions that you may find helpful:

- Mirror Botkube images to your private registry:

  - [`ghcr.io/kubeshop/botkube:{botkube_version}`](https://github.com/kubeshop/botkube/pkgs/container/botkube), e.g., `ghcr.io/kubeshop/botkube:v1.5.0`
  - [`ghcr.io/kubeshop/k8s-sidecar:in-cluster-config`](https://github.com/orgs/kubeshop/packages/container/package/k8s-sidecar)

- During startup, Botkube downloads repository indexes and all enabled plugins. All of them are stored under the `/tmp` folder. To ensure that the [plugin manager](../architecture/index.md#plugin-manager) does not make external calls, all required plugins must be present. You can achieve this by mounting a Persistent Volume Claim (PVC) at this path. By default, we use [`emptyDir`](https://github.com/kubeshop/botkube/blob/9d0627794078d519987309271b64c94047cd65d9/helm/botkube/templates/deployment.yaml#L176-L177). Later, you can mount your Persistent Volume (PV) with cached plugins in your air-gapped environment.

- Select a communication platform that can be installed in the air-gapped environment, such as [Mattermost](../installation/mattermost/index.md).

## Others

Having trouble finding a solution to your problem? No problem at all! We will help you to get your Botkube up and running. First, follow these steps:

1. [Export the Botkube agent configuration](diagnostics.mdx#agent-configuration)
2. [Export the Botkube agent logs](diagnostics.mdx#agent-logs)

After that, come join our Slack community workspace at https://join.botkube.io. Head over to the [`#helping-hands`](https://slack.com/app_redirect?team=TG7TTBLJ0&channel=helping-hands) channel and share the assets you exported along with a description of your issue. Our team is ready to assist you!
