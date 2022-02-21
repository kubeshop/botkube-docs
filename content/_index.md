---
title: "BotKube"
---

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

.desktoptitle {
  float: center;
}

.mobiletitle {
  display: none;
}

.centerimage {
  height: 50%;
  display: block;
  text-align:center;
  display:flex;
  justify-content: center;
  align-items: center;
}

.leftimage {
  width: 48%; float:left; display:inline-block;
}

.rightimage {
  width: 48%; float:right; display:inline-block;
}

.leftfeature {
  width: 48%; float:left; display:inline-block;
}

.centerfeature {
  width: 48%; float:center; display:inline-block;
}

.rightfeature {
  width: 48%; float:right; display:inline-block;
}

.lefttitle {
  float: left;
  border: 1px solid #1C90F3;
  padding: 10px;
}

.righttitle {
  float:right;
  border: 1px solid #1C90F3;
  padding: 10px;
}

.lefttitle i, .righttitle i {
  padding: 0 5px;
}

.lefttitle:hover, .righttitle:hover {
  background-color: #1C90F3;
  color: #ffffff;
  cursor: pointer;
}

.visibledesktop {
  overflow: auto;
  display: flex;
}

.visiblemobile {
  display: none;
}

.fitscreen {
  height: 100vh;
}

.fitscreenmargin {
    margin-top: 3%;
    margin-bottom: 3%;
}

#body-inner {
  margin-bottom: 0px !important;
}

#body .padding {
  padding-bottom: 1rem !important;
}

@media screen and (max-height: 780px) {
  .fitscreen {
    height: 100vh;
    margin-top: -40px;
  }

  .fitscreenmargin {
    margin-top: 1%;
    margin-bottom: 1%;
  }
}

@media screen and (max-width: 600px) {
  .fitscreen {
    height: auto;
    overflow: auto;
    display: block;
  }
  .desktoptitle {
    display: none;
  }
  .mobiletitle {
    display: block;
  }
  .centerimage {
    width: 100%;
    display: block;
    text-align:center;
    display:flex;
    justify-content: center;
    align-items: center;
  }
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

<div class="fitscreen">
  <div class="mobiletitle">
  <a href="/"><img src="/images/botkube-title.jpg"></a>
  </div>
  <div class="desktoptitle">
    <a href="/"><img src="/images/botkube-title.jpg" width="auto"></a>
  </div>
  <p style="font-size:16px;font-weight:400;" class="fitscreenmargin">
  BotKube is a messaging bot for monitoring and debugging Kubernetes clusters. It's built and maintained with <i class="fas fa-heart fa-fw"></i> by <a href="https://infracloud.io">InfraCloud</a>
  </p>
  <div class="centerimage">
    <img src="/images/botkube_multicluster.png" width="auto">
  </div>
  <div>
  <p style="font-size:16px;font-weight:400;" class="fitscreenmargin">
  BotKube can be integrated with multiple messaging platforms like - Slack, Mattermost, Microsoft Teams to help you monitor your Kubernetes cluster(s), debug critical deployments and gives recommendations for standard practices by running checks on the Kubernetes resources.
  </p>
  </div>

  <div>
    <div class="lefttitle">
      <a href="/installation" class="linkhighlight">
        <i class="fas fa-rocket"></i>
        Try Now
      </a>
    </div>
    <div class="righttitle">
      <a href="https://github.com/infracloudio/botkube" class="linkhighlight">
        <i class="fab fa-github"></i>
        View Source
      </a>
    </div>
  </div>
</div>

<h2>What can BotKube do?</h2>
<div class="visibledesktop">
  <div class="leftimage">
    <img src="/images/monitor.gif" style="border-radius:3%;">
  </div>
  <div class="rightimage">
    <h1>Monitor</h1>
    <ul>
      <li>BotKube watches Kubernetes resources and sends a notification to the channel if any event occurs for example a ImagePullBackOff error.</li>
      <li>You can customize the objects and level of events you want to get from Kubernetes cluster.</li>
      <li>You can turn on/off notifications simply by sending a message to @BotKube</li>
    </ul>
  </div>
</div>
<div class="visiblemobile">
  <div class="leftimage">
    <img src="/images/monitor.gif" style="border-radius:3%;">
  </div>
  <div class="rightimage">
    <h1>Monitor</h1>
    <ul>
      <li>BotKube watches Kubernetes resources and sends a notification to the channel if any event occurs for example a ImagePullBackOff error.</li>
      <li>You can customize the objects and level of events you want to get from Kubernetes cluster.</li>
      <li>You can turn on/off notifications simply by sending a message to @BotKube</li>
    </ul>
  </div>
</div>
<div class="visiblemobile">
  <div class="leftimage">
    <img src="/images/exec.gif" style="border-radius:2%;">
  </div>
  <div class="rightimage" style="padding-top:10%;">
    <h1>Debug</h1>
    <ul>
    <li>BotKube can execute kubectl commands on Kubernetes cluster without giving access to Kubeconfig or underlying infrastructure.</li>
    <li>With BotKube you can debug your deployment, services or anything about your cluster right from your messaging window ;) </li>
    <li>BotKube can talk to multiple clusters, you just need to deploy BotKube backend in each cluster with the same token. That's it! </li>
    </ul>
  </div>
