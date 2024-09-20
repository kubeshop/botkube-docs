// This is a magefile, and is a "makefile for go".
// See https://magefile.org/
package main

import (
	"os"

	"github.com/magefile/mage/mg"
	"github.com/samber/lo"

	"botkube.io/tools/target"
	"botkube.io/tools/target/release"
)

var (
	Default = Sync.Chart

	Aliases = map[string]interface{}{
		"gen":             Sync.Chart,
		"validateRelease": Release.EnsureBotkubeReleased,
	}
)

type Sync mg.Namespace

// Chart synchronize Botkube Helm chart parameters.
func (Sync) Chart() {
	target.SyncChartParams()
}

// CLI synchronize Botkube CLI docs.
func (Sync) CLI() {
	target.SyncCLIDocs()
}

type Release mg.Namespace

// EnsureBotkubeReleased checks if given release exists in Botkube repository.
func (Release) EnsureBotkubeReleased() {
	release.EnsureBotkubeReleased()
}

// UpdateBotkubeChatOpsDocsVersion updates Botkube ChatOps docs version.
// Requires LATEST_RELEASE_VERSION env var to be set.
func (Release) UpdateBotkubeChatOpsDocsVersion() {
	latest := os.Getenv("LATEST_RELEASE_VERSION")
	lo.Must0(latest != "", "LATEST_RELEASE_VERSION env var is not set")

	release.UpdateBotkubeChatOpsDocsVersion(latest)
}

// UpdateFuseDocsVersion updates Fuse docs version.
// Requires LATEST_RELEASE_VERSION env var to be set.
func (Release) UpdateFuseDocsVersion() {
	latest := os.Getenv("LATEST_RELEASE_VERSION")
	lo.Must0(latest != "", "LATEST_RELEASE_VERSION env var is not set")

	release.UpdateFuseDocsVersion(latest)
}

// CheckLinks detects dead links in documentation.
func CheckLinks() {
	target.CheckDeadLinks()
}
