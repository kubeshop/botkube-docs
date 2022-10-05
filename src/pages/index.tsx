import React from "react";
import clsx from "clsx";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import { BotKubeFeatures } from "@site/src/components/BotKubeFeatures";
import { Hero } from "@site/src/components/Hero";
import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title} - ${siteConfig.tagline}`} description={siteConfig.tagline}>
      <Hero />
      <main className="container">
        <section className={styles.mainSlogan}>
          <img src={useBaseUrl("/images/botkube_multicluster_v2.svg")} alt="Botkube multi-cluster presentation" />
          <p className={styles.mainSloganDesc}>
            Botkube can be integrated with multiple messaging platforms like Slack, Microsoft Teams, Discord, or
            Mattermost to help you monitor your Kubernetes cluster(s), debug critical deployments, and get
            recommendations for standard practices by running checks on Kubernetes resources.
          </p>
        </section>
        <section className={styles.whatCanDo}>
          <h2>What can Botkube do?</h2>
          <div className={clsx("row", styles.whatCanDoFeature)}>
            <div className="col col-6">
              <h3>Monitor</h3>
              <ul>
                <li>
                  Botkube watches Kubernetes resources and sends a notification to the configured channel if any event
                  occurs, for example, an ImagePullBackOff error.
                </li>
                <li>You can customize the objects and level of events you want to get from your Kubernetes cluster.</li>
                <li>You can turn on/off notifications simply by sending a message to @Botkube</li>
              </ul>
            </div>
            <div className="col col-6">
              <img src={useBaseUrl("/images/monitor.gif")} alt="Botkube monitoring" />
            </div>
          </div>
          <div className={clsx("row", styles.whatCanDoFeature)}>
            <div className="col col-6">
              <h3>Debug</h3>
              <ul>
                <li>
                  Botkube can execute kubectl commands on your Kubernetes cluster without giving access to Kubeconfig or
                  underlying infrastructure.
                </li>
                <li>
                  With Botkube, you can debug your deployment, services, or anything about your cluster, right from your
                  messaging window ;){" "}
                </li>
                <li>
                  Botkube can talk to multiple clusters, you just need to deploy Botkube backend in each cluster with
                  the same token. That's it!{" "}
                </li>
              </ul>
            </div>
            <div className="col col-6">
              <img src={useBaseUrl("/images/exec.gif")} alt="" />
            </div>
          </div>
          <div className={clsx("row", styles.whatCanDoFeature)}>
            <div className="col col-6">
              <h3>Run Checks</h3>
              <ul>
                <li>
                  Some checks are built in but you can define and add additional checks for specific resources or
                  events.
                </li>
                <li>Filters allow you to do more things for a specific event - such as adding a new message.</li>
              </ul>
            </div>
            <div className="col col-6">
              <img src={useBaseUrl("/images/checks.gif")} alt="Botkube run checks" />
            </div>
          </div>
        </section>
        <BotKubeFeatures />
      </main>
    </Layout>
  );
}
