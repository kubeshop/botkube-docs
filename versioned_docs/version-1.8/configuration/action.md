---
id: action
title: Action
sidebar_position: 5
---

The action configuration allows you to automate your workflow by defining commands that are executed on an incoming event. Similar to communication platforms, actions use [source bindings](source/index.md) to define the event sources (command triggers) and [executor bindings](../configuration/executor) to run a given command.

The actions can be disabled and enabled using dedicated commands. See the [Automated actions](../usage/automated-actions.md) usage document for more details.

## Predefined actions

There are two predefined actions available:

- `describe-created-resource` - describes a newly created resource,
- `show-logs-on-error` - prints logs on Pod/StatefulSet/DaemonSet/Deployment error.

Both of them are disabled by default. See details in the [Syntax](#syntax) section.

## Action output

The command output is sent to the communication platforms that define the same source bindings. If there is no communication platform defined with the same source bindings, the action is still executed, but the output is ignored.

To learn more how to configure sources for communicators, read the [communication](./communication/index.md) documentation.

## Command templates

Each action defines the `command` property which defines a command to be executed. It supports [Go template](https://golang.org/pkg/text/template/) syntax. The command template is rendered before actual execution.

The following variables are available:

- `{{ .Event }}` - the event object that triggered the action. See all available event properties in the [`event.go`](https://github.com/kubeshop/botkube/blob/main/internal/source/kubernetes/event/event.go) file.

There are multiple helper functions supported by the templating engine. To learn more, read the documentation on the [`slim-sprig`](https://go-task.github.io/slim-sprig/) library page.

## Syntax

```yaml
# Map of actions. Action contains configuration for automation based on observed events.
# The property name under `actions` object is an alias for a given configuration. You can define multiple actions configuration with different names.
#
# Format: actions.{alias}
actions:
  "describe-created-resource":
    # If true, enables the action.
    enabled: false
    # Action display name posted in the channels bound to the same source bindings.
    displayName: "Describe created resource"
    # Command to execute when the action is triggered. You can use Go template (https://pkg.go.dev/text/template) together with all helper functions defined by Slim-Sprig library (https://go-task.github.io/slim-sprig).
    # You can use the `{{ .Event }}` variable, which contains the event object that triggered the action. See all available event properties on https://github.com/kubeshop/botkube/blob/main/internal/source/kubernetes/event/event.go.
    command: "kubectl describe {{ .Event.TypeMeta.Kind | lower }}{{ if .Event.Namespace }} -n {{ .Event.Namespace }}{{ end }} {{ .Event.Name }}"

    # Bindings for a given action.
    bindings:
      # Event sources that trigger a given action.
      sources:
        - k8s-create-events
      # Executors configuration used to execute a configured command.
      executors:
        - k8s-default-tools
  "show-logs-on-error":
    # If true, enables the action.
    enabled: false

    # Action display name posted in the channels bound to the same source bindings.
    displayName: "Show logs on error"
    # Command to execute when the action is triggered. You can use Go template (https://pkg.go.dev/text/template) together with all helper functions defined by Slim-Sprig library (https://go-task.github.io/slim-sprig).
    # You can use the `{{ .Event }}` variable, which contains the event object that triggered the action. See all available event properties on https://github.com/kubeshop/botkube/blob/main/pkg/event/event.go.
    command: "kubectl logs {{ .Event.TypeMeta.Kind | lower }}/{{ .Event.Name }} -n {{ .Event.Namespace }}"

    # Bindings for a given action.
    bindings:
      # Event sources that trigger a given action.
      sources:
        - k8s-err-with-logs-events
      # Executors configuration used to execute a configured command.
      executors:
        - k8s-default-tools
```

## RBAC

The `ChannelName` RBAC policy is not supported for automated actions at this time.
Use the `Static` RBAC policy instead. For more information read the [RBAC](./rbac.md) documentation.
