import React from 'react';
import Layout from '@theme/Layout';
// import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import versions from '@site/versions.json';
import VersionsArchived from '@site/versionsArchived.json';
const VersionsArchivedList = Object.entries(VersionsArchived);
// import ArchivedVersions from '@site/archivedVersions.json';

// importing container component 
import Container from '@site/src/components/v1/Container';
import '@site/src/components/v1/cascading.css'


export default function VersionsPage() {
    const {siteConfig} = useDocusaurusContext();
    const latestVersion = versions[0];
    return (
        <Layout>
            <div className="wrapperV1">
                <Container className="docsContainer">
                    <div></div>
             <header>
              <h2>{`${siteConfig.title} Versions`}</h2>
               
            </header>
            <h3 id="latest">Current version (Stable)</h3>
            <p>Latest stable version of Botkube</p>
            <table>
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <Link to="/">Documentation</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 id="rc">Latest version</h3>
            <p>
              Here you can find the latest unreleased documentation and code.
            </p>
            <table>
              <tbody>
                <tr>
                  <th>Unreleased</th>
                  <td>
                    <Link to="next/">Documentation</Link>
                  </td>
               
                </tr>
              </tbody>
            </table>

            <h3 id="archive">Past Versions</h3>
            <p>
              Here you can find documentation for previous versions of BotKube.
            </p>

            <table>
              <tbody>
                {versions.map(
                  version =>
                    version !== latestVersion && (
                      <tr key={version}>
                        <th>{version}</th>
                        <td>
                          <Link to={`${version}/`}>
                            Documentation
                          </Link>
                        </td>
                      </tr>
                    )
                )}
              </tbody>   
              </table>

              <h3 id="archive">Archived Versions</h3>
            <p>
              Here you can find documentation for archived versions of BotKube.
            </p>
               
            <table>
              <tbody>
                {Object.entries(VersionsArchived).map(
                  ([version, versionUrl]) =>
                    version !== latestVersion && (
                      <tr key={version}>
                        <th>{version}</th>
                        <td>
                          <Link to={versionUrl}>Documentation</Link>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
               
               
               
               
         </Container>
            </div>

            

                


        </Layout>
      );

}