import React from 'react';
import styles from './index.module.scss';

type Integration = {
  name: string
  image: string
  link: string
}

type Props = {
  integrations?: Integration[]
}

export const IntegrationList = (props: Props) => {
  const { integrations = [] } = props

  return (
    <div className={styles.integrations}>
      {integrations.map(integration => (
        <div className={styles.integrations__item}>
          <a href={integration.link} className="integrations__link">
            <img src={integration.image} alt={integration.name} className="integrations__image" />
          </a>
        </div>
      ))}
    </div>
  );
}
