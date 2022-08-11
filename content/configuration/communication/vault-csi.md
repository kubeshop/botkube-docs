---
id: vault-csi
title: "Tokens from Vault via CSI driver"
sidebar_position: 1
---

This tutorial shows how to install BotKube which takes the configuration from Vault instance.

## Prerequisites

- Kubernetes Clusters that supports CSI.

    For example, to run [K3s](https://k3s.io/) using [Lima](https://github.com/lima-vm/lima), run:
    ```bash
    limactl start template://k3s
    ```

- [Slack integration installed](/installation/slack/#install-botkube-slack-app-to-your-slack-workspace).
- [`helm`](https://helm.sh/docs/intro/install/) v3 installed.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl) installed.


## Steps

This instruction guides you through the installation of BotKube and Vault on a Kubernetes cluster and configuring them together.

1. Install Vault with CSI enabled:
    ```bash
    helm repo add hashicorp https://helm.releases.hashicorp.com
    helm repo update
    helm install vault hashicorp/vault --namespace default \
        --set "server.dev.enabled=true" \
        --set "injector.enabled=false" \
        --set "csi.enabled=true"
    ```

2. Add Slack token in Vault:
    ```bash
    # Exec to pod
    kubectl exec -n default -it vault-0 -- /bin/sh
    ```
    ```bash
    # Write the token to Vault
    vault kv put secret/slack token={token}
    ```

3. Enable Vault's Kubernetes authentication:
    ```bash
    vault auth enable kubernetes
    vault write auth/kubernetes/config \
        kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443"
    ```
    ```bash
    vault policy write internal-app - <<EOF
    path "secret/data/slack" {
      capabilities = ["read"]
    }
    EOF
    ```
    ```bash
    vault write auth/kubernetes/role/database \
        bound_service_account_names=botkube-sa \
        bound_service_account_namespaces=default \
        policies=internal-app \
        ttl=20m
    ```
    ```bash
    # Exit from the Vault Pod
    exit
    ```

4. Install the Secrets Store CSI driver:
    ```bash
    helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
    helm install csi secrets-store-csi-driver/secrets-store-csi-driver \
    --namespace default \
    --set syncSecret.enabled=true
    ```

5. Create BotKue installation parameters:
    ```yaml
    cat > /tmp/values.yaml << ENDOFFILE
    extraObjects:
      - apiVersion: secrets-store.csi.x-k8s.io/v1
        kind: SecretProviderClass
        metadata:
          name: vault-database
        spec:
          provider: vault
          secretObjects:
            - data:
                - key: token
                  objectName: "slack-token"
              secretName: communication-slack
              type: Opaque
          parameters:
            vaultAddress: "http://vault.default:8200"
            roleName: "database"
            objects: |
              - objectName: "slack-token"
                secretPath: "secret/data/slack"
                secretKey: "token"

    communications:
      # Settings for Slack
      slack:
        enabled: true
        channel: 'random'
        # token - specified via env variable

    extraEnv:
      - name: COMMUNICATIONS_SLACK_TOKEN
        valueFrom:
          secretKeyRef:
            name: communication-slack
            key: token

    extraVolumeMounts:
      - name: secrets-store-inline
        mountPath: "/mnt/secrets-store"
        readOnly: true

    extraVolumes:
      - name: secrets-store-inline
        csi:
          driver: secrets-store.csi.k8s.io
          readOnly: true
          volumeAttributes:
            secretProviderClass: "vault-database"
    ENDOFFILE
    ```

6. Install BotKube:
    <!--- TODO(https://github.com/kubeshop/botkube/issues/595): replace the version with v0.13.0 once released -->

    :::note
    You need to clone the https://github.com/kubeshop/botkube first.
    :::

    ```bash
    helm install botkube --namespace default \
    --set image.tag=v9.99.9-dev \
    -f /tmp/values.yaml \
    ./helm/botkube
    ```
