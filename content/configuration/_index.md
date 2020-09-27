---
title: "Configuration"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 20
---

BotKube backend reads resource configurations from **resource_config.yaml** and
communication settings from **comm_config.yaml** placed at **CONFIG_PATH**

## resource_config.yaml syntax

The resource configuration file contains, 

- Resource list you want to watch
- Namespaces you want to filter
- The type of events you want to get notifications about
- updateSettings to monitor change in the specific resource field
- Way to skip filter runs

It also contains Global settings to:

- Toggle kubectl command execution
- Configure kubectl commands BotKube can execute
- Restrict kubectl command execute to specific channel


{{< highlight bash >}}

## Resources you want to watch
resources:
- name: RESOURCE            # K8s Resource you want to monitor.
                            # Resource name must be in
                            # group/version/resource (G/V/R) format
                            # for core resources with no group,
                            # ignore group fron g/v/r and use v/r
                            # resource name should be plural
                            # (e.g v1/pods, v1.ingresses, etc)

  namespaces:         
    include:                # List of namespaces to monitor for
                            # the RESOURCE events
    - namespace/all         # Use all to monitor all the resources

    ignore:                 # List of namespaces to be ignored
                            # used only with include: all
    - <namespace>           # example : include [all], ignore [x,y,z]

  events:                   # List of lifecycle events you want to
  - create                  # receive notifications about
  - update                  # Valid options are: 
  - delete                  # create, update, delete, error OR all
  - error
  
  updateSetting:            # Set include diff with the update event 
                            # about the changes in specific fields
    includeDiff: true       # updateSettings are ignored if `update`
                            # events are not configured for the resource

    fields:
    - JSONPath              # List of JSONPath expressions to monitor
                            # changes in specific fields
- name: apps/v1/deployments
  namespaces:
    include:
    - dev
    - qa
    - default
    ignore:
    - kube-system
    - prod
  updateSetting:
    includeDiff: true
    fields:
    - spec.template.spec.containers[*].image
    - status.availableReplicas
  events:
  - all

# Check true if you want to receive recommendations
# about the best practices for the created resource
recommendations: true

# Cluster Setting to manage command execution access
settings:
  # Set cluster name to differentiate incoming messages
  clustername: not-configured
  # Kubectl executor configs
  kubectl:
    # Set true to enable kubectl commands execution
    enabled: false
    # List of allowed commands
    commands:
      # kubectl method which are allowed with BotKube command
      verbs: ["api-resources", "api-versions", "cluster-info", "describe", "diff", "explain", "get", "logs", "top", "auth"]
      # resources on which kubectl methods are allowed with BotKube commands
      resources: ["deployments", "pods" , "namespaces", "daemonsets", "statefulsets", "storageclasses", "nodes"]
    # set Namespace to execute botkube kubectl commands by default
    defaultNamespace: default
    # Set true to enable commands execution from configured channel only
    restrictAccess: false
  # Set true to enable config watcher
  configwatcher: true
  # Set false to disable upgrade notification
  upgradeNotifier: true

{{< / highlight >}}


## comm_config.yaml syntax

The communication configuration file contains, 

- Communication mediums configuration
- Toggle notification type to short or long

{{< highlight bash >}}

  # Communcation mediums configuration
  communications:
    # Settings for Slack
    slack:
      enabled: false
      channel: 'SLACK_CHANNEL'            # Slack channel name without '#' prefix
                                          # where you have added BotKube and
                                          # want to receive notifications in
      token: 'SLACK_API_TOKEN'            # Slack token received after installing
                                          # BotKube Slack app to a workplace
      notiftype: short                    # Change notification type short/long.
                                          # notiftype is optional and Default
                                          # notification type is short (if not specified)

    # Settings for Mattermost
    mattermost:
      enabled: false
      url: 'MATTERMOST_SERVER_URL'        # URL where Mattermost is running.
                                          # e.g https://example.com:9243
      token: 'MATTERMOST_TOKEN'           # Personal Access token generated by BotKube user
      team: 'MATTERMOST_TEAM'             # Mattermost Team to configure with BotKube 
      channel: 'MATTERMOST_CHANNEL'       # Mattermost Channel for receiving BotKube alerts 
      notiftype: short                    # Change notification type short/long you want to receive. notiftype is optional and Default notification type is short (if not specified)

    # Settings for Microsoft Teams
    teams:
      enabled: false
      appID: 'APPLICATION_ID'
      appPassword: 'APPLICATION_PASSWORD'
      notiftype: short
      port: 3978

    # Settings for ELS
    elasticsearch:
      enabled: false
      awsSigning:
        enabled: false                    # enable awsSigning using IAM for Elastisearch
                                          # hosted on AWS, if true make sure AWS
                                          # environment variables are set.
                                          # Ref: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
        awsRegion: 'us-east-1'            # AWS region where Elasticsearch is deployed
        roleArn: ''                       # AWS IAM Role arn to assume for credentials,
                                          # use this only if you dont want to
                                          # use the EC2 instance role or not
                                          # running on AWS instance
      server: 'ELASTICSEARCH_ADDRESS'     # e.g https://example.com:9243
      username: 'ELASTICSEARCH_USERNAME'  # Set creds if using Basic Auth
      password: 'ELASTICSEARCH_PASSWORD'
      # ELS index settings
      index:
        name: botkube
        type: botkube-event
        shards: 1
        replicas: 0
  
      # Settings for Webhook
      webhook:
        enabled: false
        url: 'WEBHOOK_URL'                 # e.g https://example.com:80 

{{< / highlight >}}

The default configuration can be found at:

**For helm charts**: https://github.com/infracloudio/botkube/blob/master/helm/botkube/values.yaml

**For all-in-one deployment spec**: https://github.com/infracloudio/botkube/blob/master/deploy-all-in-one.yaml

### Updating the configuration at runtime

You can update the configuration and use `helm upgrade` to update configuration values for the BotKube. 

You can also change resource configuration directly in ConfigMap - which is not reccomended but is great for quick experimentation. You have to edit the configmap which will also restart the BotKube pod to update mounted configuration in the pod.

```bash
$ kubectl edit configmap botkube-configmap -n botkube
```
This command will open configmap specs in an editor. Do the required changes, save and exit. The BotKube pod will automatically restart to have these configuration in effect.
