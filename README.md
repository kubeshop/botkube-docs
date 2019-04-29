# BotKube

![BotKube logo](/static/images/botkube-title.jpg)

For complete documentation visit www.botkube.io

A slack bot which keeps eye on your Kubernetes resources and notifies
about resources life cycles events, errors and warnings. It allows you
to define and run certain checks on resources specs.  You can also ask
BotKube to execute kubectl commands on Kubernetes cluster which helps
debugging an application or cluster.

## Contributing
This website uses Hugo to generate static HTML pages. It's hosted and
automatically build by Netlify (see [netlify.toml](./netlify.toml "View file") for
more details).

- [`content/`](./content/ "View the directory") directory contains
  documentation files
- [`config.toml`](./config.toml "View file") is the Hugo configuration
- [`netlify.toml`](./netlify.toml "View file") is Netlify
  configuration

### Build the site locally
Make sure you have installed
[Hugo](https://gohugo.io/getting-started/installing/) on your
system. Follow the instructions to clone this repository and build the
docs locally.

  * Clone the repository
	```sh
	git clone https://github.com/infracloudio/botkube-docs
	cd botkube-docs
	```
  * Fetch the theme submodule
	```sh
	git submodule update --init --recursive
	```
  * Start local server
	```sh
	hugo serve -D
	```
	Site can be viewed at http://localhost:1313

### Making changes
#### Adding a new documentation page
```sh
# example: adding new documentation page under installation section
hugo new installation/name-of-new-integration.md
```
#### Modifying an existing documentation page
Find the documentation page file (`.md` file) under `content/` and
edit it.

### Publishing your changes
[Create a Pull
Request](https://help.github.com/en/articles/creating-a-pull-request)
with your changes. When the PR is merged site will be updated
automatically by Netlify.

## Licensing
The code snippets and the documentation is licensed under MIT
license. BotKube name and the logo are copyright of InfraCloud
Technologies. See [LICENSE](./LICENSE) for the full license text.
