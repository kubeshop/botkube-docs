---
title: "Release instruction"
---

This document describes how to prepare and publish a new Botkube release.

## Prerequisites

- Obtain a GitHub Personal Access token with `repo` and `write:packages` permissions.
- Install the following applications:

    - [Goreleaser](https://goreleaser.com/install/) 1.1.0
    - [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator#installation) 1.16.4

## Instruction

### The `botkube` repository

1. Clone and navigate to the root of the `botkube` repository.
1. Export required environment variables:

    ```bash
    GITHUB_USERNAME="{username}" # GitHub username
    GITHUB_TOKEN="{token}" # GitHub personal access token
    ```

1. Log in to Docker

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

1. Update [newly created GitHub release](https://github.com/infracloudio/botkube/releases/latest) description using GitHub UI.
    - Copy the generated changelog for the released version from the `./CHANGELOG.md` file.
    - Edit the GitHub release and paste the changelog into the description field.

1. Publish the modified Helm charts:

    ```bash
    GITHUB_ORG="infracloudio"
    GITHUB_REPO="charts"
    git clone -b gh-pages "https://github.com/${GITHUB_ORG}/${GITHUB_REPO}.git" /tmp/botkube-charts
    helm package -d /tmp/botkube-charts ./helm/botkube
    cd /tmp/botkube-charts
    helm repo index --url "https://${GITHUB_ORG}.github.io/${GITHUB_REPO}/" --merge ./index.yaml .
    git add .
    git commit -m "Release Botkube Helm chart"
    git push "https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${GITHUB_REPO}.git"
    cd -
    rm -rf /tmp/botkube-charts
    ```

### The `botkube-docs` repository

1. Clone and navigate to the root of the `botkube` repository.
1. Run the release script:

    ```bash
    ./hack/release.sh
    ```

    You can customize the source repository by setting `GITHUB_ORG`, `GITHUB_REPO` and `REPO_BRANCH` environment variables.

    This script:
    - Updates Docker image versions in the documentation,
    - Updates changelog,
    - Updates Helm chart options,
    - Creates and pushes git tag.
