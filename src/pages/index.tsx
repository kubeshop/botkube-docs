import React from 'react';
import { Link } from 'react-router-dom';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { BotKubeFeatures } from '@site/src/components/BotKubeFeatures';
import { Hero } from '@site/src/components/Hero';
import styles from './index.module.scss';
import clsx from 'clsx';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}>
      <Hero />
      <main className="container">
        <section className={styles.mainSlogan}>
          <img src="/images/botkube_multicluster_v2.svg" alt="BotKube multi-cluster presentation" />
          <p className={styles.mainSloganDesc}>
            BotKube can be integrated with multiple messaging platforms like - Slack, Mattermost, Microsoft Teams to
            help you monitor your Kubernetes cluster(s), debug critical deployments and gives recommendations for
            standard practices by running checks on the Kubernetes resources.
          </p>
          <div className={styles.mainSloganLinks}>
            <Link to="/docs/installation" title="Installation guide" className="button"><i className="fas fa-rocket" /> Try Now!</Link>
            <a href="https://github.com/kubeshop/botkube" title="GitHub repository" className="button"><i className="fab fa-github"/> View Source</a>
          </div>
        </section>
        <section className={styles.whatCanDo}>
          <h2>What can BotKube do?</h2>
          <div className={clsx('row', styles.whatCanDoFeature)}>
            <div  className="col col-6">
              <h3>Monitor</h3>
              <ul>
                <li>BotKube watches Kubernetes resources and sends a notification to the channel if any event occurs for example a ImagePullBackOff error.</li>
                <li>You can customize the objects and level of events you want to get from Kubernetes cluster.</li>
                <li>You can turn on/off notifications simply by sending a message to @BotKube</li>
              </ul>
            </div>
            <div className="col col-6">
              <img src="/images/monitor.gif" alt="BotKube monitoring" />
            </div>
          </div>
          <div className={clsx('row', styles.whatCanDoFeature)}>
            <div className="col col-6">
              <h3>Debug</h3>
              <ul>
                <li>BotKube can execute kubectl commands on Kubernetes cluster without giving access to Kubeconfig or underlying infrastructure.</li>
                <li>With BotKube you can debug your deployment, services or anything about your cluster right from your messaging window ;) </li>
                <li>BotKube can talk to multiple clusters, you just need to deploy BotKube backend in each cluster with the same token. That's it! </li>
              </ul>
            </div>
            <div className="col col-6">
              <img src="/images/exec.gif" alt="" />
            </div>
          </div>
          <div className={clsx('row', styles.whatCanDoFeature)}>
            <div className="col col-6">
              <h3>Run Checks</h3>
              <ul>
                <li>Some checks are built in but you can define and add additional checks for specific resources or events.</li>
                <li>Filters allow you to do more things for a specific event - such as adding a new message.</li>
              </ul>
            </div>
            <div className="col col-6">
              <img src="/images/checks.gif" alt="BotKube run checks" />
            </div>
          </div>
        </section>
        <BotKubeFeatures />
      </main>
    </Layout>
  );
}
