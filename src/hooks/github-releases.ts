import { useEffect, useState } from "react";

export type Release = {
  tagName: string;
  url: string;
  patchVersion: number;
};

export type ReleaseMap = Map<string, Release>;

type GHReleaseList = { draft: boolean; prerelease: boolean; tag_name: string; html_url: string }[];

const fetchPublishedReleases: (
  organizationName: string,
  projectName: string,
) => Promise<ReleaseMap | undefined> = async (organizationName, projectName) => {
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

export function useGitHubReleases(organizationName: string, projectName: string): [ReleaseMap, boolean] {
  const [releaseMap, setReleaseMap] = useState<ReleaseMap>(new Map<string, Release>());
  const [isFetchingReleases, setIsFetchingReleases] = useState(true);

  useEffect(() => {
    const loadReleases = async () => {
      const releases = await fetchPublishedReleases(organizationName, projectName);
      setIsFetchingReleases(false);
      if (!releases) {
        return;
      }
      setReleaseMap(releases);
    };

    void loadReleases();
  }, [setReleaseMap]);

  return [releaseMap, isFetchingReleases];
}
