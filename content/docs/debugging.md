+++
title = "Debugging deployments using botkube"
description = "Guide to debug k8s cluster and applications using botkube"
date = 2019-01-06T15:29:43+05:30
weight = 40
draft = false
toc = true
bref = "botkube allows you to execute kubectl commands on the cluster. Since botkube is created with service account having READONLY clusterrole, you can execute only READONLY kubectl commands"
+++

<h3 class="section-head" id="h-show-help"><a href="#h-show-help">Executing kubectl commands using botkube</a></h3>
<p>Send @botkube help in slack chennel or directly to botkube user to find more information about the supported commands.</p>
![help](/help.png)
<p>As suggested in help message, to execute kubectl commands, send message in following format in the slack chennel where botkube is already added or as a direct message to botkube.</p>
```
@botkube <kubectl command without `kubectl` prefix>
```

<h3 class="section-head" id="h-examples"><a href="#h-examples">Example usage</a></h3>
<h4>List pods in "jx" namespace</h4>
![get_pods](/get_pods.png)

<h4>Get logs of "jenkins-6dd96c8f8d-dgh8c" pod in "jx" namespace</h4>
![logs](/logs.png)

<h4>Show cluster health</h4>
![cluster-health](/cluster-health.png)

<h4>Describe a node</h4>
![desc_node](/desc_node.png)

<h4>List top pods in default namespece</h4>
![top_pods](/top_pods.png)
