---
id: quick-start
title: "Quick start"
sidebar_position: 1
---

Botkube provides a quick start repository to start developing Botkube [source](../architecture/index.md#source) and [executor](../architecture/index.md#executor) plugins in Go. It has all batteries included; example plugins:

- The [`echo`](https://github.com/kubeshop/botkube-plugins-template/blob/main/cmd/echo/main.go) executor that sends back the command that was specified,
- The [`ticker`](https://github.com/kubeshop/botkube-plugins-template/blob/main/cmd/ticker/main.go) source that emits an event each time the configured time duration elapses.

and two example release jobs:

- [GitHub releases](https://github.com/kubeshop/botkube-plugins-template/blob/main/.github/workflows/release.yml)
- [GitHub Pages](https://github.com/kubeshop/botkube-plugins-template/blob/main/.github/workflows/pages-release.yml)

## Use template

1. Navigate to [`botkube-plugins-template`](https://github.com/kubeshop/botkube-plugins-template).

2. Click **"Use this template"**, next **"Create a new repository"**

   ![Create Repo](./assets/use-tpl.png)

   This creates your own plugin repository with a single commit.

3. Decide which release job you prefer, the GitHub releases, or GitHub pages. Once decided, remove one the above workflow in your new repository:

   - GitHub releases, defined at `.github/workflows/release.yml` in your GitHub repository.
   - GitHub Pages, defined at `.github/workflows/pages-release.yml` in your GitHub repository.

   If you pick the GitHub Pages, a further configuration is needed:

   1. In project settings, enable [publishing GitHub Pages via GitHub Action](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).
   2. Adjust the `github-pages` deployment environment. You can either:
      - remove the deployment environment if you don't need any protection rules
      - add an environment protection rule so that you can deploy pages on each new tag. If you use tagging like `vX.Y.Z`, you can add the `v*` rule. As an alternative, can select **All branches** from the dropdown.

4. Update the README.md file to describe the plugins that you created.
