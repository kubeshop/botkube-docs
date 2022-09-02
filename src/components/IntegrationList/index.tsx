import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

type Integration = {
  name: string;
  image: string;
  link: string;
};

type Props = {
  integrations?: Integration[];
};

export const IntegrationList = (props: Props) => {
  const { integrations = [] } = props;

  return (
    <div className={styles.integrations}>
      {integrations.map(integration => (
        <div key={integration.name} className={styles.integrationsItem}>
          <Link to={integration.link} className="integrations__link">
            <img src={integration.image} alt={integration.name} className="integrations__image" />
          </Link>
        </div>
      ))}
    </div>
  );
};
