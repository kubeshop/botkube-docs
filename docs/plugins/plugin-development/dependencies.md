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
const (
	kubectlVersion   = "v1.28.1"
)

// Metadata returns details about kubectl plugin.
func (e *Executor) Metadata(context.Context) (api.MetadataOutput, error) {
	return api.MetadataOutput{
		// ...
		Dependencies: map[string]api.Dependency{
			"kubectl": {
				URLs: map[string]string{
					"windows/amd64": fmt.Sprintf("https://dl.k8s.io/release/%s/bin/windows/amd64/kubectl.exe", kubectlVersion),
					"darwin/amd64":  fmt.Sprintf("https://dl.k8s.io/release/%s/bin/darwin/amd64/kubectl", kubectlVersion),
					"darwin/arm64":  fmt.Sprintf("https://dl.k8s.io/release/%s/bin/darwin/arm64/kubectl", kubectlVersion),
					"linux/amd64":   fmt.Sprintf("https://dl.k8s.io/release/%s/bin/linux/amd64/kubectl", kubectlVersion),
					"linux/s390x":   fmt.Sprintf("https://dl.k8s.io/release/%s/bin/linux/s390x/kubectl", kubectlVersion),
					"linux/ppc64le": fmt.Sprintf("https://dl.k8s.io/release/%s/bin/linux/ppc64le/kubectl", kubectlVersion),
					"linux/arm64":   fmt.Sprintf("https://dl.k8s.io/release/%s/bin/linux/arm64/kubectl", kubectlVersion),
					"linux/386":     fmt.Sprintf("https://dl.k8s.io/release/%s/bin/linux/386/kubectl", kubectlVersion),
				}
			},
		},
	}, nil
}
```

Such a definition will result in the following `dependencies` section in the plugin index:

```yaml
entries:
  - name: kubectl
    # ...
    urls:
      - url: "..." # URL for darwin/amd64 binary
        # ...
        platform:
          os: darwin
          architecture: amd64
        dependencies:
          kubectl:
            url: https://dl.k8s.io/release/v1.28.1/bin/darwin/amd64/kubectl
      - url: "..." # URL for darwin/arm64 binary
        # ...
        dependencies:
          kubectl:
            url: https://dl.k8s.io/release/v1.28.1/bin/darwin/arm64/kubectl
      - url: "..." # URL for linux/amd64 binary
        # ...
        platform:
          os: linux
          architecture: amd64
        dependencies:
          kubectl:
            url: https://dl.k8s.io/release/v1.28.1/bin/linux/amd64/kubectl
      - url: "..." # URL for linux/arm64 binary
        # ...
        platform:
          os: linux
          architecture: arm64
        dependencies:
          kubectl:
            url: https://dl.k8s.io/release/v1.28.1/bin/linux/arm64/kubectl
```

Read how to use the plugin index in the [Repository](repository.md) document.

## Using dependencies

During Botkube startup, Botkube plugin manager fetches the plugin binaries along with all dependencies. Each dependency binary is named exactly as specified in the [plugin index](#define-dependencies-for-plugin-index-generation). The dependency is fetched to a directory specified in the `PLUGIN_DEPENDENCY_DIR` environment variable passed to the plugin.

To make it easier, there's a helper function `plugin.ExecuteCommand` in the `github.com/kubeshop/botkube/pkg/plugin` package, which does all of the above. For example, the kubectl plugin uses the following code:

```go
// set additional env variables
envs := map[string]string{
	"KUBECONFIG": kubeConfigPath,
}

// runCmd is e.g. "kubectl get pods --all-namespaces"
// plugin.ExecuteCommand will replace kubectl with full path to the kubectl binary dependency
out, err := plugin.ExecuteCommand(ctx, runCmd, plugin.ExecuteCommandEnvs(envs))
```

## Example

To get familiar with the full example, see the [kubectl plugin](https://github.com/kubeshop/botkube/tree/main/cmd/executor/kubectl) in the Botkube repository. The Kubectl plugin depends on the official [kubectl CLI](https://kubernetes.io/docs/tasks/tools/#kubectl) binary, which is defined as a part of the `Metadata` method.
