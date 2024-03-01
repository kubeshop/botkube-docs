---
id: telemetry
title: "Telemetry"
---

# Telemetry

### What data we collect

The analytics data we collect is limited to:

- Botkube Agent version,
- Kubernetes version,
- Number of cluster nodes (control plane and worker nodes count),
- Names of enabled integrations (notifiers and bots),
- Handled events in anonymized form, grouped by the integration (communication platform) name.

  For each event, we collect its type (e.g. `create` or `delete`), resource API Version and resource Kind. Any custom resource API groups or Kinds are excluded from the analytics collection.

- Executed commands in anonymized form.

  For `kubectl` commands, only the command verb is collected. Resource name and namespace are excluded from the analytics collection.

- Enabled plugin names and anonymized RBAC configuration.
- App errors (crashes, configuration and notification errors).

As an anonymous cluster identifier, we use the `uid` of `kube-system` Namespace.

Botkube CLI tool collects:

- Botkube CLI version,
- OS type from which Botkube CLI is run,
- An information whether a successful `botkube login` was executed in a form of a boolean value (`true`/`false`)
- Anonymous machine ID from [machineid](https://github.com/denisbrodbeck/machineid) library,
- Executed command names, such as `login`, `install`, etc.

### How to opt out

To disable sending the anonymous analytics, provide the `analytics.disable: true` override during Helm chart installation or upgrade. See the [Helm chart parameters](/configuration/helm-chart-parameters/#values) for more details about Helm chart configuration.

To disable sending the anonymous analytics for Botkube CLI, execute the command

```
botkube telemetry disable
```

This configuration will be stored locally in
`~/.botkube/config.json` file, if this file is deleted, the telemetry will be enabled again.
