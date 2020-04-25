+++
title = "Examples"
date = 2019-01-04T16:59:38+05:30
weight = 50
+++

{{% notice note %}}
You can change notification format to - **long** or **short** through settings based on your requirement. Check [configuration](/configuration) for more details.<br>
The default notification type is **short**
{{% /notice%}}



### Sample Notifications

#### Resource created

![](/images/create_sh.png "Slack notiftype=short")
![](/images/create.png "Slack notiftype=long")

#### Resource deleted

![](/images/mm_delete_sh.png "Mattermost notiftype=short")
![](/images/delete.png "Slack notiftype=long")

#### Failed to pull image

![](/images/image_failed_sh.png "Slack notiftype=short")
![](/images/mm_image_failed_sh.png "Mattermost notiftype=short")
![](/images/image-failed.png "Slack notiftype=long")

#### Error in pod

![](/images/error_sh.png "Slack notiftype=short")

#### Readiness probe failed for the pod

![](/images/readiness_sh.png "Slack notiftype=short")
![](/images/mm_readiness_sh.png "Mattermost notiftype=short")

#### Job succeeded

![](/images/job_success_sh.png "Slack notiftype=short")
![](/images/job_success.png "Slack notiftype=long")

### Debugging use-cases

#### List pods in "fission" namespace

![get_pods](/images/get_pods.png)

#### Get logs of "controller-676f97f45-pjmv2" pod in "fission" namespace

![logs](/images/logs.png)
![logs](/images/mm_logs.png)

#### Show cluster health

![cluster-health](/images/cluster-health.png)

#### Describe a node

![desc_node](/images/desc_node.png)

#### List top pods in "fission" namespace

![top_pods](/images/top_pods.png)

#### Check connection status of "gke-stg" cluster

![flag_clustername](/images/flag_clustername_ping.png)

#### List services in a "gke-dev" cluster

![get_services](/images/get_services.png)

#### Describe deployment in a "gke-stg" cluster

![describe_deployment](/images/desc_deployment.png)
![describe_deployment](/images/mm_describe.png)
