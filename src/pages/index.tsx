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
          <div className="col col--6">
            <CardTutorial
              title="🖥️ Fuse CLI"
              body={
                <ul>
                  <li>
                    <b>Easy Terminal Integration:</b> Get insights and automation directly in your terminal
                  </li>
                  <li>
                    <b>Natural Language Commands:</b> Use simple, conversational commands to interact with your
                    infrastructure
                  </li>
                  <li>
                    <b>No Admin Permissions Needed:</b> Install and start without any platform admin access
                  </li>
                  <li>
                    <b>Quick Setup:</b> Get up and running in minutes with minimal configuration
                  </li>
                </ul>
              }
              image={"/images/slack-ai.png"}
              buttonLabel="Read the docs"
              link="/overview"
            />
          </div>
          <div className="col col--6">
            <CardTutorial
              title="💬 Chat Platform"
              body={
                <ul>
                  <li>
                    <b>Real-Time Collaboration:</b> Share alerts and troubleshoot with your team in Slack or Microsoft
                    Teams
                  </li>
                  <li>
                    <b>Familiar Interface:</b> Clear, rich messages for quick understanding
                  </li>
                  <li>
                    <b>K8s Agent Setup:</b> Requires Install an agent in your cluster for full features
                  </li>
                  <li>
                    <b>Admin Access Needed:</b> Requires admin permissions to set up in Slack or Teams
                  </li>
                </ul>
              }
              image={"/images/fuse-cli.png"}
              buttonLabel="Read the docs"
              link="/chat-platform/overview"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
