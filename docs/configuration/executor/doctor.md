---
id: doctor
title: Doctor
sidebar_position: 5
---

The Botkube Doctor executor plugin allows you to run the `doctor` command directly in the chat window of each communication platform. Doctor is a ChatGPT integration project that knows how to diagnose Kubernetes problems and suggest solutions.

The Doctor plugin is hosted by the official Botkube plugin repository. To enable the Helm plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.1.1/plugins-index.yaml
```

## Enabling plugin

To enable `doctor` executor, add `--set 'executors.k8s-default-tools.botkube/doctor.enabled=true'` to a given Helm install command. `doctor` uses ChatGPT for diagnosing problems, so you need to grab an api key from OpenAI website [here](https://beta.openai.com/account/api-keys) and set it as follows.
`--set 'executors.k8s-default-tools.botkube/doctor.config.apiKey=<Open AI Api Key>'`

## Syntax

```yaml
# Map of executors. The `executors` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: executors.{alias}
executors:
  "k8s-tools":
    # Doctor executor configuration.
    botkube/doctor:
      enabled: false
      config:
        # Open AI Api Key that you can grab one here: https://platform.openai.com/account/api-keys
        apiKey: "<Open AI Api Key>"
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
