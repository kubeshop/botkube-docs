import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./index.module.scss";

type FeatureItem = {
  title: string;
  iconClass: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Privacy",
    iconClass: "fas fa-user-secret",
    description: (
      <>
        The backend for the BotKube app runs in your Kubernetes cluster - thus you have complete control on your data
        and software.
      </>
    ),
  },
  {
    title: "Execute kubectl commands",
    iconClass: "fas fa-terminal",
    description: (
      <>
        Same old Kubectl syntax - just a new interface. You do not have to learn anything new! Plus you can configure
        which Kubectl commands BotKube can executes. See <Link to="/docs/configuration">configuration</Link> for
        details.
      </>
    ),
  },
  {
    title: "Support for multiple interfaces",
    iconClass: "fas fa-tasks",
    description: (
      <>
        Like Slack, BotKube can also be integrated with Mattermost, Microsoft Teams, ElasticSearch and outgoing webhook.
        See <Link to="/docs/configuration">configuration</Link> syntax for details.
      </>
    ),
  },
  {
    title: "Supports Custom Resources",
    iconClass: "fas fa-puzzle-piece",
    description: (
      <>
        BotKube can monitor literally any Kubernetes resource including Custom Resource. This enables you to configure
        alerts on some interesting events like - certificate issue/expiry if you are using cert-manager or backup
        failure in case you are using backup tools like Velero or Kanister.
      </>
    ),
  },
  {
    title: "Debug Anywhere, Anytime",
    iconClass: "fas fa-cogs",
    description: (
      <>
        With @BotKube you can monitor and debug Kubernetes deployments from anywhere. Even while you are camping without
        a laptop, you can use Slack, Mattermost or MS Teams mobile app and get crucial information.
      </>
    ),
  },
  {
    title: "Easy to configure",
    iconClass: "fas fa-cogs",
    description: (
      <>
        Get notifications about things that you really care for. You can configure events or objects or namespaces that
        you want to be informed about.
      </>
    ),
  },
  {
    title: "Deploy on any Kubernetes cluster",
    iconClass: "fas fa-cloud",
    description: (
      <>
        You can deploy BotKube backend on any Kubernetes cluster, whether it is Minikube or cloud managed Kubernetes or
        anything in between.
      </>
    ),
  },
  {
    title: "Add custom filters",
    iconClass: "fas fa-plug",
    description: (
      <>
        It is very easy to write your own filters and registering them to FilterEngine. Follow
        <Link to="/docs/filters"> this</Link> guide to know more.
      </>
    ),
  },
  {
    title: "Security",
    iconClass: "fas fa-shield-alt",
    description: <>By default BotKube uses a READONLY service account, you can customize this to your needs.</>,
  },
  {
    title: "Open source",
    iconClass: "fab fa-github",
    description: <>BotKube backend is open source and we welcome your requirements and contributions.</>,
  },
];

function Feature({ title, iconClass, description }: FeatureItem) {
  return (
    <div className="col col--6">
      <div className={clsx("text--center", styles.feature)}>
        <h3>
          <i className={iconClass} role="img" /> {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function BotKubeFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center">Features</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
