import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const Hero = () => {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("heroTitle", styles.heroTitle)}>
          <img src={useBaseUrl("/images/botkube.png")} alt="BotKube log" className={styles.heroLogo} />
          BotKube
        </h1>
        <p className="hero__subtitle">A messaging bot for monitoring and debugging Kubernetes clusters.</p>
        <div className={styles.mainSloganLinks}>
          <Link
            to={useBaseUrl("/docs/installation/")}
            title="Installation guide"
            className="button button--lg button--primary"
          >
            <i className="fas fa-rocket" /> Try Now
          </Link>
          <a
            href="https://join.botkube.io"
            title="Community Slack"
            className="button button--lg button--secondary"
            target="_blank"
          >
            <i className="fab fa-slack" /> Get Help
          </a>
        </div>
      </div>
    </header>
  );
};
