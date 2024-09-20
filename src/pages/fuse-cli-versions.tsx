import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { FC } from "react";
import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";
import { useVersions, useLatestVersion, GlobalVersion } from "@docusaurus/plugin-content-docs/client";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import archivedVersionsMap from "@site/versions-archived.json";
import { useGitHubReleases } from "../hooks/github-releases";

const docsPluginId = undefined; // Default docs plugin instance
const projectName = "fuse-releases";

export const getPathForVersion = (ver: GlobalVersion) => {
  const path = ver.path === "/" ? "" : ver.path;
  return `${path}/${ver.mainDocId}`;
};

const ReleaseChangelogLink: FC<{ url: string; isFetchingReleases: boolean }> = ({ isFetchingReleases, url }) => {
  if (isFetchingReleases) {
    return <>⏳ Loading...</>;
  }

  return <Link to={url}>Release changelog</Link>;
};

export default function Version(): JSX.Element {
  const {
    siteConfig: { organizationName },
  } = useDocusaurusContext();

  if (!organizationName) {
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
  const [releases, isFetchingReleases] = useGitHubReleases(organizationName, projectName);

  const getChangelogUrl = (minorMajorVersion: string) => {
    const release = releases.get(minorMajorVersion);

    if (!release) {
      // fallback to a predictable, but not necessarily latest release
      return `https://github.com/${organizationName}/${projectName}/releases/tag/v${minorMajorVersion}.0`;
    }

    return release.url;
  };

  return (
    <Layout title="Versions" description="All Botkube versions">
      <main className="container margin-vert--lg">
        <Heading as="h1">Botkube Fuse versions</Heading>
        <p>This page lists all documented versions of Botkube Fuse, the terminal CLI.</p>

        {!isFetchingReleases && releases.size === 0 && (
          <Admonition type="caution">
            <p>
              Couldn't fetch the latest GitHub releases. While release changelog links will still work, they may not
              point to the latest patch releases.
            </p>
          </Admonition>
        )}

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
                  <Link to={getPathForVersion(latestVersion)}>Documentation</Link>
                </td>
                <td>
                  <ReleaseChangelogLink
                    url={getChangelogUrl(latestVersion.name)}
                    isFetchingReleases={isFetchingReleases}
                  />
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
                    <Link to={getPathForVersion(currentVersion)}>Documentation</Link>
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
                      <Link to={getPathForVersion(version)}>Documentation</Link>
                    </td>
                    <td>
                      <ReleaseChangelogLink
                        url={getChangelogUrl(version.name)}
                        isFetchingReleases={isFetchingReleases}
                      />
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
                      <ReleaseChangelogLink url={getChangelogUrl(version)} isFetchingReleases={isFetchingReleases} />
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
