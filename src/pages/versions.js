import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import versions from "@site/versions.json";
import VersionsArchived from "@site/versionsArchived.json";

export default function VersionsPage() {
  const { siteConfig } = useDocusaurusContext();
  const latestVersion = versions[0];
  return (
    <Layout>
        <main className="container margin-vert--lg">
          <div></div>
          <header>
            <h2>{`${siteConfig.title} Versions`}</h2>
          </header>
          <h3 id="latest">Current version (Stable)</h3>
          <p>The latest stable version</p>
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

          <h3 id="unreleased">Next version</h3>
          <p>Here you can find the documentation for unreleased version.</p>
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
          <p>Here you can find documentation for previous versions.</p>
          <table>
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr key={version}>
                      <th>{version}</th>
                      <td>
                        <Link to={`${version}/`}>Documentation</Link>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>

          <h3 id="archive">Archived Versions</h3>
          <p>{`Here you can find documentation for archived, no longer maintained ${siteConfig.title} versions.`}</p>
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
                  ),
              )}
            </tbody>
          </table>
        </main>
    </Layout>
  );
}
