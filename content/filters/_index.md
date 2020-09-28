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

Set package name as "filters" and import required packages

```
package filters

import (
        "strings"

        "github.com/infracloudio/botkube/pkg/events"
        "github.com/infracloudio/botkube/pkg/filterengine"
        log "github.com/infracloudio/botkube/pkg/logging"

        apiV1 "k8s.io/api/core/v1"
)
```

#### 2. Create a structure and implement "Run() and Describe()" methods for the struct.

FilterEngine has an interface Filter defined for the filters

```
// Filter has method to run filter
type Filter interface {
        Run(interface{}, *events.Event)
        Describe() string
}
```

To implement the Filter interface, your struct should have **Run(interface{}, *events.Event)** and **Describe() string** methods

```
// ImageTagChecker add recommendations to the event object if latest image tag is used in pod containers
type ImageTagChecker struct {
}

// Run filer and modifies event struct
func (f *ImageTagChecker) Run(object interface{}, event *events.Event) {

	// your logic goes here

}

// Describe filter
func (f ImageTagChecker) Describe() string {
        return "Checks and adds recommendation if 'latest' image tag is used for container image."
}
```

#### 3. Add your logic in the Run() function
Now, put your logic in the **Run()** function to parse resource object, run validation and modify Event struct. The fields in the Event struct can be found [here](https://github.com/infracloudio/botkube/blob/master/pkg/events/events.go#L31).

```
// Run filers and modifies event struct
func (f *ImageTagChecker) Run(object interface{}, event *events.Event) {

	// Run checks only for Pod resource kind and when event type is CreateEvent
	if event.Kind != "Pod" || event.Type != config.CreateEvent {
		return
	}

	// Convert Unstructured object into K8s typed object
	// https://godoc.org/k8s.io/api/core/v1#Pod
	var podObj coreV1.Pod
	err := utils.TransformIntoTypedObject(object.(*unstructured.Unstructured), &podObj)
	if err != nil {
		log.Errorf("Unable to tranform object type: %v, into type: %v", reflect.TypeOf(object), reflect.TypeOf(podObj))
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
#### 4. Register your filter to filterengine
You can call **Register()** method implemented by filterengine to register the filter at startup

```
// Register the filter
func init() {
        filterengine.DefaultFilterEngine.Register(ImageTagChecker{})
}

```

### B. Rebuild and deploy the BotKube backend

- Build the BotKube backend docker image with `make container-image`.
- Push the image to Dockerhub registry.
- Install/Upgrade your BotKube deployment (Steps are provided [here](/installation)).

_The implementation of built in filters can be found at: https://github.com/infracloudio/botkube/tree/develop/pkg/filterengine/filters_
