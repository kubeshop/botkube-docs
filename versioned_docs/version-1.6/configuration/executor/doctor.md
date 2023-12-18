---
id: doctor
title: Doctor
sidebar_position: 5
---

The Botkube Doctor executor plugin allows you to run the `doctor` command directly in the chat window of each communication platform. Doctor is a ChatGPT integration project that knows how to diagnose Kubernetes problems and suggest solutions.

The Doctor plugin is hosted by the official Botkube plugin repository. To enable the Doctor plugin, make sure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.6.0/plugins-index.yaml
```

## Enabling plugin

To enable the `doctor` executor, add `--set 'executors.ai.botkube/doctor.enabled=true'` to a given Botkube [`install` command](../../cli/commands/botkube_install.md). The `doctor` plugin uses ChatGPT for diagnosing problems, so you need to obtain an API Key from the OpenAI website as described [here](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) and set it as follows:
`--set 'executors.ai.botkube/doctor.config.apiKey=<Open AI Api Key>'`

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
      ## Custom doctor plugin configuration.
      config:
        ## Open API key for accessing the ChatGPT engine. You can get it at https://platform.openai.com/account/api-keys.
        apiKey: ""
        ## OpenAI API Base URL. If empty, the default "https://api.openai.com/v1" value is used.
        apiBaseUrl: ""
        ## Default engine to use. If empty, "text-davinci-003" engine is used.
        defaultEngine: ""
        ## Optional organization ID for requests.
        organizationID: ""
        ## User agent to use for requests. If empty, the default value is used ("go-gpt3").
        userAgent: ""
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
