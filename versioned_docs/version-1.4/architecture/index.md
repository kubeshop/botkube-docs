---
id: architecture
title: "Architecture"
sidebar_position: 6
---

This document describes high-level Botkube architecture, all components in the system and interactions between them.

Botkube is split into two main parts:

- Botkube agent: Botkube binary that serves as a bridge between communication platforms (e.g. Slack, Discord) and Botkube plugins (sources and executors).
- [Botkube plugins](../plugin/index.md): The executable binaries that communicate with Botkube agent over an RPC interface. Botkube supports two types of plugins, respectively called Source plugins and Executor plugins.

## Components

The following diagram visualizes all main components in the system.

![Architecture](assets/arch-light.svg#gh-light-mode-only)![Architecture](assets/arch-dark.svg#gh-dark-mode-only)

### Plugin repository

A plugin repository is a place where plugin binaries and index file are stored. This repository must be publicly available and supports downloading assets via HTTP(s). Any static file server can be used, for instance: GitHub Pages, `s3`, `gcs`, etc.

### Plugin manager

Plugin manager takes care of downloading enabled and bound plugins, running a given plugin binary and maintaining the gRPC connection. Under the hood, the [`go-plugin`](https://github.com/hashicorp/go-plugin/) library is used. Plugin manager is responsible both for the executor and source plugins.

### Plugin executor bridge

Plugin executor bridge is resolving the received Botkube command, calling the respective plugin, and sending back the response to a given communication platform.

### Executor

Executor is a binary that implements the [executor](https://github.com/kubeshop/botkube/blob/main/proto/executor.proto) Protocol Buffers contract. Executor runs a given command and returns the response in a synchronous way. For example, running `kubectl` or `helm` commands.

Streaming command response is not supported. As a result, commands like `helm install --wait` doesn't work well, as the response won't be sent until the command finishes.

The `kubectl` is a built-in Botkube executor. It will be extracted in the future Botkube releases.

### Plugin source bridge

Plugin source bridge is dispatching received source events to all configured communication channels.

### Source

Source is a binary that implements the [source](https://github.com/kubeshop/botkube/blob/main/proto/source.proto) Protocol Buffers contract. Source starts asynchronous streaming of domain-specific events. For example, streaming Kubernetes events.

### Bot

Bot represents a bidirectional communication platform. Each bot is responsible for authenticating, managing connections, and providing an interface for receiving and sending messages for a given platform like Slack, Discord, etc. Connection is mostly done via WebSocket.

### Sink

Sink represents a unidirectional communication platform. Each sink is responsible for authenticating, managing connections, and providing an interface for sending messages for a given platform like Elasticsearch, outgoing webhook, etc.
