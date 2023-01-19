package target

import (
	"fmt"
	"github.com/MakeNowJust/heredoc/v2"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/samber/lo"
	"github.com/tidwall/gjson"

	"botkube.io/tools/printer"
)

var fileTpl = heredoc.Doc(`
     ---
     id: helm-chart-parameters
     title: Helm chart parameters
     sidebar_position: 6
     ---
     %s
     `)

const (
	urlLastCommit      = "https://api.github.com/repos/kubeshop/botkube/commits?per_page=1"
	urlReadmeBySHAFmt  = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt  = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	urlReleaseByTagFmt = "https://api.github.com/repos/kubeshop/botkube/releases/tags/v%s"
	dstFilePath        = "docs/configuration/helm-chart-parameters.md"
)

func SyncChartParams() {
	printer.Title("Synchronizing Helm chart doc ...")

	target := os.Getenv("BOTKUBE_RELEASE_BRANCH")
	targetIdentifier := "branch"
	if target == "" {
		lastCommitJSON := lo.Must1(get(urlLastCommit))
		target = gjson.Get(lastCommitJSON, "0.sha").String()
		targetIdentifier = "commit"
	}

	url := fmt.Sprintf(urlReadmeBySHAFmt, target)
	rawREADME := lo.Must1(get(url))

	url = fmt.Sprintf(urlValuesBySHAFmt, target)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# Botkube\n") // remove header

	out := fmt.Sprintf(fileTpl, readme)
	lo.Must0(os.WriteFile(dstFilePath, []byte(out), 0o644))

	printer.Infof("%q updated according to %s %q from Botkube repo", dstFilePath, targetIdentifier, target)
}

func ValidateRelease() {
	version := os.Getenv("BOTKUBE_RELEASE_VERSION")
	printer.Title("Validating release ...")
	lo.Must1(get(fmt.Sprintf(urlReleaseByTagFmt, version)))
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
