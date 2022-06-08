---
title: "Outgoing Webhook development"
weight: 11
---

To develop the outgoing webhook integration, you can use [Echo-Server](https://github.com/Ealenn/Echo-Server), which logs all incoming requests.

1. Install Echo server with Helm:
    
    ```bash
    helm repo add ealenn https://ealenn.github.io/charts
    helm install echo-server ealenn/echo-server --set application.logs.ignore.ping=true --set application.enable.environment=false --wait
    ```

1. Go through the [Outgoing Webhook BotKube installation](https://www.botkube.io/installation/webhook/) instruction. Provide `http://echo-server.default` as `WEBHOOK_URL`.

1. Watch the logs:

    ```bash
    kubectl logs -l app.kubernetes.io/name=echo-server -f
    ```

    Every incoming request will be logged there.