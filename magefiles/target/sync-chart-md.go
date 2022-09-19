package target

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/samber/lo"
	"github.com/tidwall/gjson"

	"botkube.io/tools/printer"
)

var fileTpl = heredoc.Doc(`
     ---
     id: helm-chart-parameters
     title: Helm chart parameters
     sidebar_position: 5
     ---
     %s
     `)

const (
	urlLastCommit     = "https://api.github.com/repos/kubeshop/botkube/commits?per_page=1"
	urlReadmeBySHAFmt = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	dstFilePath       = "docs/configuration/helm-chart-parameters.md"
)

func SyncChartParams() {
	printer.Title("Synchronizing Helm chart doc...")

	lastCommitJSON := getBody(urlLastCommit)
	sha := gjson.Get(lastCommitJSON, "0.sha").String()

	url := fmt.Sprintf(urlReadmeBySHAFmt, sha)
	rawREADME := getBody(url)

	url = fmt.Sprintf(urlValuesBySHAFmt, sha)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# BotKube\n") // remove header

	out := fmt.Sprintf(fileTpl, readme)
	lo.Must0(os.WriteFile(dstFilePath, []byte(out), 0o644))

	printer.Infof("%q updated according to commit %q from BotKube repo", dstFilePath, sha[:5])
}

func getBody(url string) string {
	resp := lo.Must(http.Get(url))
	defer resp.Body.Close()

	raw := lo.Must(io.ReadAll(resp.Body))

	return string(raw)
}
