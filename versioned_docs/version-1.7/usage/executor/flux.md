---
id: flux
title: "Flux"
sidebar_position: 5
---

Botkube offers seamless execution of Flux CLI commands within your Kubernetes cluster. By default, Flux command execution is disabled. To enable it, refer to the [Enabling plugin](../../configuration/executor/flux.md#enabling-plugin) section.

To execute the `flux` CLI commands, send a message in the channel where Botkube is present. For example:

```
@Botkube flux tutorial
```

## Interactive Usage

We have also incorporated interactivity (tables, etc.) to simplify running Flux CLI commands e.g. from mobile devices.

![flux-interactivity](./assets/flux-interactivity.gif)

## Simplified Kustomization Diffing Flow

With the Botkube Flux executor, you can execute a single command to perform a diff between a specific pull request and the cluster state. For instance:

```
@Botkube flux diff kustomization podinfo --path ./kustomize --github-ref [PR Number| URL | Branch]
```

![flux-diff](./assets/flux-diff.gif)

This command automates several tasks:

- Automatically discovering the associated GitHub repository for the given kustomization.
- Cloning the repository.
- Checking out a given pull request.
- Comparing pull request changes with the current cluster state.
- Sharing the diff report.

The diff results are posted on the Slack channel, making it easy for team members to review and discuss the changes. Additionally, the returned message provides additional contextual actions:

- Posting the diff report as a GitHub comment on the corresponding pull request.
- Approving the pull request.
- Viewing the pull request.

### GitHub automation

To enhance your workflow's efficiency, you can use the [GitHub Events](../../configuration/source/github-events.md) source for automatic notification of pull request events, complete with an integrated `flux diff` button.

```yaml
sources:
  github-events:
    displayName: "GitHub Events"
    botkube/github-events:
      enabled: true
      config:
        github:
          auth:
            accessToken: "ghp_" # GitHub PAT

        repositories:
          - name: { owner }/{name}
            on:
              pullRequests:
                  - types: [ "open" ]
                    paths:
                      # Patterns for included file changes in pull requests.
                      include: [ 'kustomize/.*' ]
                    notificationTemplate:
                      extraButtons:
                        - displayName: "Flux Diff"
                          commandTpl: "flux diff ks podinfo --path ./kustomize --github-ref {{ .HTMLURL }} "
```

Don't forget to incorporate the `github-events` source into your communication platform bindings. For instance:

```yaml
communications:
  default-group:
    socketSlack:
      enabled: true
      channels:
        default:
          name: random
          bindings:
            sources:
              - github-events
            executors:
              - flux
```
