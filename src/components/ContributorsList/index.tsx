import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './index.module.scss';
import { PluginContributorsData } from '@site/src/plugins/contributors/types';


export const ContributorsList = () => {
  const { contributors = [] } = usePluginData('docusaurus-plugin-contributors') as PluginContributorsData;
  console.log('usePluginData::contributors', contributors);
  return (
    <div className={clsx('row', styles.contributors)}>
      {contributors.map(contributor => (
        <div key={contributor.id} className={clsx('col', 'col--4', styles.contributorsItem)}>
          <a href={contributor.html_url} title={contributor.login} target="blank">
            <img src={contributor.avatar_url} alt={contributor.login} />
          </a>
          <div>
            <div className={styles.contributorNickName}>
              <a href={contributor.html_url} title={contributor.login} target="blank">{contributor.login}</a>
            </div>
            <div className={styles.contribution}>{contributor.contributions} commits</div>
          </div>
        </div>
      ))}
    </div>
  );
}
