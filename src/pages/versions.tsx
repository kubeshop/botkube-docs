import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import Link from "@docusaurus/Link";
import { useVersions, useLatestVersion } from "@docusaurus/plugin-content-docs/client";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import archivedVersionsMap from "@site/versions-archived.json";

const docsPluginId = undefined; // Default docs plugin instance

export default function Version(): JSX.Element {
  const {
    siteConfig: { organizationName, projectName },
  } = useDocusaurusContext();
  if (!organizationName || !projectName) {
    throw new Error("organizationName and projectName can't be empty");
  }
  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const currentVersion = versions.find(version => version.name === "current");
  if (!currentVersion) {
    throw new Error("Cannot find `current` version.");
  }
  const pastVersions = versions.filter(version => version !== latestVersion && version.name !== "current");
  const archivedVersions = Object.entries(archivedVersionsMap);

  return (
    <Layout title="Versions" description="All Botkube versions">
      <main className="container margin-vert--lg">
        <Heading as="h1">Botkube versions</Heading>
        <p>This page lists all documented versions of Botkube.</p>

        <div className="margin-bottom--lg">
          <Heading as="h3" id="current">
            Current version (Stable)
          </Heading>
          <p>The latest stable version.</p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>Documentation</Link>
                </td>
                <td>
                  <Link to={getChangelogUrl(organizationName, projectName, latestVersion.name)}>Release changelog</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="unreleased">
              Next version (Unreleased)
            </Heading>
            <p>Here you can find the documentation for unreleased version.</p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>Documentation</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {pastVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="previous">
              Previous versions
            </Heading>
            <p>Here you can find documentation for previous Botkube versions.</p>

            <table>
              <tbody>
                {pastVersions.map(version => (
                  <tr key={version.name}>
                    <th>{version.name}</th>
                    <td>
                      <Link to={version.path}>Documentation</Link>
                    </td>
                    <td>
                      <Link to={getChangelogUrl(organizationName, projectName, version.name)}>Release changelog</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {archivedVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="archived">
              Archived Versions
            </Heading>
            <p>Here you can find documentation for archived, no longer maintained Botkube versions.</p>

            <table>
              <tbody>
                {archivedVersions.map(([version, versionUrl]) => (
                  <tr key={version}>
                    <th>{version}</th>
                    <td>
                      <Link to={versionUrl}>Documentation</Link>
                    </td>
                    <td>
                      <Link to={getChangelogUrl(organizationName, projectName, version)}>Release changelog</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}

const getChangelogUrl = (orgName: string, projName: string, version: string) => {
  return `https://github.com/${orgName}/${projName}/releases/tag/v${version}.0`;
};
