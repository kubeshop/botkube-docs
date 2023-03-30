---
id: using-kubeconfig
title: Using kubeconfig
sidebar_position: 4
---

You can request Botkube to generate and pass kubeconfig file to your plugin by adding RBAC section
to your plugin configuration. The following example requests a kubeconfig that impersonates
user **User.rbac.authorization.k8s.io** `read-only-user`. For more information refer to the
[RBAC section](../configuration/rbac.md). The example is for executor plugins, source plugins
can access kubeconfig in their `Stream()` function in `source.StreamInput`.

RBAC config for an example plugin:
```yaml
executors:
  "reader-team-a":
    kube-reader:
      enabled: true
      context:
        user:
          type: Static
          static:
            value: read-only-user
```

The kubeconfig is available in `executor.ExecuteInput` as a slice of bytes.
There are two options to instantiate a Kubernetes Go client with this config.

1. From bytes

```go
import (
	"context"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/kubernetes"
	"github.com/kubeshop/botkube/pkg/api/executor"
	"github.com/kubeshop/botkube/pkg/pluginx"
)

func (ReaderExecutor) Execute(_ context.Context, in executor.ExecuteInput) (executor.ExecuteOutput, error) {
	config, err := clientcmd.RESTConfigFromKubeConfig(in.Context.KubeConfig)
	if err != nil {
		return executor.ExecuteOutput{}, err
	}
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return executor.ExecuteOutput{}, err
	}
	...
}
```

2. From file

```go
import (
	"context"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/kubernetes"
	"github.com/kubeshop/botkube/pkg/api/executor"
	"github.com/kubeshop/botkube/pkg/pluginx"
)

func (ReaderExecutor) Execute(ctx context.Context, in executor.ExecuteInput) (executor.ExecuteOutput, error) {
	kubeConfigPath, deleteFn, err := pluginx.PersistKubeConfig(ctx, in.Context.KubeConfig)
	if err != nil {
		return executor.ExecuteOutput{}, fmt.Errorf("while writing kubeconfig file: %w", err)
	}
	defer func() {
		if deleteErr := deleteFn(ctx); deleteErr != nil {
			fmt.Fprintf(os.Stderr, "failed to delete kubeconfig file %s: %v", kubeConfigPath, deleteErr)
		}
	}()
	config, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)
	if err != nil {
		return executor.ExecuteOutput{}, err
	}
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return executor.ExecuteOutput{}, err
	}
  ...
}
```