import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import clsx from "clsx";
import styles from "./index.module.scss";
import { PluginContributorsData } from "@site/src/plugins/contributors/types";
import Link from "@docusaurus/Link";

export const ContributorsList = () => {
  const { contributors = [] } = usePluginData("docusaurus-plugin-contributors") as PluginContributorsData;

  return (
    <div className={clsx("row", styles.contributors)}>
      {contributors.map(contributor => (
        <div key={contributor.id} className={clsx("col", "col--4", styles.contributorsItem)}>
          <Link href={contributor.html_url} title={contributor.login} target="blank">
            <img src={contributor.avatar_url} alt={contributor.login} />
          </Link>
          <div>
            <div className={styles.contributorNickname}>
              <Link href={contributor.html_url} title={contributor.login} target="blank">
                {contributor.login}
              </Link>
            </div>
            <div className={styles.contribution}>{contributor.contributions} commits</div>
          </div>
        </div>
      ))}
    </div>
  );
};
