import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useVersions, useLatestVersion } from "@docusaurus/plugin-content-docs/client";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import archivedVersions from "@site/versionsArchived.json";
import versions1 from "@site/versions.json";
import React from "react";

const docsPluginId = undefined; // Default docs plugin instance

const VersionsArchivedList = Object.entries(archivedVersions);

function DocumentationLabel() {
  return <Translate id="versionsPage.versionEntry.link">Documentation</Translate>;
}

export default function Version(): JSX.Element {
  const {
    siteConfig: { organizationName, projectName },
  } = useDocusaurusContext();
  const { siteConfig } = useDocusaurusContext();
  const version = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const currentVersion = version.find(version => version.name === "current")!;
  const pastVersions = version.filter(
    version => version !== latestVersion && version.name !== "current" && version.label >= `1.0`,
  );

  const archived = version.filter(
    version => version !== latestVersion && version.name !== "current" && version < 0.18,
  );

  return (
    <Layout title="Versions" description="Botkube all documented site versions">
      <main className="container margin-vert--lg">
        <Heading as="h1">
          <Translate id="versionsPage.title">Botkube documentation versions</Translate>
        </Heading>

        <div className="margin-bottom--lg">
          <Heading as="h3" id="next">
            <Translate id="versionsPage.current.title">Current version (Stable)</Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.current.description">The latest stable version.</Translate>
          </p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>
                    <DocumentationLabel />
                  </Link>
                </td>
               </tr>
            </tbody>
          </table>
        </div>

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="latest">
              <Translate id="versionsPage.next.title">Next version (Unreleased)</Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.next.description">
                Here you can find the documentation for unreleased version.
              </Translate>
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* {(pastVersions.length < 4 || VersionsArchivedList.length > 0) && ( */}
        <div className="margin-bottom--lg">
          <Heading as="h3" id="archive">
            <Translate id="versionsPage.archived.title">Past versions (Not maintained anymore)</Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.archived.description">
              Here you can find documentation for previous versions.
            </Translate>
          </p>

          <table>
            <tbody>
              {versions1.map(
                version =>
                  version !== latestVersion.label && (
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
        </div>

        <div className="margin-bottom--lg">
          <Heading as="h3" id="legacy">
            <Translate id="versionsPage.legacy.title">Archived Versions (Legacy)</Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.legacy.description">
              Here you can find documentation for archived, no longer maintained Botkube versions.
            </Translate>
          </p>

          <table>
            <tbody>
              {Object.entries(archivedVersions).map(
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
        </div>
      </main>
    </Layout>
  );
}
