package helm

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/tidwall/gjson"

	"botkube.io/tools/printer"
)

var fileTpl = heredoc.Doc(`
     ---
     title: Helm chart parameters
     weight: 40
     ---
     %s
     `)

const (
	urlLastCommit     = "https://api.github.com/repos/kubeshop/botkube/commits?per_page=1"
	urlReadmeBySHAFmt = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	dstFilePath       = "content/configuration/helm-chart-parameters.md"
)

func SyncChartParams() error {
	printer.Title("Synchronizing Helm chart doc...")

	lastCommitJSON, err := getBody(urlLastCommit)
	if err != nil {
		return err
	}
	sha := gjson.Get(lastCommitJSON, "0.sha").String()

	url := fmt.Sprintf(urlReadmeBySHAFmt, sha)
	rawREADME, err := getBody(url)
	if err != nil {
		return err
	}

	url = fmt.Sprintf(urlValuesBySHAFmt, sha)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# BotKube\n") // remove header

	out := fmt.Sprintf(fileTpl, readme)
	if err := os.WriteFile(dstFilePath, []byte(out), 0o644); err != nil {
		return err
	}

	printer.Infof("%q updated according to commit %q from BotKube repo", dstFilePath, sha[:5])
	return nil
}

func getBody(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(raw), nil
}
