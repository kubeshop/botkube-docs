import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import versions from '@site/versions.json';
import VersionsArchived from '@site/versionsArchived.json';
const VersionsArchivedList = Object.entries(VersionsArchived);
// import ArchivedVersions from '@site/archivedVersions.json';


export default function VersionsPage() {
    const {siteConfig} = useDocusaurusContext();
    const latestVersion = versions[0];
    return (
        <Layout>
            <div className="wrapperV1">
                {/* <Container className="docsContainer"> */}
             <header>
              <h2>{`${siteConfig.title} Versions`}</h2>
               <th>{latestVersion}</th>
            </header>
                {/* </Container> */}
            </div>

            {/*  */}

                


        </Layout>
      );

}