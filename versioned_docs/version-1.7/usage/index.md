---
id: usage
title: "Usage"
sidebar_position: 4
---

# Usage

Botkube allows you to monitor your Kubernetes cluster, as well as debug and troubleshoot your workloads.

## See all available commands

Run `@Botkube help` to find information about the supported commands.

## Check Botkube status

Run `@Botkube ping` to the channel where Botkube is added. The Botkube will respond you with the **pong** message from all the configured clusters.

For [multi-cluster configuration](./executor/index.md#specify-cluster-name), use the `--cluster-name` flag to get response from the cluster mentioned in the flag. Else check the deployment in Kubernetes cluster in the **botkube** namespace.
