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

![](/images/create_sh.png "Slack notification.type=short")
![](/images/create.png "Slack notification.type=long")

#### Resource deleted

![](/images/mm_delete_sh.png "Mattermost notification.type=short")
![](/images/delete.png "Slack notification.type=long")

#### Failed to pull image

![](/images/image_failed_sh.png "Slack notification.type=short")
![](/images/mm_image_failed_sh.png "Mattermost notification.type=short")
![](/images/image-failed.png "Slack notification.type=long")

#### Error in pod

![](/images/error_sh.png "Slack notification.type=short")

#### Readiness probe failed for the pod

![](/images/readiness_sh.png "Slack notification.type=short")
![](/images/mm_readiness_sh.png "Mattermost notification.type=short")

#### Job succeeded

![](/images/job_success_sh.png "Slack notification.type=short")
![](/images/job_success.png "Slack notification.type=long")

#### Monitor Velero backups

Add following configuration resource_config to monitor Velero backups resource.

```bash
    - name: velero.io/v1/backups
      namespaces:
        include:
          - all
        ignore:
          -
      events:
        - create
        - update
        - delete
        - error
      updateSetting:
        includeDiff: true
        fields:
          - status.phase
```

With this configuration, BotKube will monitor create/delete/error events and updates in _status.phase_ fields in _velero.io/v1/backups_ resource.

![](/images/velero_backup.png "Velero backup")

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
