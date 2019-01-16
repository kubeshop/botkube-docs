---
title: "Adding a custom filter"
menutitle: "Adding a custom filter"
date: 2019-01-08T17:58:08+05:30
draft: false
weight: 70
---

You can extend BotKube functionality by writing additional filters. The **FilterEngine** runs these filters on the Event struct before forwarding it as a Slack notification to a channel. These filters can check resource specs, validate some checks and add messages to the Event struct. 

We have already defined a filter to add suggestions in the Slack message if container image in pod specs is using **latest** tag.

![tag_filter](/images/tag_filter.png)

**Let's see, how we can write a filter like this.**

### A. Writing a filter
Prerequisites:

- As of now, you can write filters only using Go language. So you need to be familiar with it.

#### 1. Create a new .go file
Create a new file (e.g image_tag_checker.go) in **botkube/pkg/filterengine/filters/** directory

Set package name as "filters" and import required packages

```
package filters

import (
	"strings"

	"github.com/infracloudio/botkube/pkg/events"
	log "github.com/infracloudio/botkube/pkg/logging"

	apiV1 "k8s.io/api/core/v1"
)
```

#### 2. Create a structure and implement "Run()" function for the struct.

FilterEngine has an interface Filter defined for the filters

```
// Filter has function to run filter
type Filter interface {
	Run(interface{}, *events.Event)
}
```
So, the Run function should have **func(interface{}, *events.Event)** signature to satisfy the Filter interface

```
// ImageTagChecker add recommendations to the event object if latest image tag is used in pod containers
type ImageTagChecker struct {
}

// NewImageTagChecker creates new ImageTagChecker object
func NewImageTagChecker() *ImageTagChecker {
	return &ImageTagChecker{}
}

// Run filer and modifies event struct
func (f *ImageTagChecker) Run(object interface{}, event *events.Event) {

	// your logic goes here

}
```

#### 3. Add your logic in the Run() function
Now, put your logic in the **Run()** function to parse resource object, run validation and modify Event struct. The fields in the Event struct can be found [here](https://github.com/infracloudio/botkube/blob/master/pkg/events/events.go#L31).
```
// Run filers and modifies event struct
func (f *ImageTagChecker) Run(object interface{}, event *events.Event) {

	// Run checks only for Pod resource kind
	if event.Kind != "Pod" {
		return
	}

	// Parse resource specs object
	// https://godoc.org/k8s.io/api/core/v1#Pod
	podObj, ok := object.(*apiV1.Pod)
	if !ok {
		return
	}

	// Check image tag in initContainers
	for _, ic := range podObj.Spec.InitContainers {
		images := strings.Split(ic.Image, ":")
		if len(images) == 1 || images[1] == "latest" {

			// Add messages in the Recommedations list
			event.Recommendations = append(event.Recommendations, ":latest tag used in image '"+ic.Image+"' of initContainer '"+ic.Name+"' should be avoided.\n")
		}
	}

	// Check image tag in Containers
	for _, c := range podObj.Spec.Containers {
		images := strings.Split(c.Image, ":")
		if len(images) == 1 || images[1] == "latest" {

			// Add messages in the Recommedations list
			event.Recommendations = append(event.Recommendations, ":latest tag used in image '"+c.Image+"' of Container '"+c.Name+"' should be avoided.\n")
		}
	}
	log.Logger.Info("Image tag filter successful!")
}
```
### B. Register your filter to filterengine

- Once your Run() function is completed, you can run go build to check for any compilation error.
- After that, open **botkube/pkg/filterengine/filterengine.go** and register your filter by adding the struct to **Filters** list
	// Filters contains the lists of available filters
	// TODO: load this dynamically
	Filters = []Filter{
		filters.NewIngressValidator(),
		filters.NewImageTagChecker(),   // Register image tag filter
}

### C. Rebuild and deploy the BotKube controller

- Build the BotKube controller docker image with `build/docker.sh <docker-repo> <tag>`.
- Push the image to Dockerhub registry.
- Install/Upgrade your BotKube deployment (Steps are provided [here](/installation)).
