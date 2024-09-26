import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { CardTutorial } from "@site/src/components/Card/Tutorial";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Get started with {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          AI-powered expertise to troubleshoot, optimize pipelines,
          <br />
          and manage infrastructure seamlessly across multiple tools—all from one place.
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
        <p>Learn more about one of the solutions:</p>
        <div className="row" style={{ marginBottom: "40px" }}>
          <div className="col col--12">
            <CardTutorial
              title="🖥️ Fuse CLI"
              body={
                <ul>
                  <li>Easy Terminal Integration: Get insights and automation directly in your terminal</li>
                  <li>
                    Natural Language Commands: Use simple, conversational commands to interact with your infrastructure
                  </li>
                  <li>No Admin Permissions Needed: Install and start without any platform admin access</li>
                  <li>Quick Setup: Get up and running in minutes with minimal configuration</li>
                </ul>
              }
              buttonLabel="Get started"
              link="/overview"
            />
          </div>
          <div className="col col--12">
            <CardTutorial
              title="💬 Chat Platform"
              body={
                <ul>
                  <li>
                    Real-Time Collaboration: Share alerts and troubleshoot with your team in Slack or Microsoft Teams
                  </li>
                  <li>Familiar Interface: Clear, rich messages for quick understanding</li>
                  <li>K8s Agent Setup: Requires Install an agent in your cluster for full features</li>
                  <li>Admin Access Needed: Requires admin permissions to set up in Slack or Teams</li>
                </ul>
              }
              buttonLabel="Get started"
              link="/chat-platform/overview"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
