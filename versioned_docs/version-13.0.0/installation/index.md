---
id: installation
title: Installation
sidebar_position: 1
---

import { IntegrationList } from '@site/src/components/IntegrationList';

:::caution
The https://infracloudio.github.io/charts Helm repository is deprecated. In the future, BotKube charts from https://infracloudio.github.io/charts can be garbage collected and no longer available.
The new BotKube Helm repository is available under https://charts.botkube.io.
:::

BotKube has two components that need to be installed.

1. BotKube App Integration in your Slack/Mattermost/Microsoft Teams/Discord
2. BotKube backend for the App in your Kubernetes cluster

## Feature map

| Feature                                 | Slack              | Mattermost         | Microsoft Teams    | Discord            | Elastic Search     | Webhook            |
|-----------------------------------------|--------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| K8s Event push                          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Kubectl commands                        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | NA                 | NA                 |
| Multi cluster support                   | :heavy_check_mark: | :heavy_check_mark: | :x:                | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Restrict command execution to a channel | :heavy_check_mark: | :heavy_check_mark: | :x:                | :heavy_check_mark: | NA                 | NA                 |

## Integrations

<IntegrationList
  integrations={[
    {name: 'Slack', image: '/images/slack.png', link: 'slack'},
    {name: 'Mattermost', image: '/images/mattermost.png', link: 'mattermost'},
    {name: 'Discord', image: '/images/discord.png', link: 'discord'},
    {name: 'Teams', image: '/images/msteams.png', link: 'teams'},
    {name: 'ElasticSearch', image: '/images/elasticsearch.png', link: 'elasticsearch'},
    {name: 'Webhook', image: '/images/webhook.png', link: 'webhook'},
  ]}
/>

:::tip
You can use a single BotKube backend to serve all the interfaces - Slack, Mattermost, Microsoft Teams, ElasticSearch and Webhook. <br/>
You just need to enable required mediums through the settings and add a necessary configuration.<br/>
_see the [configuration](../configuration) section for more information_
:::
