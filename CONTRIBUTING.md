# How to Contribute to BotKube

We'd love your help!

BotKube is [MIT Licensed](LICENSE) and accepts contributions via GitHub pull requests. This document outlines conventions on development workflow, commit message formatting, contact points and other resources to make it easier to get your contributions accepted.

### Prerequisite

- [Hugo](https://gohugo.io)
- [Magefile](https://magefile.org/)

  > **Note**
  > Run `mage -l` to see all possible targets.

- Cloned BotKube documentation repository

   Use the following command to clone it:
   ```sh
   git clone https://github.com/kubeshop/botkube-docs.git
   ```
   > **Note**
   > To learn how to do it, follow the **Contribute** section in the [Git workflow guide](https://github.com/kubeshop/botkube/blob/main/git-workflow.md).

## Build the site locally

Make sure you have installed [Hugo](https://gohugo.io) on your system. Follow the instructions to clone this repository and build the docs locally.

- Clone the repository

  ```sh
  git clone https://github.com/kubeshop/botkube-docs
  cd botkube-docs
  ```

- Fetch the theme submodule

  ```sh
  git submodule update --init --recursive
  ```

- Start local server

  ```sh
  hugo serve -D
  ```
  Site can be viewed at http://localhost:1313

## Making A Change

Before making any significant changes, please [open an issue](https://github.com/kubeshop/botkube-docs/issues). Discussing your proposed changes ahead of time will make the contribution process smooth for everyone.

#### Adding a new documentation page

```sh
# example: adding new documentation page under installation section
hugo new installation/name-of-new-integration.md
```

#### Modifying an existing documentation page

Find the documentation page file (`.md` file) under `content/` and edit it.

### Publishing your changes

[Create a Pull Request](https://help.github.com/en/articles/creating-a-pull-request) with your changes. When the PR is merged site will be updated automatically. Make sure your pull request has [good commit messages](https://chris.beams.io/posts/git-commit/):

- Separate subject from body with a blank line
- Limit the subject line to 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Wrap the body at 72 characters
- Use the body to explain _what_ and _why_ instead of _how_

Try to squash unimportant commits and rebase your changes on to the `main` branch, this will make sure we have clean log of changes.

## Support Channels

Join the BotKube-related discussion on Slack!

Create your Slack account on [BotKube](https://join.botkube.io) workspace.

To report bug or feature, use [GitHub issues](https://github.com/kubeshop/botkube-docs/issues/new/choose).
