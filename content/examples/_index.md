+++
title = "Examples"
date = 2019-01-04T16:59:38+05:30
weight = 50
+++

{{% notice note %}}
You can change notification format to - **long** or **short** through settings based on your requirement. Check [configuration](/configuration) for more details.<br>
The default notification type is **short**
{{% /notice%}}



<h3 class="section-head" id="h-notif-sc"><a href="#h-notif-sc">Sample Notifications</a></h3>
<h4>Resource created</h4>
![](/images/create_sh.png "Slack notiftype=short")
![](/images/create.png "Slack notiftype=long")

<h4>Resource deleted</h4>
![](/images/mm_delete_sh.png "Mattermost notiftype=short")
![](/images/delete.png "Slack notiftype=long")

<h4>Failed to pull image</h4>
![](/images/image_failed_sh.png "Slack notiftype=short")
![](/images/mm_image_failed_sh.png "Mattermost notiftype=short")
![](/images/image-failed.png "Slack notiftype=long")

<h4>Error in pod</h4>
![](/images/error_sh.png "Slack notiftype=short")

<h4>Readiness probe failed for the pod</h4>
![](/images/readiness_sh.png "Slack notiftype=short")
![](/images/mm_readiness_sh.png "Mattermost notiftype=short")

<h4>Job succeeded</h4>
![](/images/job_success_sh.png "Slack notiftype=short")
![](/images/job_success.png "Slack notiftype=long")

<h3 class="section-head" id="h-debug-uc"><a href="#h-debug-uc">Debugging use-cases</a></h3>
<h4>List pods in "fission" namespace</h4>
![get_pods](/images/get_pods.png)

<h4>Get logs of "controller-676f97f45-pjmv2" pod in "fission" namespace</h4>
![logs](/images/logs.png)
![logs](/images/mm_logs.png)

<h4>Show cluster health</h4>
![cluster-health](/images/cluster-health.png)

<h4>Describe a node</h4>
![desc_node](/images/desc_node.png)

<h4>List top pods in "fission" namespace</h4>
![top_pods](/images/top_pods.png)

<h4>Check connection status of "gke-stg" cluster</h4>
![flag_clustername](/images/flag_clustername_ping.png)

<h4>List services in a "gke-dev" cluster</h4>
![get_services](/images/get_services.png)

<h4>Describe deployment in a "gke-stg" cluster</h4>
![describe_deployment](/images/desc_deployment.png)
![describe_deployment](/images/mm_describe.png)
