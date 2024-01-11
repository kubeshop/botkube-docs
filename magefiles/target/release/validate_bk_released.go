package release

import (
	"fmt"
	"os"

	"github.com/tidwall/gjson"
	"go.szostok.io/magex/printer"

	"botkube.io/tools/httpx"
)

const (
	urlLastCommit                = "https://api.github.com/repos/kubeshop/botkube/commits?per_page=1"
	urlReleaseByTagFmt           = "https://api.github.com/repos/kubeshop/botkube/releases/tags/v%s"
	BotkubeReleaseBranchEnvName  = "BOTKUBE_RELEASE_BRANCH"
	BotkubeReleaseVersionEnvName = "BOTKUBE_RELEASE_VERSION"
)

func GetBotkubeRepoTargetCommit() (string, string) {
	target := os.Getenv(BotkubeReleaseBranchEnvName)
	if target != "" {
		return target, "branch"
	}

	lastCommitJSON := httpx.MustGetBody(urlLastCommit)
	target = gjson.Get(lastCommitJSON, "0.sha").String()

	return target, "commit"
}

func EnsureBotkubeReleased() {
	printer.Title("Validating release ...")

	version := os.Getenv(BotkubeReleaseVersionEnvName)
	gitURL := fmt.Sprintf(urlReleaseByTagFmt, version)

	printer.Infof("Checking if %s exits\n", gitURL)
	httpx.MustGetBody(gitURL)
}
