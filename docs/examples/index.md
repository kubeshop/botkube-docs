---
id: examples
title: "Examples"
sidebar_position: 4
---

:::note
You can change notification format to - **long** or **short** through settings based on your requirement. Check [configuration](../configuration) for more details.<br/>
The default notification type is **short**
:::



## Sample Notifications

### Resource created

![Resource created](assets/create_sh.png "Slack notification.type=short")
![Resource created](assets/create.png "Slack notification.type=long")

### Resource deleted

![Resource deleted](assets/mm_delete_sh.png "Mattermost notification.type=short")
![Resource deleted](assets/delete.png "Slack notification.type=long")

### Failed to pull image

![Failed to pull image](assets/image_failed_sh.png "Slack notification.type=short")
![Failed to pull image](assets/mm_image_failed_sh.png "Mattermost notification.type=short")
![Failed to pull image](assets/image-failed.png "Slack notification.type=long")

### Error in pod

![Error in pod](assets/error_sh.png "Slack notification.type=short")

### Readiness probe failed for the pod

![Readiness probe failed for the pod](assets/readiness_sh.png "Slack notification.type=short")
![Readiness probe failed for the pod](assets/mm_readiness_sh.png "Mattermost notification.type=short")

### Job succeeded

![Job succeeded](assets/job_success_sh.png "Slack notification.type=short")
![Job succeeded](assets/job_success.png "Slack notification.type=long")

### Monitor Velero backups

Add following configuration resource_config to monitor Velero backups resource.

```bash
    - name: velero.io/v1/backups
      namespaces:
        include:
          - .*
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

![Monitor Velero backups](assets/velero_backup.png "Velero backup")

## Debugging use-cases

### List pods in "fission" namespace

![get_pods](assets/get_pods.png)

### Get logs of "controller-676f97f45-pjmv2" pod in "fission" namespace

![logs](assets/logs.png)
![logs](assets/mm_logs.png)

### Show cluster health

![cluster-health](assets/cluster-health.png)

### Describe a node

![desc_node](assets/desc_node.png)

### List top pods in "fission" namespace

![top_pods](assets/top_pods.png)

### Check connection status of "gke-stg" cluster

![flag_clustername](assets/flag_clustername_ping.png)

### List services in a "gke-dev" cluster

![get_services](assets/get_services.png)

### Describe deployment in a "gke-stg" cluster

![describe_deployment](assets/desc_deployment.png)
![describe_deployment](assets/mm_describe.png)
