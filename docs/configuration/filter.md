---
id: filter
title: Filter
sidebar_position: 5
---

The filter configuration allows you to configure global filters which are used for all processed events. The filters can be disabled or enabled using dedicated commands. See the [Usage](../usage/filters/index.md) document for more details.

You can develop your own filter according to the [Filter Development Guide](../usage/filters/development.md).

## Syntax

```yaml
# Filter settings for various sources.
# Currently, all filters are globally enabled or disabled.
# You can enable or disable filters with `@Botkube filters` commands.
filters:
  kubernetes:
    # If true, enables support for `botkube.io/disable` and `botkube.io/channel` resource annotations.
    objectAnnotationChecker: true
    # If true, filters out Node-related events that are not important.
    nodeEventsChecker: true
```

The default configuration for Helm chart can be found in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.
