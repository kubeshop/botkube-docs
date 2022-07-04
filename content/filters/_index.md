---
title: "Adding a custom filter"
menutitle: "Adding a custom filter"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 70
---

You can extend BotKube functionality by writing additional filters. The **FilterEngine** runs these filters on the Event struct before forwarding it as a notification to a channel. These filters can check resource specs, validate some checks and add messages to the Event struct.

We have already defined a filter to add suggestions in the notifications if container image in pod specs is using **latest** tag.

![tag_filter](/images/tag_filter_sh.png)

**Let's see, how we can write a filter like this.**

### A. Writing a filter
Prerequisites:

- As of now, you can write filters only using Go language. So you need to be familiar with it.
- Understanding of Kubernetes Objects needed (https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)

#### 1. Create a new .go file
Create a new file (e.g image_tag_checker.go) in **botkube/pkg/filterengine/filters/** directory

Set package name as "filters" and import required packages:

```go
package filters

import (
	"strings"

	"github.com/sirupsen/logrus"
	apiV1 "k8s.io/api/core/v1"

	"github.com/infracloudio/botkube/pkg/events"
)
```

#### 2. Create a structure and implement "Run() and Describe()" methods for the struct.

FilterEngine has an interface Filter defined for the filters:

```go
type Filter interface {
	Run(context.Context, interface{}, *events.Event)
	Name() string
	Describe() string
}
```

Create a struct which implements the Filter interface. Use logger instance taken as an argument from the constructor:

```go
// ImageTagChecker add recommendations to the event object if latest image tag is used in pod containers
type ImageTagChecker struct {
	log logrus.FieldLogger
}

// NewImageTagChecker creates a new ImageTagChecker instance
func NewImageTagChecker(log logrus.FieldLogger) *ImageTagChecker {
	return &ImageTagChecker{log: log}
}

// Run filer and modifies event struct
func (f *ImageTagChecker) Run(ctx context.Context, object interface{}, event *events.Event) {

	// your logic goes here

}

// Name returns the filter's name
func (f *ImageTagChecker) Name() string {
	return "ImageTagChecker"
}

// Describe describes the filter
func (f *ImageTagChecker) Describe() string {
	return "Checks and adds recommendation if 'latest' image tag is used for container image."
}
```

#### 3. Add your logic in the Run() function
Now, put your logic in the **Run()** function to parse resource object, run validation and modify Event struct. The fields in the Event struct can be found [here](https://github.com/kubeshop/botkube/blob/develop/pkg/events/events.go).

```go
// Run filers and modifies event struct
func (f *ImageTagChecker) Run(_ context.Context, object interface{}, event *events.Event) error {
	if event.Kind != "Pod" || event.Type != config.CreateEvent || utils.GetObjectTypeMetaData(object).Kind == "Event" {
		return nil
	}
	var podObj coreV1.Pod
	err := utils.TransformIntoTypedObject(object.(*unstructured.Unstructured), &podObj)
	if err != nil {
		return fmt.Errorf("while transforming object type %T into type: %T: %w", object, podObj, err)
	}

	// Check image tag in initContainers
	for _, ic := range podObj.Spec.InitContainers {
		images := strings.Split(ic.Image, ":")
		if len(images) == 1 || images[1] == "latest" {
			event.Recommendations = append(event.Recommendations, fmt.Sprintf(":latest tag used in image '%s' of initContainer '%s' should be avoided.", ic.Image, ic.Name))
		}
	}

	// Check image tag in Containers
	for _, c := range podObj.Spec.Containers {
		images := strings.Split(c.Image, ":")
		if len(images) == 1 || images[1] == "latest" {
			event.Recommendations = append(event.Recommendations, fmt.Sprintf(":latest tag used in image '%s' of Container '%s' should be avoided.", c.Image, c.Name))
		}
	}
	f.log.Debug("Image tag filter successful!")
	return nil
}
```

#### 4. Register your filter in the Filter Engine

Open [**pkg/filterengine/with_all_filters.go**](https://github.com/kubeshop/botkube/blob/develop/pkg/filterengine/with_all_filters.go) file and call the constructor of your new filter in the `WithAllFilters` method:

```go
// WithAllFilters returns new DefaultFilterEngine instance with all filters registered.
func WithAllFilters(logger *logrus.Logger, dynamicCli dynamic.Interface, mapper meta.RESTMapper, conf *config.Config) *DefaultFilterEngine {
	filterEngine := New(logger.WithField(componentLogFieldKey, "Filter Engine"))
	filterEngine.Register([]Filter{
		filters.NewIngressValidator(logger.WithField(filterLogFieldKey, "Ingress Validator"), dynamicCli),
		// ...

		// Your filter goes here:
		filters.NewImageTagChecker(logger.WithField(filterLogFieldKey, "Image Tag Checker")), // make sure to use `logger.WithField`
	}...)

	return filterEngine
}
```

### B. Rebuild and deploy the BotKube backend

- Build the BotKube backend docker image with `make container-image`.
- Push the image to Dockerhub registry.
- Install/Upgrade your BotKube deployment (Steps are provided [here](/installation)).

_The implementation of built in filters can be found at: https://github.com/kubeshop/botkube/tree/develop/pkg/filterengine/filters_
