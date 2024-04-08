---
id: doctor
title: Doctor
sidebar_position: 5
---

:::info

**This plugin is available as a part of the Botkube Cloud offering.**

Botkube is introducing new plugins with advanced functionality that will be part of the Botkube Team and Enterprise packages. These advanced plugins require cloud services provided by Botkube and are not part of the Botkube open source software.

As part of this change, some of the existing Botkube plugins are being moved to a new repository. This repository requires authentication with a Botkube account. To continue using these Botkube plugins, create an account at https://app.botkube.io/ and configure a Botkube instance, or [migrate an existing installation with the Botkube CLI](../../cli/migrate.md).

:::

The Botkube Doctor executor plugin allows you to run the `doctor` command directly in the chat window of each communication platform. Doctor is a ChatGPT integration project that knows how to diagnose Kubernetes problems and suggest solutions.

The Doctor plugin is hosted by the Botkube Cloud plugin repository and requires active Botkube Cloud account.

## Enabling plugin

You can enable the plugin as a part of Botkube instance configuration.

1. If you don't have an existing Botkube instance, create a new one, according to the [Installation](../../installation/index.mdx) docs.
2. From the [Botkube Cloud homepage](https://app.botkube.io), click on a card of a given Botkube instance.
3. Navigate to the platform tab which you want to configure.
4. Click **Add plugin** button.
5. Select the Doctor plugin.
6. Configure OpenAI API Key.

   Obtain it from the OpenAI website as described [here](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) and set it as follows:

   ```yaml
   apiKey: "" # Open AI API Key
   ```

7. Click **Save** button.

## Configuration Syntax

The plugin supports the following configuration:

```yaml
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
