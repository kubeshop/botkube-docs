---
id: dependencies
title: "Dependencies"
sidebar_position: 6
---

Plugins can depend on other binaries, which are then downloaded by Botkube along with a given plugin. This is supported for both executor and source plugins.

## Define dependencies for plugin index generation

As a part of the `Metadata` method, define the `Dependencies` property. The key is the name of the dependency, and the value is a structure with links to binaries for each platform.

:::info
For downloading plugins and theirs dependencies, Botkube uses `go-getter` library. It supports multiple URL formats (such as HTTP, Git repositories or S3), and is able to unpack archives and extract binaries from them. For more details, see the documentation on the [`go-getter`](https://github.com/hashicorp/go-getter) GitHub repository.
:::

```go
// Metadata returns details about Helm plugin.
func (e *Executor) Metadata(context.Context) (api.MetadataOutput, error) {
	return api.MetadataOutput{
		// ...
		Dependencies: map[string]api.Dependency{
			"helm": {
				// Links source: https://github.com/helm/helm/releases/tag/v3.6.3
				// Using go-getter syntax to unwrap the underlying directory structure.
				// Read more on https://github.com/hashicorp/go-getter#subdirectories
				URLs: map[string]string{
				  "darwin/amd64":  "https://get.helm.sh/helm-v3.6.3-darwin-amd64.tar.gz//darwin-amd64",
				  "darwin/arm64":  "https://get.helm.sh/helm-v3.6.3-darwin-arm64.tar.gz//darwin-arm64",
				  "linux/amd64":   "https://get.helm.sh/helm-v3.6.3-linux-amd64.tar.gz//linux-amd64",
				  "linux/arm":     "https://get.helm.sh/helm-v3.6.3-linux-arm.tar.gz//linux-arm",
				  "linux/arm64":   "https://get.helm.sh/helm-v3.6.3-linux-arm64.tar.gz//linux-arm64",
				  "linux/386":     "https://get.helm.sh/helm-v3.6.3-linux-386.tar.gz//linux-386",
				  "linux/ppc64le": "https://get.helm.sh/helm-v3.6.3-linux-ppc64le.tar.gz//linux-ppc64le",
				  "linux/s390x":   "https://get.helm.sh/helm-v3.6.3-linux-s390x.tar.gz//linux-s390x",
				  "windows/amd64": "https://get.helm.sh/helm-v3.6.3-windows-amd64.zip//windows-amd64",
				}
			},
		},
	}, nil
}
```

Such a definition will result in the following `dependencies` section in the plugin index:

```yaml
- name: helm
  # ...
  urls:
    - url: "..." # URL to darwin/amd64 plugin binary
      platform:
        os: darwin
        architecture: amd64
      dependencies:
        helm:
          url: https://get.helm.sh/helm-v3.6.3-darwin-amd64.tar.gz//darwin-amd64
    - url: "..." # URL to darwin/amd64 plugin binary
      platform:
        os: darwin
        architecture: arm64
      dependencies:
        helm:
          url: https://get.helm.sh/helm-v3.6.3-darwin-arm64.tar.gz//darwin-arm64
    - url: "..." # URL to linux/amd64 plugin binary
      platform:
        os: linux
        architecture: amd64
      dependencies:
        helm:
          url: https://get.helm.sh/helm-v3.6.3-linux-amd64.tar.gz//linux-amd64
    - url: "..." # URL to linux/arm64 plugin binary
      platform:
        os: linux
        architecture: arm64
      dependencies:
        helm:
          url: https://get.helm.sh/helm-v3.6.3-linux-arm64.tar.gz//linux-arm64
```

Read how to use the plugin index in the [Repository](./repository.md) document.

## Using dependencies

During Botkube startup, Botkube plugin manager fetches the plugin binaries along with all dependencies. Each dependency binary is named exactly as specified in the [plugin index](#define-dependencies-for-plugin-index-generation). The dependency is fetched to a directory specified in the `PLUGIN_DEPENDENCY_DIR` environment variable passed to the plugin.

For example, in case of Helm executor, to run the Helm binary fetched by Botkube plugin manager, the plugin uses the following code:

```go
	commandName := "helm" // name of the binary specified in Dependencies
	// Check if PLUGIN_DEPENDENCY_DIR environment variable is set; if not, Go will try to lookup for `helm` binary
	depDir, found := os.LookupEnv("PLUGIN_DEPENDENCY_DIR")
	if found {
		// Use exactly the binary from the $PLUGIN_DEPENDENCY_DIR directory
		commandName = fmt.Sprintf("%s/%s", depDir, commandName)
	}

	// Execute the command and return output
	cmd := exec.CommandContext(ctx, commandName, args...)
	out, err := cmd.CombinedOutput()
```

## Example

To get familiar with the full example, see the [Helm plugin](https://github.com/kubeshop/botkube/tree/main/cmd/executor/helm) in the Botkube repository. The Helm plugin depends on the official [Helm CLI](https://helm.sh) binary, which is defined as a part of the `Metadata` method.
