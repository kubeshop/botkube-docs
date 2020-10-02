+++
title = "Installation"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 10
toc = true
+++

BotKube has two components that need to be installed.

1. BotKube App Integration in your Slack/Mattermost/Microsoft Teams/Discord
2. BotKube backend for the App in your Kubernetes cluster

<style>

a.linkhighlight:hover {
  color: #ffffff;
}

a.linkhighlight {
  color: inherit;
}

a.linkhighlight:hover:after, a.linkhighlight:focus:after {
  width: 0 !important;
}

.centerimage {
  width: 60%; float:center;
}

.leftimage {
  width: 48%; float:left; display:inline-block;
}

.rightimage {
  width: 48%; float:right; display:inline-block;
}

.visibledesktop {
  overflow: auto;
  display: block;
}

.visiblemobile {
  display: none;
}


.installbox {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  width: 60%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  cursor: pointer;
}

.installbox:hover .image {
  cursor: pointer;
  opacity: 0.3;
}

.installbox:hover .middle {
  opacity: 1;
}

.text {
  background-color: #1C90F3;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}

@media screen and (max-width: 600px) {
  .centerimage {
    width: 100%;
  }
  .leftimage {
    width: 100%;
  }
  .rightimage {
    width: 100%;
  }
  .visibledesktop {
    display: none;
  }
  .visiblemobile {
    overflow: auto;
    display: block;
  }
}
</style>

#### Feature map

| Feature  | Slack | Mattermost | Microsoft Teams | Elastic Search | Webhook | Discord |
| -------- | ----- | -----------| --------------- | -------------- | ------- | ------- |
| K8s Event push | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Kubectl commands | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | NA | NA | :heavy_check_mark: |
| Multi cluster support | :heavy_check_mark: | :heavy_check_mark: | :x: | :heavy_check_mark: | :heavy_check_mark: | :x: |
| Restrict command execution to a channel | :heavy_check_mark: | :heavy_check_mark: | :x: | NA | NA | :x: |

<div style="display: flex;justify-content: space-around;">
  <div class="installbox">
    <img src="/images/slack.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="slack" class="linkhighlight">
          Integrate with Slack
        </a>
      </div>
    </div>
  </div>
  <div class="installbox">
    <img src="/images/mattermost.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="mattermost" class="linkhighlight">
          Integrate with Mattermost
        </a>
      </div>
    </div>
  </div>
  <div class="installbox">
    <img src="/images/msteams.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="teams" class="linkhighlight">
          Integrate with Microsoft Teams
        </a>
      </div>
    </div>
  </div>
  <div class="installbox">
    <img src="/images/elasticsearch.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="elasticsearch" class="linkhighlight">
          Integrate with ElasticSearch
        </a>
      </div>
    </div>
  </div>
  <div class="installbox">
    <img src="/images/webhook.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="webhook" class="linkhighlight">
          Configure Outgoing Webhook
        </a>
      </div>
    </div>
  </div>
  <div class="installbox">
    <img src="/images/discord.png" alt="Avatar" class="image">
    <div class="middle">
      <div class="text">
        <a href="discord" class="linkhighlight">
          Integrate with Discord
        </a>
      </div>
    </div>
  </div>
</div>

{{% notice note %}}
You can use a single BotKube backend to serve all the interfaces - Slack, Mattermost, Microsoft Teams, ElasticSearch and Webhook. <br>
You just need to enable required mediums through the settings and add a necessary configuration.<br>
_see the [configuration](/configuration) section for more information_

{{% /notice%}}
