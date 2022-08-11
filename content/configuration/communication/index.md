---
id: communication
title: "Communication"
sidebar_position: 1
---

The communication settings contains:

- Configuration for communication platforms scoped in separate communication groups,
- Platform-specific options, such as multi-channel configuration for platforms that support channels, or option to toggle notification type to short or long.

## Communication groups

Communication group is a way to aggregate separate configurations for a set of communication platforms. You can specify multiple communication groups, and, in a result, support multiple Slack or Mattermost workspaces, Discord servers, or Elasticsearch server instances.

Also, most platforms also support another level of multiple configurations within a workspace. For example, Slack supports multi-channel configuration. To learn more about platform-specific options, see the [Syntax](#syntax) section.

{{% notice note %}}
The purpose of the communication group is to allow using multiple workspaces, e.g. for Slack or Mattermost. To use multiple channels inside the same workspace, don't define separate communication groups, but use `channels` property under a given communication platform instead.
{{% /notice %}}

### Example

Consider the following configuration:

```yaml
communications:
  'first-group': # Your own alias of a given communication group
    slack:
      enabled: true
      token: "{SLACK_TOKEN_1}" # Token for BotKube Slack app installed in Workspace 1
      channels:
        'general': # Your own alias for the channel configuration
          name: general
          bindings:
            executors: # Executors configuration for a given channel
              - kubectl-read-only
            sources: # Notification sources configuration for a given channel
              - k8s-events
        'random': # Your own alias for the channel configuration
          name: random
          bindings:
            executors: [] # Executors configuration for a given channel
            sources: # Notification sources configuration for a given channel
              - k8s-events
  'second-group': # Your own alias of a given communication group
    slack:
      enabled: true
      token: "{SLACK_TOKEN_2}" # Token for BotKube Slack app installed in Workspace 2
      channels:
        'primary-channel': # Your own alias for the channel configuration
          name: general
          bindings:
            executors: # Executors configuration for a given channel
              - kubectl-read-only
            sources: # Notification sources configuration for a given channel
              - k8s-events
```

The example YAML configuration definition results in the following configuration.

For Slack **Workspace 1**, as defined by the first communication group (`first-group`):
  - sending notifications from `k8s-events` source to the `general` and `random` channels,
  - ability to execute commands from `kubectl-read-only` configuration in the `general` channel. On `random` channel executors are not configured.

For Slack **Workspace 2**, as defined by the second communication group (`second-group`):
  - sending notifications from `k8s-events` source to the `general` channel,
  - ability to execute commands in the `general` channel.

## Source and Executor Bindings

Most of the communication platforms support executor and source bindings, which allows to fine-tune notifications and allowed BotKube commands inside a given channel.

With executor bindings you can configure which executors are allowed in a given channel. To read more about executor configuration, see the [Executor](/configuration/executor) document.

With source bindings, you can specify which events are sent to a given channel (or, in case of Elasticsearch, index). To read more about source configuration, see the [Source](/configuration/source) document.

## Known limitations

Currently, [Microsoft Teams](/installation/teams/) integration works differently than other bot integrations, such as Slack or Discord. While Microsoft Teams support multiple channels for forwarding notifications, you need to turn them on with `@BotKube notifier start` on each channel. Microsoft Teams uses source and executor bindings defined under `communications.teams.bindings` property for all channels in the following way:
- Executor bindings apply to all MS Teams channels where BotKube has access to.
- Source bindings apply to all channels which have notification turned on with `@BotKube notifier start` command.

## Syntax

Each communication platform has specific options, however they share a similar syntax for consistency.
For example, bot integrations such as Slack, Mattermost or Discord have multi-channel support, that is you can configure multiple channels with separate bindings. Same with Elasticsearch - you can forward notifications to multiple Elasticsearch indices, according to the sources configuration.

```yaml
# Map of communication groups. Communication group contains settings for multiple communication platforms.
# The property name under `communications` object is an alias for a given configuration group. You can define multiple communication groups with different names.
#
# Format: communications.<alias>
communications:
  'default-group':
    # Settings for Slack.
    slack:
      # If true, enables Slack bot.
      enabled: false
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      # Format: channels.<alias>
      channels:
        'default':
          # Slack channel name without '#' prefix where you have added BotKube and want to receive notifications in.
          name: 'SLACK_CHANNEL'
          bindings:
            # Executors configuration for a given channel.
            executors:
              - kubectl-read-only
            # Notification sources configuration for a given channel.
            sources:
              - k8s-events
      # Slack token.
      token: 'SLACK_API_TOKEN'
      notification:
        # Configures notification type that are sent. Possible values: `short`, `long`.
        type: short

    # Settings for Mattermost.
    mattermost:
      # If true, enables Mattermost bot.
      enabled: false
      # User in Mattermost which belongs the specified Personal Access token.
      botName: 'BotKube'
      # The URL (including http/https schema) where Mattermost is running. e.g https://example.com:9243
      url: 'MATTERMOST_SERVER_URL'
      # Personal Access token generated by BotKube user.
      token: 'MATTERMOST_TOKEN'
      # The Mattermost Team name where BotKube is added.
      team: 'MATTERMOST_TEAM'
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      # Format: channels.<alias>
      channels:
        'default':
          # The Mattermost channel name for receiving BotKube alerts.
          # The BotKube user needs to be added to it.
          name: 'MATTERMOST_CHANNEL'
          bindings:
            # Executors configuration for a given channel.
            executors:
              - kubectl-read-only
            # Notification sources configuration for a given channel.
            sources:
              - k8s-events
      notification:
        # Configures notification type that are sent. Possible values: `short`, `long`.
        type: short

    # Settings for MS Teams.
    teams:
      # If true, enables MS Teams bot.
      enabled: false
      # The Bot name set while registering Bot to MS Teams.
      botName: 'BotKube'
      # The BotKube application ID generated while registering Bot to MS Teams.
      appID: 'APPLICATION_ID'
      # The BotKube application password generated while registering Bot to MS Teams.
      appPassword: 'APPLICATION_PASSWORD'
      bindings:
        # Executor bindings apply to all MS Teams channels where BotKube has access to.
        executors:
          - kubectl-read-only
        # Source bindings apply to all channels which have notification turned on with `@BotKube notifier start` command.
        sources:
          - k8s-events
      # The path in endpoint URL provided while registering BotKube to MS Teams.
      messagePath: "/bots/teams"
      notification:
        # Configures notification type that are sent. Possible values: `short`, `long`.
        type: short
      # The Service port for bot endpoint on BotKube container.
      port: 3978

    # Settings for Discord.
    discord:
      # If true, enables Discord bot.
      enabled: false
      # BotKube Bot Token.
      token: 'DISCORD_TOKEN'
      # BotKube Application Client ID.
      botID: 'DISCORD_BOT_ID'
      # Map of configured channels. The property name under `channels` object is an alias for a given configuration.
      #
      # Format: channels.<alias>
      channels:
        'default':
          # Discord channel ID for receiving BotKube alerts.
          # The BotKube user needs to be added to it.
          id: 'DISCORD_CHANNEL_ID'
          bindings:
            # Executors configuration for a given channel.
            executors:
              - kubectl-read-only
            # Notification sources configuration for a given channel.
            sources:
              - k8s-events
      notification:
        # Configures notification type that are sent. Possible values: `short`, `long`.
        type: short

    # Settings for Elasticsearch.
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
      server: 'ELASTICSEARCH_ADDRESS'
      # Basic Auth username.
      username: 'ELASTICSEARCH_USERNAME'
      # Basic Auth password.
      password: 'ELASTICSEARCH_PASSWORD'
      # If true, skips the verification of TLS certificate of the Elastic nodes.
      # It's useful for clusters with self-signed certificates.
      skipTLSVerify: false
      # Map of configured indices. The `indices` property name is an alias for a given configuration.
      #
      # Format: indices.<alias>
      indices:
        'default':
          # Configures Elasticsearch index settings.
          name: botkube
          type: botkube-event
          shards: 1
          replicas: 0
          bindings:
            # Notification sources configuration for a given index.
            sources:
              - k8s-events

    # Settings for Webhook.
    webhook:
      # If true, enables Webhook.
      enabled: false
      # The Webhook URL, e.g.: https://example.com:80
      url: 'WEBHOOK_URL'
      bindings:
        # -- Notification sources configuration for the webhook.
        sources:
          - k8s-events      
```

The default configuration for Helm chart can be found in [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml).
