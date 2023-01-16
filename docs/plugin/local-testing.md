---
id: local-testing
title: "Local testing"
sidebar_position: 6
---

This document describes steps for running Botkube core locally together with a local file server for serving your plugins during development phase.

**Prerequisite**

- [Node.js](https://nodejs.org/en/download/), to use `npx`

**Steps**

1. Follow steps from [`CONTRIBUTING.md`](https://github.com/kubeshop/botkube/blob/main/CONTRIBUTING.md#build-and-run-locally) about running Botkube locally.

2. Create a file with your plugins' repository, plugin configuration and bindings for enabled communication platform:

   ```yaml
   plugins:
     repositories:
       local-repo:
         url: http://localhost:8080/plugins-index.yaml

   executors:
     "plugin-based":
       local-repo/executor-name: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
         enabled: true
         config: {} # Plugin's specific configuration.
   sources:
     "plugin-based":
       local-repo/source-name: # Plugin name syntax: <repo>/<plugin>[@<version>]. If version is not provided, the latest version from repository is used.
         enabled: true
         config: {} # Plugin's specific configuration.

   communications:
     # Enable a given communication platform and define bindings to a given executor and source plugins.
   ```

   For example, for Slack and example `echo` and `ticker` plugins provide `appToken` and `botToken` and create `/tmp/config-values.yaml` with the following values:

   <details>
     <summary>Create /tmp/config-values.yaml</summary>

   ```yaml
   cat << EOF > /tmp/config-values.yaml
   plugins:
     repositories:
       local-repo:
         url: http://localhost:8080/plugins-index.yaml

   executors:
     "plugin-based":
       local-repo/echo:
         enabled: true
         config:
           changeResponseToUpperCase: true
   sources:
     "plugin-based":
       local-repo/ticker:
         enabled: true
         config:
           duration: 5s
   communications:
     default-group:
       socketSlack:
         enabled: true
         channels:
           default:
             name: random
             bindings:
               executors:
                 - 'plugin-based'
               sources:
                 - 'plugin-based'
         appToken: "" # provide your token starting with xapp-1-
         botToken: "" # provide your token starting with xoxb-
   settings:
     clusterName: local-dev
   EOF
   ```

   </details>

3. In your plugin project directory, start a static plugin server:

   ```bash
   # Use https://github.com/vercel/serve
   npx serve --listen 8080
   ```

   :::note
   If Botkube runs on external Kubernetes cluster, you can use the tunneling software, for example [`ngrok`](https://ngrok.com/). It creates an externally addressable URL for a port you open locally on your machine.
   :::

4. In your plugin project directory open a new terminal window.
5. Export Botkube plugins cache directory:

   ```bash
   export BOTKUBE_PLUGINS_CACHE__DIR="/tmp/plugins"
   ```

6. Export Botkube repository path cloned in the first step:

   ```bash
   export BOTKUBE_REPO_PATH={botkube_repo_path}
   ```

7. Export configuration files:

   ```bash
   export BOTKUBE_CONFIG_PATHS="${BOTKUBE_REPO_PATH}/helm/botkube/values.yaml,/tmp/config-values.yaml"
   ```

8. Build plugins and start Botkube:

   :::note
   Each time you change a plugin source code, re-run the above command.
   :::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="tab-container-nested">
<Tabs>
  <TabItem value="raw" label="For scratch projects" default>

1. Download index builder:

```bash
go get github.com/kubeshop/botkube/hack
```

2. Build plugins and run Botkube:

```bash
# rebuild plugins only for current GOOS and GOARCH
goreleaser build --rm-dist --snapshot --single-target &&
# regenerate index
go run github.com/kubeshop/botkube/hack -binaries-path "./dist" -url-base-path "http://localhost:8080/dist" &&
# remove cached plugins
rm -rf $BOTKUBE_PLUGINS_CACHE__DIR &&
# start Botkube
${BOTKUBE_REPO_PATH}/botkube
```

  </TabItem>
  <TabItem value="repo" label="For projects created from template repository">

```bash
# rebuild plugins only for current GOOS and GOARCH
make build-plugins-single &&
# regenerate index
env PLUGIN_DOWNLOAD_URL_BASE_PATH="http://localhost:8080/dist" make gen-plugin-index &&
# remove cached plugins
rm -rf $BOTKUBE_PLUGINS_CACHE__DIR &&
# start Botkube
${BOTKUBE_REPO_PATH}/botkube
```

  </TabItem>
</Tabs>
</div>
