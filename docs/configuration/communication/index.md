---
id: communication
title: "Communication"
sidebar_position: 1
---

The communication settings contain:

- Configuration for communication platforms scoped in separate communication groups,
- Platform-specific options, such as multichannel configuration for platforms that support channels.

The settings are applicable only for self-hosted Botkube installation. Cloud Slack and Microsoft Teams platforms are exclusive to Botkube Cloud.

## Communication groups

Communication group is a way to aggregate separate configurations for a set of communication platforms. You can specify multiple communication groups, and, in a result, support multiple Slack or Mattermost workspaces, Discord servers, or Elasticsearch server instances.

Also, most platforms also support another level of multiple configurations within a workspace. For example, Slack supports multichannel configuration. To learn more about platform-specific options, see the [Syntax](#syntax) section.

:::note
The purpose of the communication group is to allow using multiple workspaces, e.g. for Slack or Mattermost. To use multiple channels inside the same workspace, don't define separate communication groups, but use `channels` property under a given communication platform instead.
:::

### Example

Consider the following configuration:

```yaml
communications:
  "first-group": # Your own alias of a given communication group
    socketSlack:
      enabled: true
      botToken: "{SLACK_BOT_TOKEN_1}" # Bot token for Botkube App for Slack installed in Workspace 1
      appToken: "{SLACK_APP_TOKEN_1}" # App token for Botkube App for Slack installed in Workspace 1
      channels:
        "general": # Your own alias for the channel configuration
          name: general
          bindings:
            executors: # Executors configuration for a given channel
              - k8s-default-tools
            sources: # Notification sources configuration for a given channel
              - k8s-events
        "random": # Your own alias for the channel configuration
          name: random
          bindings:
            executors: [] # Executors configuration for a given channel
            sources: # Notification sources configuration for a given channel
              - k8s-events
  "second-group": # Your own alias of a given communication group
    socketSlack:
      enabled: true
      botToken: "{SLACK_BOT_TOKEN_2}" # Bot token for Botkube App for Slack installed in Workspace 2
      appToken: "{SLACK_APP_TOKEN_2}" # App token for Botkube App for Slack installed in Workspace 2
      channels:
        "primary-channel": # Your own alias for the channel configuration
          name: general
          notification:
            # If true, the notifications are not sent to the channel. They can be enabled with `@Botkube` command anytime.
            disabled: true
          bindings:
            executors: # Executors configuration for a given channel
              - k8s-default-tools
            sources: # Notification sources configuration for a given channel
              - k8s-events
```

The example YAML configuration definition results in the following configuration.

For Slack **Workspace 1**, as defined by the first communication group (`first-group`):

- Notifications from `k8s-events` source are sent to the `general` and `random` channels.
- Commands from the `k8s-default-tools` configuration can be executed in the `general` channel. On `random` channel executors are not configured.

For Slack **Workspace 2**, as defined by the second communication group (`second-group`):

- Notifications are configured to be sent from the `k8s-events` source to the `general` channel. They are disabled by default, and can be enabled with `@Botkube` command or during Botkube upgrade.
- Commands from the `k8s-default-tools` configuration can be executed in the `general` channel.

## Source and Executor Bindings

Most of the communication platforms support executor and source bindings, which allows fine-tuning the notifications and allowed Botkube commands inside a given channel.

With executor bindings you can configure which executors are allowed in a given channel. To read more about executor configuration, see the [Executor](../executor) document.

With source bindings, you can specify which events are sent to a given channel (or, in case of Elasticsearch, index). To read more about source configuration, see the [Source](../source) document.

## Syntax

Each communication platform has specific options, however they share a similar syntax for consistency.
For example, bot integrations such as Slack, Mattermost or Discord have multichannel support, that is you can configure multiple channels with separate bindings. Same with Elasticsearch - you can forward notifications to multiple Elasticsearch indices, according to the sources configuration.

```yaml
# Map of communication groups. Communication group contains settings for multiple communication platforms.
# The property name under `communications` object is an alias for a given configuration group. You can define multiple communication groups with different names.
# @default -- See the `values.yaml` file for full object.
#
## Format: communications.{alias}
communications:
  "default-group":
    ## Settings for Slack with Socket Mode.
    socketSlack:
      # If true, enables bot for Slack.
      enabled: false
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      ## Format: channels.{alias}
      channels:
        "default":
          # Slack channel name without '#' prefix where you have added Botkube and want to receive notifications in.
          name: "SLACK_CHANNEL"
          bindings:
            # Executors configuration for a given channel.
            executors:
              - k8s-default-tools
            # Notification sources configuration for a given channel.
            sources:
              - k8s-err-events
              - k8s-recommendation-events
      # Bot for Slack token for your own app for Slack.
      # [Ref doc](https://api.slack.com/authentication/token-types).
      botToken: ""
      # Slack app-level token for your own app for Slack.
      # [Ref doc](https://api.slack.com/authentication/token-types).
      appToken: ""
    ## Settings for Mattermost.
    mattermost:
      # If true, enables Mattermost bot.
      enabled: false
      # User in Mattermost which belongs the specified Personal Access token.
      botName: "Botkube"
      # The URL (including http/https schema) where Mattermost is running. e.g https://example.com:9243
      url: "MATTERMOST_SERVER_URL"
      # Personal Access token generated by Botkube user.
      token: "MATTERMOST_TOKEN"
      # The Mattermost Team name where Botkube is added.
      team: "MATTERMOST_TEAM"
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      ## Format: channels.{alias}
      channels:
        "default":
          # The Mattermost channel name for receiving Botkube alerts.
          # The Botkube user needs to be added to it.
          name: "MATTERMOST_CHANNEL"
          notification:
            # If true, the notifications are not sent to the channel. They can be enabled with `@Botkube` command anytime.
            disabled: false
          bindings:
            # Executors configuration for a given channel.
            executors:
              - k8s-default-tools
            # Notification sources configuration for a given channel.
            sources:
              - k8s-err-events
              - k8s-recommendation-events

    ## Settings for Discord.
    discord:
      # If true, enables Discord bot.
      enabled: false
      # Botkube Bot Token.
      token: "DISCORD_TOKEN"
      # Botkube Application Client ID.
      botID: "DISCORD_BOT_ID"
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      ## Format: channels.{alias}
      channels:
        "default":
          # Discord channel ID for receiving Botkube alerts.
          # The Botkube user needs to be added to it.
          id: "DISCORD_CHANNEL_ID"
          notification:
            # If true, the notifications are not sent to the channel. They can be enabled with `@Botkube` command anytime.
            disabled: false
          bindings:
            # Executors configuration for a given channel.
            executors:
              - k8s-default-tools
            # Notification sources configuration for a given channel.
            sources:
              - k8s-err-events
              - k8s-recommendation-events

    ## Settings for Elasticsearch.
    elasticsearch:
      # If true, enables Elasticsearch.
      enabled: false
      awsSigning:
        # If true, enables awsSigning using IAM for Elasticsearch hosted on AWS. Make sure AWS environment variables are set.
        # [Ref doc](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).
        enabled: false
        # AWS region where Elasticsearch is deployed.
        awsRegion: "us-east-1"
        # AWS IAM Role arn to assume for credentials, use this only if you don't want to use the EC2 instance role or not running on AWS instance.
        roleArn: ""
      # The server URL, e.g https://example.com:9243
      server: "ELASTICSEARCH_ADDRESS"
      # Basic Auth username.
      username: "ELASTICSEARCH_USERNAME"
      # Basic Auth password.
      password: "ELASTICSEARCH_PASSWORD"
      # If true, skips the verification of TLS certificate of the Elastic nodes.
      # It's useful for clusters with self-signed certificates.
      skipTLSVerify: false
      # Specify the log level for Elasticsearch client. Leave empty to disable logging.
      ## Possible values: "info", "error", "trace".
      ## - "info": Logs information level messages.
      ## - "error": Logs information and error level messages.
      ## - "trace": Logs information, error, and trace level messages.
      ## To disable logging, simply leave the logLevel empty or remove the line.
      logLevel: ""

      # Map of configured indices. The `indices` property name is an alias for a given configuration.
      #
      ## Format: indices.{alias}
      indices:
        "default":
          # Configures Elasticsearch index settings.
          name: botkube
          type: botkube-event
          shards: 1
          replicas: 0
          bindings:
            # Notification sources configuration for a given index.
            sources:
              - k8s-err-events
              - k8s-recommendation-events

    ## Settings for Webhook.
    webhook:
      # If true, enables Webhook.
      enabled: false
      # The Webhook URL, e.g.: https://example.com:80
      url: "WEBHOOK_URL"
      bindings:
        # Notification sources configuration for the webhook.
        sources:
          - k8s-err-events
          - k8s-recommendation-events
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
