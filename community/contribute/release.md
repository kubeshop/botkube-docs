---
id: release
title: "Release instruction"
sidebar_position: 1
---

This document describes how to prepare and publish a new Botkube release.

## Prerequisites

- Obtain a GitHub Personal Access token with `repo` and `write:packages` permissions.
- Install the following applications:

    - [Goreleaser](https://goreleaser.com/install/) 1.10.3
    - [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator#installation) 1.16.4

## Steps

### The `botkube` repository

1. Clone and navigate to the root of the `botkube` repository.

  :::warning
  Ensure that the `origin` remote points to `git@github.com:kubeshop/botkube.git` and not your fork.
  :::

  ```bash
  git clone git@github.com:kubeshop/botkube.git
  cd botkube
  ```

1. Export required environment variables:

    ```bash
    export GITHUB_USERNAME="{username}" # GitHub username
    export GITHUB_TOKEN="{token}" # GitHub personal access token with packages write scope
    ```

1. Log in to Docker:

    ```bash
    echo $GITHUB_TOKEN | docker login ghcr.io -u ${GITHUB_USERNAME} --password-stdin
    ```

1. Update `.release` file with the new version in [Semantic Versioning 2.0](https://semver.org/spec/v2.0.0.html) format.

    ```
    release=v{semVer version}
    ```

    For example:

    ```
    release=v0.12.5
    ```

1. Run release script:

    ```bash
    ./hack/release.sh
    ```

    This script:
    - Updates version in Helm chart,
    - Generates changelog based on pull requests and issues,
    - Runs tests,
    - Creates and pushes git tag,
    - Publishes Docker images,
    - Publishes GitHub release.

1. Update [newly created GitHub release](https://github.com/kubeshop/botkube/releases/latest) description using GitHub UI.
    - Copy the generated changelog for the released version from the `./CHANGELOG.md` file.
    - Edit the GitHub release and paste the changelog into the description field.

1. Publish the modified Helm charts:

    ```bash
    git clone -b gh-pages "https://github.com/kubeshop/botkube.git" /tmp/botkube-charts
    helm package -d /tmp/botkube-charts ./helm/botkube
    cd /tmp/botkube-charts
    helm repo index --url "https://charts.botkube.io/" --merge ./index.yaml .
    git add .
    git commit -m "Release BotKube Helm chart"
    git push
    cd -
    rm -rf /tmp/botkube-charts
    ```

### The `botkube-docs` repository

:::note
This should be run only when major or minor version is released. For, patchers we won't change the version

Please read this documentation before doing [versioning](https://docusaurus.io/docs/versioning) to better
understand the process.
:::

1. Clone and navigate to the root of the `botkube-docs` repository.
   ```bash
   git clone git@github.com:kubeshop/botkube-docs.git
   cd botkube-docs
   ```
2. Checkout a new branch.
3. Make sure the current docs version (the ./docs directory) is ready to be frozen
4. Run the release script:

    For example, for 0.13 release, run:

    ```bash
    npm run docusaurus docs:version 0.13
    ```

    This script:
    - Copies current documentation `./docs` to `./versioned_docs`,
    - Updates `./versions.json` file,
    - Creates new sidebar in `./versioned_sidebars`,

5. Create a pull request to the `main` branch of the upstream repository with the updated documentation.
