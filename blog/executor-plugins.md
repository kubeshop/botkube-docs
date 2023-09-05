---
title: Creating the Botkube Flux Plugin for Day 2 operations
slug: flux
authors:
  - name: "Mateusz Szostok"
    title: "Botkube Maintainer"
    url: https://github.com/mszostok
    image_url: https://avatars.githubusercontent.com/u/17568639?s=250
---

## Introduction

[//]: # (- Brief overview of the Botkube Flux plugin.)
[//]: # (- Importance of GitOps workflow automation.)
[//]: # (- Purpose of the blog: Detailing the process of creating the Botkube Flux plugin.)

In Botkube, we move towards GitOps by developing such extensions like Flux plugin, in order to simplify the interaction between Kubernetes clusters and GitHub repositories. We try to find a solution for places where automation is needed but not yet available.

With the Botkube brand-new Flux plugin, you can execute commands straight from Slack using interactive forms. What's more, you will be informed about GitHub Pull Request that is changing your kustomization files including dedicated button to show you a diff report between the Pull Request and the current cluster state.

In this blog post, we will reveal the cards and jump into the process thinking and implementation details of the Flux plugin. You will learn about Zapier-like side of the Botkube that allowed us to glue three important parts: Kubernetes cluster, GitHub platform, and Flux CLI. All of that, to make you love your Day 2 operations.

## The Evolution of Flux Executor Plugin

[//]: # (- Introduction to the real use-case scenario.)
[//]: # (- How the Botkube Flux plugin was utilized to address a practical problem.)
[//]: # (- Impact of the plugin on the efficiency and productivity of the team.)

Let's put ourselves in the shoes of a team managing Kubernetes applications with multiple pull requests. Our goal is to integrate with Flux CD in order to simplify Day 2 operations for Flux users, so let's take a closer look at the user story:

1. Be able to run Flux CLI commands from any communication platform, in the same way as you can do in your terminal:
	 ![](flux get source git)

2. Next, let's make it mobile friendly. The secret ingredient is interactivity, such as buttons, and select menus.
	 ![](flux get sources git)
	 Typing and copy-pasting a long names doesn't work well. But now, you have a handy Flux client right in your pocket that you can use with just a few clicks.
	 And we are just half-way there 😈

3. Here comes the last but unique part which makes the difference. **Support for day 2 operations**. In our case, we stitched together three important parts: Kubernetes cluster, GitHub platform, and Flux CLI. As a result, we provided a streamline experience for generating a diff report in the context of GitHub Pull Requests and current cluster state.

	 ![](diff report)

	 🎁 As you may notice, the diff report notification contains some useful actions out-of-the-box:
	- Posting the diff report as a GitHub comment.
	- Approving the pull request.
	- Viewing the pull request.

4. Now, when we're happy about the result, we were still missing one more part to **automate our day 2 operation**.

	 Even though the diffing flow integrates with GitHub, it still requires two manual steps:
	   - discovering that a new pull-request was created
	   - constructing a Flux related command
	   	:::note
	   	We could use Botkube aliases in order to just run `@Botkube cluster-diff [PR-Number]`.
	   	:::

   That's how the GitHub Events source was born. Now we can set up a full workflow to:
	 1. Watch for GitHub Pull Requests that changes files in `kustomize` directory. Alternatively, we can use label selectors.
	 2. Get notification on Slack about new Pull Request.
	 3. Render and embed event-aware button to run a diff report.

Now, you may think that what we achieve in those 4 steps it's great but will be hard to configure. Is it? We hope that included YAML configuration proves that it is not:
```yaml
botkube/github-events: # GitHub Events
  github:
    auth:
      accessToken: "ghp_"

  repositories:
    - name: mszostok/podinfo
      on:
        pullRequests:
          - types: ["open"]
            paths:
              include: [ 'kustomize/.*' ]
            notificationTemplate:
              extraButtons:
                - displayName: "Flux Diff"
                  commandTpl: "flux diff ks podinfo --path ./kustomize --github-ref {{ .HTMLURL }} "
```

## Interactivity and Decision-Making

- Showcase the convenience of sharing the diff report.
	Interactivity and Decision-Making

- While posting diff reports can be fully automated, you may want to do it intentionally by clicking a button because the report may contain sensitive information that you don't want to fully disclose for external contributor.

However, nothing is blocking us from adding in the future support for AI assistance that will do the review and based on a generated diff report will proceed with automated approval. Are you ready for AIOps?

## Manual Approach vs. Botkube Flux Plugin

While you were reading the first part of the Flux plugin evolution, did you consider what kind of manual steps would be required without the plugin? Let's break it down!

Steps:
1. Checking GitHub repository for a new pull requests.
2. **(one time operation)** Downloading and installing Flux CLI on you localhost.
3. Manually connecting to the related Kubernetes cluster.
4. **(one time operation)** Cloning the repository.
5. Checking out the Pull Request.
6. Constructing a Flux command.
7. Sharing the diff report on Slack/GitHub.

When we discard one time operations, it still leaves us with 5 steps that we need to do for each new Pull Request.

## Behind the Scenes: Developing the Botkube Flux Plugin

The development of the Botkube Flux Executor plugin involved several key aspects:

1. **Interactivity**: The plugin leveraged the `exec` plugin developed in previous releases, making adding interactivity almost out-of-the-box.
- In the previous releases we invested our time into developing the exec plugin that allows you to port any CLI into communication platform window. Here we reused it as Go SDK making adding interactivity into Flux plugin almost OOTB. Here the blueprint on how to convert CLI output into interactive message is defined in YAML.
   ```yaml
   - trigger:
       command:
         regex: "flux get sources (bucket|chart|helm|oci)"
       type: "parser:table:space"
       message:
         selects:
           - name: "Item"
             keyTpl: "{{ .Name }}"
   ```
More info: https://docs.botkube.io/usage/executor/exec#table-parser
- **YAML Configuration**: The development process involved defining a blueprint in YAML for converting CLI output into interactive messages.
	- Go embed is handy here as we can still have our manifest in YAML files so IDE helps us with syntax highlighting, however thanks to embedding it we can distribute it as a single plugin binary and we don’t need to do any external call on startup.


2. Auto-discovering the related GitHub repository. -
	- **RBAC**:
3. Cloning and checking out the specified pull request. - tell about `gh` CLI
- **External Dependencies**: To support pull request checkout, the widely-used `gh` CLI was integrated as an external dependency, simplifying the process.
	- doing a pull request checkout is not always a trivial process as we need to support also external contributions that create PRs using they forks. Here instead of reinventing the wheel we used the well known gh CLI. It was easy to add as external dependency just by defining:
	```go
	"gh": {
			URLs: map[string]string{
					"darwin/amd64":  "https://github.com/cli/cli/releases/download/v2.32.1/gh_2.32.1_macOS_amd64.zip//gh_2.32.1_macOS_amd64/bin",
					"linux/amd64":   "https://github.com/cli/cli/releases/download/v2.32.1/gh_2.32.1_linux_amd64.tar.gz//gh_2.32.1_linux_amd64/bin",
					// etc.
			},
	},
	```
	More info: https://docs.botkube.io/plugin/dependencies#define-dependencies-for-plugin-index-generation
4. Comparing changes with the current cluster state.


### Challenges faced during development and how they were overcome.

The trickiest part was to develop GitHub Events source. The best way is to use GitHub App with the webhook approach. However, we didn't want to break our

We started with GitHub Events endpoint. But it turned out that even though it serves events that we are interested in, it was not meant to be used for the real-time use-cases. We still integrate with the `events` API, but it's recommended for event subscription where time is not that important. For example, getting notification about new stars on your GitHub repositories:
[](github star)

How to handle rate limits? We decided on two things:
- conditional requests
- adding support for GitHub App tokens.
---
- Teaser about the upcoming significant improvement.
	Simplified Diffing Flow with Botkube Flux Executor

In the future, we can consider adding a token rotator that automatically switches a set of specified tokens before approaching the rate limit.

For the [Botkube web app](https://app.botkube.io/) we will consider native integration using GitHub App, to reduce friction with the initial setup for Flux and GitHub Events plugins.

## Conclusion

Here is a blog post, write a conclusion section that has:
- Recap of the Botkube Flux plugin's capabilities and benefits.
- Acknowledgment of the team's effort in creating the plugin.
- Encouragement for readers to explore and integrate the plugin into their workflows.

add this to the end of the section:
"Let us know what you think about the Flux plugin. We're always open to your feedback and ideas about Botkube! Feel free to reach out to us on Slack or Twitter.

Thank you for taking the time to learn about Botkube 🙌"
