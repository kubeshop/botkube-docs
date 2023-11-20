---
id: github-events
title: GitHub Events
sidebar_position: 4
---

The Botkube GitHub Events source sends events for configured GitHub repositories. These events can be sent to communication channels or actions. To learn how to bind sources to communication channels or actions, refer to the [Communication](../communication/index.md) and [Action](../action.md) documents.

The GitHub Events plugin is hosted in the official Botkube plugin repository. To enable the GitHub plugin, ensure that the `botkube` repository is defined under `plugins` in the [values.yaml](https://github.com/kubeshop/botkube/blob/main/helm/botkube/values.yaml) file.

```yaml
plugins:
  repositories:
    botkube:
      url: https://github.com/kubeshop/botkube/releases/download/v1.5.0/plugins-index.yaml
```

## Enabling plugin

To enable the GitHub plugin, add the following flag to the Botkube [`install` command](../../cli/commands/botkube_install.md):

```sh
--set 'sources.github.botkube/github-events.enabled'=true
```

## Syntax

```yaml
# Map of sources. The `sources` property name is an alias for a given configuration.
# Key name is used as a binding reference.
#
# Format: sources.{alias}
sources:
  "github":
    botkube/github-events: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
      enabled: true # If not enabled, plugin is not downloaded and started.
      config: # Plugin's specific configuration.
        # Logger configuration settings.
        log:
          level: info
          format: json

        # GitHub client configuration settings.
        github:
          # Auth allows you to set either PAT or APP credentials.
          # If none provided then watch functionality could not work properly, e.g. you can reach the API calls quota or if you are setting GitHub Enterprise base URL then an unauthorized error can occur.
          auth:
            # The GitHub access token.
            # Instruction for creating a token can be found here: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token.
            accessToken: your-github-token
            # AppConfig represents the GitHub App configuration.
            # This replaces the AccessToken.
            app:
              # GitHub App ID for authentication.
              id: ""

              # GitHub App Installation ID.
              installationId: ""

              # GitHub App private key in PEM format.
              privateKey: ""
          # The GitHub base URL for API requests. Defaults to the public GitHub API, but can be set to a domain endpoint to use with GitHub Enterprise.
          # Default: https://api.github.com/
          baseUrl: ""

          # The GitHub upload URL for uploading files. It is taken into account only when the BaseURL is also set. If only the BaseURL is provided then this parameter defaults to the BaseURL value.
          # Default: https://uploads.github.com/
          uploadUrl: ""

        # refreshDuration defines how often we should call GitHub REST API to check repository events.
        # It's the same for all configured repositories. For example, if you configure 5s refresh time, and you have 3 repositories registered,
        # we will execute maximum 2160 calls which easily fits into PAT rate limits.
        # You can create multiple plugins configuration with dedicated tokens to have the rate limits increased.
        #
        # NOTE:
        # - we use conditional requests (https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#conditional-requests), so if there are no events the call doesn't count against your rate limits.\
        # - if you configure file pattern matcher for merged pull request events we execute one more additional call to check which files were changed in the context of a given pull request
        #
        # Rate limiting: https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting
        refreshDuration: 10s

        repositories:
          - name: owner/repo1
            on:
              pullRequests:
                - types: [open, merged] # Allowed pull request types (open, closed, merged).
                  paths:
                    # Included file patterns for pull request changes.
                    include: ["kustomize/.*"]
                    # Excluded file patterns for pull request changes.
                    # exclude: [ '.*\.js' ]
                  labels:
                    # Included labels for pull requests.
                    include: ["bug"]
                    # Excluded labels for pull requests.
                    # exclude: [ 'enhancement' ]
                  notificationTemplate:
                    extraButtons:
                      - displayName: "Flux Diff"
                        commandTpl: "flux diff ks podinfo --path ./kustomize --github-ref {{ .HTMLURL }} "

          - name: owner/repo2
            on:
              # EventsAPI watches for /events API containing events triggered by activity on GitHub.
              # This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.
              # source: https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-repository-events
              events:
                # WatchEvent for now emitted only when someone stars a repository.
                # https://docs.github.com/en/webhooks-and-events/events/github-event-types#watchevent
                - type: "WatchEvent"

                # IssuesEvent with json path filter
                - type: "IssuesEvent"
                  # The JSONPath expression to filter events
                  jsonPath: ".action"
                  # The value to match in the JSONPath result
                  value: "opened"
                  notificationTemplate:
                    previewTpl: |-
                      Issue Opened

                      #{{ .Issue.Number }} {{ .Issue.Title }}
                      State: {{ .Issue.State }}
                    extraButtons:
                      - displayName: Open
                        url: "{{ .Issue.HTMLURL }}"
                        style: primary
```

## Authorization

You can use either a [personal access token](#github-personal-access-token) or a [GitHub App](#github-app) for authentication.
By using GitHub Apps, you can increase your maximum rate limits because multiple GitHub Apps are independent and do not share the rate limits. However, using multiple Personal Access Tokens (PATs) for the same account will result in sharing the same rate limit.

### GitHub personal access token

Follow the instructions [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) to create a token. The required scope differs for public and private repositories.

### GitHub App

To use a GitHub App:

1. [Create a GitHub App](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app). No callback or webhook URL is needed.
2. Add read-only permission to the "Members" item of organization permissions.
3. [Install the app in your organization](https://docs.github.com/en/developers/apps/managing-github-apps/installing-github-apps).
4. Done! Use the following details for authentication:

   | Name                       | Description                                                                                                                                                                                                                                       |
   | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | GitHub App Private Key     | PEM-format key generated when the app is installed. If you lost it, you can regenerate it ([docs](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps#generating-a-private-key)).                     |
   | GitHub App ID              | Found in the app's "About" page (Organization settings -> Developer settings -> Edit button on your app).                                                                                                                                         |
   | GitHub App Installation ID | Found in the URL your organization's app install page (Organization settings -> Github Apps -> Configure button on your app). It's the last number in the URL, ex: `https://github.com/organizations/{my-org}/settings/installations/1234567890`. |

## Subscriptions

The GitHub Events source plugin uses polling instead of Webhook endpoint for retrieving GitHub events. It calls two types of GitHub REST API endpoints with a configured refresh time window:

- [`/repos/{owner}/{repo}/events`](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-repository-events) for `on.events` configuration
- [`/repos/{owner}/{repo}/pulls`](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests) for `on.pullRequests` configuration

By default, we use [conditional requests](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#conditional-requests) to prevent excessive API calls. As a result, from `on.pullRequests` triggers may have up to a 60-second delay due to caching.

### Pull requests

For a configured `refreshDuration` we call the [`/repos/{owner}/{repo}/pulls`](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests) endpoint for all registered repositories. It's configured to fetch 100 pull requests that were recently modified. We ignore all events that were already processed.

#### Matching criteria

If no matching criteria are specified, all pull requests will be reported. For example:

```yaml
repositories:
  - name: owner/repo1
    on:
      pullRequests: []
```

To narrow down emitted events, you can specify at least one of the available criteria:

- `types`: This is a list of pull request types for which the event should be triggered. The allowed types are: `open`, `closed`, `merged`.

- `paths.include`: This is a list of file patterns for which the event should be triggered. It supports [Go regular expressions](https://github.com/google/re2/wiki/Syntax). For example: `["kustomize/.*"]`.

- `paths.exclude`: This is a list of file patterns for which the event should not be triggered. It also supports [Go regular expressions](https://github.com/google/re2/wiki/Syntax). For example: `['.*\.js']`. This exclusion criteria takes precedence over `paths.include`.

- `labels.include`: This is a list of label patterns for which the event should be triggered. It supports [Go regular expressions](https://github.com/google/re2/wiki/Syntax). For example: `["backend-.*"]`.

- `labels.exclude`: This is a list of label patterns for which the event should not be triggered. It supports [Go regular expressions](https://github.com/google/re2/wiki/Syntax). For example: `['bug']`. This exclusion criteria takes precedence over `labels.include`.

#### Templating

You can customize the notification template with additional buttons:

```yaml
notificationTemplate:
  extraButtons:
    - displayName: "Flux Diff"
      commandTpl: "flux diff ks podinfo --path ./kustomize --github-ref {{ .HTMLURL }} "
```

For the `commandTpl` you can use all fields that are available on [`pullRequest`](https://github.com/google/go-github/blob/899235e0a9d750d6fecf9048a676046d50f9d4a3/github/pulls.go#L29-L85) type.

### Events

For a configured `refreshDuration` we call the [`/repos/{owner}/{repo}/events`](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-repository-events) endpoint for all registered repositories.

:::note
This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.
:::

The Events API covers various event types. Refer to the [GitHub event types](https://docs.github.com/en/webhooks-and-events/events/github-event-types) page for more information.

#### Matching criteria

To retrieve relevant events, you must define at least one entry within the `events` property. For instance:

```yaml
events:
  - type: "WatchEvent"
```

If you provide an empty list `events: []`, no events will be emitted. For more precise filtering of events, you can optionally use JSONPath along with the event type to filter based on specific criteria within the event payload.

#### Templating

The available fields for templating differ based on the event type. Refer to the [google/go-github](https://github.com/google/go-github/tree/899235e0a9d750d6fecf9048a676046d50f9d4a3/github) repository for dedicated event types.

For instance, you can add an "Open" button to an `IssuesEvent` template:

```yaml
events:
  # IssuesEvent with json path filter
  - type: "IssuesEvent"
    # The JSONPath expression to filter events
    jsonPath: ".action"
    # The regex value to match in the JSONPath result
    value: "opened"
    notificationTemplate:
      previewTpl: |-
        Issue Opened

        #{{ .Issue.Number }} {{ .Issue.Title }}
        State: {{ .Issue.State }}
      extraButtons:
        - displayName: Open
          url: "{{ .Issue.HTMLURL }}"
          style: primary
```

Here, the `jsonPath` field specifies the JSONPath expression to filter events, and the value field defines the regex value to match within the JSONPath result. This combination helps narrow down reported events based on specific conditions within the event payload.
