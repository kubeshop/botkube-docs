---
title: "BotKube"
---
<style>
.leftimage {
  width: 48%; float:left; display:inline-block;
}

.rightimage {
  width: 48%; float:right; display:inline-block;
}

.leftfeature {
  width: 48%; float:left; display:inline-block;
}

.rightfeature {
  width: 48%; float:right; display:inline-block;
}

.visibledesktop {
  overflow: auto;
  display: block;
}

.visiblemobile {
  display: none;
}

@media screen and (max-width: 600px) {
  .leftimage {
    width: 100%;
  }
  .rightimage {
    width: 100%;
  }
  .leftfeature {
    width: 100%;
  }
  .rightfeature {
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

<img src="/botkube-title.jpg" width=70% height=70%>
The BotKube app for slack helps to monitor your kubernetes cluster, debugging deployments and run specific checks on resource specs.

<h2>What can BotKube do?</h2>
<div style="overflow: auto;">
  <div class="leftimage">
    <img src="/monitor.gif" style="border-radius:3%;">
  </div>
  <div class="rightimage">
    <h1>Monitor</h1>
    <ul>
      <li>BotKube controller watches kubernetes resources and sends a notification to the slack channel if any event occurs</li>
      <li>Easy to configure BotKube to receive notifications only about specific resources and events that you are interested in</li>
      <li>Turn on/off notifications simply by sending a message to @BotKube</li>
    </ul>
  </div>
</div>

<div class="visiblemobile">
  <div class="leftimage">
    <img src="/exec.gif" style="border-radius:2%;">
  </div>
  <div class="rightimage" style="padding-top:10%;">
    <h1>Debug</h1>
    <ul>
    <li>You can ask @Botkube to execute a kubectl command on k8s cluster</li>
    <li>With BotKube you can debug your deployment without terminal</li>
    </ul>
  </div>
</div>
<div class="visibledesktop">
  <div class="leftimage" style="padding-top:10%;">
    <h1>Debug</h1>
    <ul>
    <li>You can ask @Botkube to execute a kubectl command on k8s cluster</li>
    <li>With BotKube you can debug your deployment without terminal</li>
    </ul>
  </div>
  <div class="rightimage">
    <img src="/exec.gif" style="border-radius:2%;">
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftimage">
    <img src="/checks.gif" style="border-radius:2%;">
  </div>
  <div class="rightimage">
    <h1>Run Checks</h1>
    <ul>
    <li>BotKube controller allows you to define a filter to perform additional checks on resources specs when an event occurs</li>
    <li>Using filters you can add additional messages along with the incoming event messages</li>
    </ul>
  </div>
</div>

<center>
<h2>Features</h2>
<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-fw fa-user-secret"></i> Privacy</h4> You install the backend for the slack app to your kubernetes cluster. We don't collect any data.
  </div>
  <div class="rightfeature">
  <h4><i class="fas fa-terminal"></i> Execute kubectl commands</h4> Execute kubectl command as it is. No need to learn new command syntax.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-cogs"></i> Debug Anywhere, Anytime</h4>
With @BotKube you can monitor and debug kubernetes deployments without a terminal.
You can even ask @BotKube to execute kubectl commands from mobile slack app.
  </div>
  <div class="rightfeature">
    <h4><i class="fas fa-cogs"></i> Easy to configure</h4> You can configure BotKube to get notifications only about the resources and events you are interested in.
BotKube notifications can be configured at following levels:
Resource kinds, Resources namespaces, Events types
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-cloud"></i> Deploy on any k8s cluster</h4> You can deploy BotKube controller on any kubernetes cluster, irrespective of whether it is running locally (minikube) or managed by any cloud providers.
  </div>
  <div class="rightfeature">
    <h4><i class="fas fa-plug"></i> Add custom filters</h4> It is very easy to write your own filters and registering them to FilterEngine. Follow <a href=/filters>this</a> guide to know more about it.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-shield-alt"></i> Security</h4> Since BotKube controller is installed with the READONLY service account, only READONLY kubectl commands are allowed to execute via BotKube.
  </div>
  <div class="rightfeature">
    <h4><i class="fab fa-github"></i> Open source</h4> BotKube controller is open source and we welcome your requirements and contributions.
  </div>
</div>
</center>
