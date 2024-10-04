import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { CardTutorial } from "@site/src/components/Card/Tutorial";
import styles from "./index.module.css";
import ChatIcon from "@site/static/images/chat-icon.svg";
import TerminalIcon from "@site/static/images/terminal-icon.svg";

const fuseFeatures = [
  { headline: "Quick Setup", description: "Get up and running in seconds with minimal configuration" },
  {
    headline: "Reduce Context Switching",
    description: "Gain in-depth expertise and tailored assistance directly in your terminal",
  },
  {
    headline: "Natural Language Commands",
    description: "Use simple, conversational commands to interact with your infrastructure",
  },
  {
    headline: "Seamless Tool Integration",
    description: "Integrate with your locally installed tools, with full control over the process",
  },
];

const chatPlatformFeatures = [
  {
    headline: "Real-Time Collaboration",
    description: "Receive alerts and troubleshoot with your team in Slack or Microsoft Teams",
  },
  { headline: "Familiar Interface", description: "Get clear, rich messages for quick understanding" },
  {
    headline: "K8s Agent Setup",
    description: "Requires an agent installed in your Kubernetes cluster for full features",
  },
  {
    headline: "Admin Access Needed",
    description: "Requires admin permissions to set up in Slack, Teams or other chat platform",
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title} documentation
        </Heading>
        <p className="hero__subtitle" style={{ marginBottom: 0 }}>
          Learn more about Botkube, AI-powered solution for DevOps, SRE and Platform Engineers.
        </p>
      </div>
    </header>
  );
}

interface FeatureListProps {
  items: { headline: string; description: string }[];
}

function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className={styles.list}>
      {items.map(feature => (
        <li key={feature.headline}>
          <strong>{feature.headline}:</strong> {feature.description}
        </li>
      ))}
    </ul>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Get started with ${siteConfig.title}`} description={siteConfig.tagline}>
      <HomepageHeader />
      <main className="container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ marginBottom: "40px" }}>
          <div className="col col--12" style={{ marginBottom: "2rem" }}>
            <CardTutorial
              body={
                <div className="row">
                  <div className="col col--6">
                    <Heading as="h2">
                      <span className={styles.icon}>
                        <TerminalIcon />
                      </span>{" "}
                      Fuse CLI
                    </Heading>
                    <FeatureList items={fuseFeatures} />
                  </div>
                  <div className="col col--5 col--offset-1">
                    <img src="/images/fuse.png" alt="Fuse CLI" className={styles.image} />
                  </div>
                </div>
              }
              buttonLabel="Read the docs"
              buttonLarge
              link="/overview"
            />
          </div>
          <div className="col col--12" style={{ marginBottom: "2rem" }}>
            <CardTutorial
              body={
                <div className="row">
                  <div className="col col--6">
                    <Heading as="h2">
                      <span className={styles.icon}>
                        <ChatIcon />
                      </span>{" "}
                      Chat Platform
                    </Heading>
                    <FeatureList items={chatPlatformFeatures} />
                  </div>
                  <div className="col col--5 col--offset-1">
                    <img src="/images/chat-platform.png" alt="Chat Platform" className={styles.image} />
                  </div>
                </div>
              }
              buttonLabel="Read the docs"
              buttonLarge
              link="/chat-platform/overview"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
