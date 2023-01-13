---
id: local-testing
title: "Local testing"
sidebar_position: 6
---

This document describes steps for running Botkube core locally together with a local file server for serving your plugins during development phase.

**Steps**

1. Follow steps from [`CONTRIBUTING.md`](https://github.com/kubeshop/botkube/blob/main/CONTRIBUTING.md#build-and-run-locally) about running Botkube locally.

2. Edit the `comm_config.yaml` file. Add plugins repository, plugin configuration and bind them to enabled communication platform:

   ```yaml
   plugins:
     repositories:
       local-repo:
         url: https://localhost:8080/plugins-index.yaml

   executors:
     "plugin-based":
       local-repo/executor-name@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
         enabled: true
         config: {} # Plugin's specific configuration.
   sources:
     "plugin-based":
       local-repo/source-name@v1.0.0: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
         enabled: true
         config: {} # Plugin's specific configuration.

   communications:
     # Enable a given communication platform and define bindings to a given executor and source plugins.
   ```

3. Start static plugins' server:

   ```bash
   # Use https://github.com/vercel/serve
   npx serve --listen 8080
   ```

   :::note
   If Botkube runs on external Kubernetes cluster, you can use the tunneling software, for example [`ngrok`](https://ngrok.com/). It creates an externally addressable URL for a port you open locally on your machine.
   :::

4. Export Botkube plugins cache directory:

   ```bash
   export BOTKUBE_PLUGINS_CACHE__DIR="/tmp/plugins"
   ```

5. Export Botkube repository path cloned in the first step:

   ```bash
   export BOTKUBE_REPO_PATH={botkube_repo_path}
   ```

6. In other terminal window, run:

   ```bash
   # rebuild plugins only for current GOOS and GOARCH
   goreleaser build --rm-dist --snapshot --single-target &&
   # regenerate index
   go run github.com/kubeshop/botkube/hack -binaries-path "./dist" -url-base-path "http://localhost:8080/dist" &&
   # remove cached plugins
   rm -rf $BOTKUBE_PLUGINS_CACHE__DIR &&
   # start botkube to fetch fresh plugins
   ${BOTKUBE_REPO_PATH}/botkube
   ```

   :::note
   Each time you change a plugin source code, re-run the above command.
   :::
