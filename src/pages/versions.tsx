import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { FC, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Admonition from "@theme/Admonition";
import { useVersions, useLatestVersion } from "@docusaurus/plugin-content-docs/client";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import archivedVersionsMap from "@site/versions-archived.json";

const docsPluginId = undefined; // Default docs plugin instance

type Release = {
  tagName: string;
  url: string;
  patchVersion: number;
};

type ReleaseMap = Map<string, Release>;

type GHReleaseList = { draft: boolean; prerelease: boolean; tag_name: string; html_url: string }[];

const ReleaseChangelogLink: FC<{ url: string; isFetchingReleases: boolean }> = ({ isFetchingReleases, url }) => {
  if (isFetchingReleases) {
    return <>⏳ Loading...</>;
  }

  return <Link to={url}>Release changelog</Link>;
};

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
  const [releaseMap, setReleaseMap] = useState<ReleaseMap>(new Map<string, Release>());
  const [isFetchingReleases, setIsFetchingReleases] = useState(true);

  const getPublishedReleases: () => Promise<ReleaseMap | undefined> = async () => {
    try {
      // naive assumption that we won't have more than 100 releases anytime soon
      const res = await fetch(`https://api.github.com/repos/${organizationName}/${projectName}/releases?per_page=100`);
      const jsonRes = (await res.json()) as GHReleaseList;
      return jsonRes
        .filter(rel => !rel.prerelease && !rel.draft)
        .reduce((map, rel) => {
          // format: v1.2.3-rc.1+build.123
          const versionParts = rel.tag_name
            .replace("v", "") // remove leading v
            .split("+")[0] // remove build identifier; it might be provided without the pre-release identifier
            .split("-")[0] // remove pre-release identifier
            .split("."); // split into major, minor, patch

          if (versionParts.length < 3) {
            return map;
          }
          const majorMinorVersion = versionParts.slice(0, 2).join(".");
          const patchVersion = parseInt(versionParts[2]);

          const existingEntry = map.get(majorMinorVersion);
          if (existingEntry && existingEntry.patchVersion > patchVersion) {
            return map;
          }

          map.set(majorMinorVersion, {
            url: rel.html_url,
            tagName: rel.tag_name,
            patchVersion: patchVersion,
          });
          return map;
        }, new Map<string, Release>());
    } catch (err) {
      console.log("couldn't fetch the GitHub releases", err);
    }
  };

  const getChangelogUrl = (minorMajorVersion: string) => {
    const release = releaseMap.get(minorMajorVersion);

    if (!release) {
      // fallback to a predictable, but not necessarily latest release
      return `https://github.com/${organizationName}/${projectName}/releases/tag/v${minorMajorVersion}.0`;
    }

    return release.url;
  };

  useEffect(() => {
    const loadReleases = async () => {
      const releases = await getPublishedReleases();
      setIsFetchingReleases(false);
      if (!releases) {
        return;
      }
      setReleaseMap(releases);
    };

    void loadReleases();
  }, [setReleaseMap]);

  return (
    <Layout title="Versions" description="All Botkube versions">
      <main className="container margin-vert--lg">
        <Heading as="h1">Botkube versions</Heading>
        <p>This page lists all documented versions of Botkube.</p>

        {!isFetchingReleases && releaseMap.size === 0 && (
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
                  <Link to={latestVersion.path}>Documentation</Link>
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
