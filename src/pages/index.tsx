import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { CardTutorial } from "@site/src/components/Card/Tutorial";
import styles from "./index.module.css";

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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Get started with ${siteConfig.title}`} description="${siteConfig.}}">
      <HomepageHeader />
      <main className="container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ marginBottom: "40px" }}>
          <div className="col col--12" style={{ marginBottom: "2rem" }}>
            <CardTutorial
              body={
                <div className="row">
                  <div className="col col--6">
                    <Heading as="h2">🖥️ Fuse CLI</Heading>
                    <ul className={styles.list}>
                      <li>
                        <b>Quick Setup:</b> Get up and running in seconds with minimal configuration
                      </li>
                      <li>
                        <b>Reduce Context Switching:</b> Get in-depth expertise and tailored assistance directly in your
                        terminal
                      </li>
                      <li>
                        <b>Natural Language Commands:</b> Use simple, conversational commands to interact with your
                        infrastructure
                      </li>
                      <li>
                        <b>Seamless tool integration:</b> Integrates with your locally installed tools, with full
                        control over the process.
                      </li>
                    </ul>
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
                    <Heading as="h2">💬 Chat Platform</Heading>
                    <ul className={styles.list}>
                      <li>
                        <b>Real-Time Collaboration:</b> Receive alerts and troubleshoot with your team in Slack or
                        Microsoft Teams
                      </li>
                      <li>
                        <b>Familiar Interface:</b> Clear, rich messages for quick understanding
                      </li>
                      <li>
                        <b>K8s Agent Setup:</b> Requires Install an agent in your Kubernetes cluster for full features
                      </li>
                      <li>
                        <b>Admin Access Needed:</b> Requires admin permissions to set up in Slack, Teams or other chat
                        platform
                      </li>
                    </ul>
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
