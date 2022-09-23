---
id: release
title: "Release instruction"
sidebar_position: 1
---

This document describes how to prepare and publish a new Botkube release.

## Prerequisites

- Proper permission on main `botkube` or `botkube-docs` repositories to trigger Github Actions.

## The `botkube` repository

### Release Steps

- Go to BotKube repository [Actions page](https://github.com/kubeshop/botkube/actions), and click **Code Freeze** workflow.
  ![BotKube Github Actions](assets/release_code_freeze.png "BotKube Github Actions")
- Click on **Run workflow** drop-down, fill **Version** field. (e.g. 0.14.0), and click **Run Workflow**. Branch field will be **main** always for major and minor releases.
  ![BotKube Code Freeze](assets/release_code_freeze_version.png "BotKube Code Freeze")
- It will generate all the needed artifacts and tag it with a release candidate tags. Once you verify everything is ok on release candidate,
  continue with **Finalize Release** by going to [Actions](https://github.com/kubeshop/botkube/actions) page and click on **Finalize release.**
- Click on **Run workflow** drop-down and fill **Version** field to finalize specific release. (e.g. 0.14.0)
  ![BotKube Finalize Release](assets/release_code_freeze.png "BotKube Finalize Release")

:::warning
For the patch releases, you need to use a different branch, tag, or commit to derive from. For example, in order to create a patch
release for `0.14.0` as `0.14.1`, you need to set first input in **Code Freeze Run workflow** drop-down as `0.14.0`. By doing this, `0.14.1` will
be derived from `0.14.0` instead of `main` branch
:::

### What this automation does under the hood?

- Creates a release branch like `release/0.14.0` and pushes to remote
- Processes Helm Chart to update helm docs, tags it as `0.14.1-rc.1` and pushes to remote
- Generates docker images
- Generates changelog
- Creates release candidate with changelog body
- Publishes helm chart
- After release candidate verification and triggering Finalize Release workflow, it repeats steps 2,3,4,5 with `0.14.0`

### What to do on bug detection on release branch?

- You can create PR against release branch. Once it is merged to release branch, it will increment candidate version by one automatically.
  For example, if you have `0.14.1-rc.1`, it will become `0.14.0-rc.2` and it will create a backport pr against `main` branch.

## The `botkube-docs` repository

### Release Steps

- Go to BotKube Docs [Actions page](https://github.com/kubeshop/botkube-docs/actions), and click **Release workflow**
- Click **Run workflow** drop-down and fill the **Version** input for the next release, e.g. 0.14
  ![BotKube Docs Release](assets/docs_release.png "BotKube Docs Release")

:::warning
Don't use semantic version format, only provide Major and Minor fields of semantic version like `0.14`
:::

### What this automation does under the hood?

- Generates a release branch like `release/0.14`
- Copies current documentation `./docs` to `./versioned_docs`,
- Updates `./versions.json` file,
- Creates new sidebar in `./versioned_sidebars`,
- Creates an automatic PR against `main` branch
