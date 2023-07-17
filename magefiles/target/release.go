package target

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/samber/lo"
	"github.com/tidwall/gjson"

	"botkube.io/tools/printer"
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

	lastCommitJSON := lo.Must1(get(urlLastCommit))
	target = gjson.Get(lastCommitJSON, "0.sha").String()

	return target, "commit"
}

func ValidateRelease() {
	version := os.Getenv(BotkubeReleaseVersionEnvName)
	printer.Title("Validating release ...")
	gitURL := fmt.Sprintf(urlReleaseByTagFmt, version)
	printer.Infof("Checking if %s exits\n", gitURL)
	lo.Must1(get(gitURL))
}

func get(url string) (string, error) {
	resp, err := http.Get(url)
	defer resp.Body.Close()
	if err != nil {
		return "", fmt.Errorf("while doing get request. %v", err)
	}
	if resp.StatusCode >= 400 || resp.StatusCode < 200 {
		return "", fmt.Errorf("invalid status code: %d while fetching content", resp.StatusCode)
	}
	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("while parsing data. %v", err)
	}

	return string(raw), nil
}
