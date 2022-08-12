import clsx from 'clsx';
import React from 'react';

import styles from './index.module.scss'

export const Hero = () => {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('heroTitle', styles.heroTitle)}>
          <img src="/images/botkube.png" alt="BotKube log" className={styles.heroLogo} />
          BotKube
        </h1>
        <p className="hero__subtitle">
          BotKube is a messaging bot for monitoring and debugging Kubernetes clusters. It's built and maintained with ❤️
          by Kubeshop
        </p>
      </div>
    </header>
  );
}
