---
id: architecture
title: "Architecture"
sidebar_position: 6
---

Botkube backend communicates with Kubernetes API Server to monitor Kubernetes events and forwards them to communication mediums like Slack/Mattermost/MS Teams. It also reads messages from users and sends response accordingly.

## Botkube Backend Architecture

![architecture](assets/architecture.png#light-bg)

**Informer Controller:** Registers informers to kube-apiserver to watch events on the configured Kubernetes resources. It forwards the incoming Kubernetes event to the Event Manager

**Event Manager:** Extracts required fields from Kubernetes event object and creates a new Botkube event struct. It passes Botkube event struct to the Filter Engine

**Filter Engine:** Takes the Kubernetes object and Botkube event struct and runs Filters on them. Each filter runs some validations on the Kubernetes object and modifies the messages in the Botkube event struct if required.

**Event Notifier:** Finally, notifier sends Botkube event over the configured communication channel.

**Bot Interface:** Bot interface takes care of authenticating and managing connections with communication mediums like Slack/Mattermost/MS Teams. It reads/sends messages from/to communication mediums.

**Executor:** Executes Botkube or kubectl command and sends back the result to the Bot interface.