</div>
<div class="visibledesktop">
  <div class="leftimage" style="padding-top:5%;">
    <h1>Debug</h1>
    <ul>
    <li>BotKube can execute kubectl commands on Kubernetes cluster without giving access to Kubeconfig or underlying infrastructure.</li>
    <li>With BotKube you can debug your deployment, services or anything about your cluster right from your messaging window ;) </li>
    <li>BotKube can talk to multiple clusters, you just need to deploy BotKube backend in each cluster with the same token. That's it! </li>
    </ul>
  </div>
  <div class="rightimage">
    <img src="/images/exec.gif" style="border-radius:2%;">
  </div>
</div>
<div style="overflow: auto;">
  <div class="leftimage">
    <img src="/images/checks.gif" style="border-radius:2%;">
  </div>
  <div class="rightimage">
    <h1>Run Checks</h1>
    <ul>
    <li>Some checks are built in but you can define and add additional checks for specific resources or events.</li>
    <li>Filters allow you to do more things for a specific event - such as adding a new message.</li>
    </ul>
  </div>
</div>

<center>
<h2>Features</h2>
<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-fw fa-user-secret fa-fw"></i>
      Privacy
    </h4>
    The backend for the BotKube app runs in your Kubernetes cluster - thus you have complete control on your data and software.
  </div>
  <div class="rightfeature">
    <h4> <i class="fas fa-terminal fa-fw"> </i>
      Execute kubectl commands
    </h4>
    Same old Kubectl syntax - just a new interface. You do not have to learn anything new!
    Plus you can configure which Kubectl commands BotKube can executes. See <a href=/configuration>configuration</a> for details.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4> <i class="fas fa-tasks fa-fw"> </i>
      Support for multiple interfaces
    </h4>
    Like Slack, BotKube can also be integrated with Mattermost, Microsoft Teams, ElasticSearch and outgoing webhook. See <a href=/configuration>configuration</a> syntax for details.
  </div>
  <div class="rightfeature">
    <h4> <i class="fas fa-puzzle-piece"></i>
      Supports Custom Resources
    </h4>
    BotKube can monitor literally any Kubernetes resource including Custom Resource. This enables you to configure alerts on some interesting events like - certificate issue/expiry if you are using cert-manager or backup failure in case you are using backup tools like Velero or Kanister.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4><i class="fas fa-cogs fa-fw"></i>
      Debug Anywhere, Anytime
    </h4>
    With @BotKube you can monitor and debug Kubernetes deployments from anywhere.
    Even while you are camping without a laptop, you can use Slack, Mattermost or MS Teams mobile app and get crucial information.
  </div>
  <div class="rightfeature">
    <h4> <i class="fas fa-cogs fa-fw"> </i>
	Easy to configure
    </h4>
    Get notifications about things that you really care for. You can configure events or objects or namespaces that you want to be informed about.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4> <i class="fas fa-cloud fa-fw"> </i>
      Deploy on any Kubernetes cluster
    </h4>
    You can deploy BotKube backend on any Kubernetes cluster, whether it is Minikube or cloud managed Kubernetes or anything in between.
  </div>
  <div class="rightfeature">
    <h4> <i class="fas fa-plug fa-fw"> </i>
      Add custom filters
    </h4>
    It is very easy to write your own filters and registering them to FilterEngine. Follow <a href=/filters>this</a> guide to know more.
  </div>
</div>

<div style="overflow: auto;">
  <div class="leftfeature">
    <h4> <i class="fas fa-shield-alt fa-fw"> </i>
      Security
    </h4>
    By default BotKube uses a READONLY service account, you can customize this to your needs.
  </div>
  <div class="rightfeature">
    <h4><i class="fab fa-github"> </i>
      Open source
    </h4>
    BotKube backend is open source and we welcome your requirements and contributions.
  </div>
</div>

</center>

---

<center>
An open source project by <a href="https://infracloud.io"><img src="/images/infracloud-logo.png" height="30px" alt="InfraCloud"></a>
</center>
