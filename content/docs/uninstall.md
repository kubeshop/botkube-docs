+++
title = "Remove botkube"
description = "Steps to remove botkube app and controller"
date = 2019-01-04T16:16:15+05:30
draft = false
weight = 50
toc = true
bref = "Steps to uninstall botkube app from your slack workspace and botkube controller from your kubernetes cluster"
+++

<h3 class="section-head" id="h-uninstall-botkube-slack"><a href="#h-uninstall-botkube-slack">Remove botkube from slack workspace</a></h3>
- Gotp https://slack.com/apps/manage
- Click on "botkube" and click on "Remove App" button

<h3 class="section-head" id="h-uninstall-botkube-k8s"><a href="#h-uninstall-botkube-k8s">Remove botkube controller from kubernetes cluster</a></h3>

<h4>Using helm</h4>
<p>If you have installed botkube controller using `helm`, execute following command to completely remove botkube and related resources from your cluster</p>

```bash
$ helm delete --purge botkube
```
