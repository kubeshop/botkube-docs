package target

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"botkube.io/tools/printer"
	"github.com/MakeNowJust/heredoc/v2"
	"github.com/samber/lo"
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
	urlReadmeBySHAFmt = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	dstFilePath       = "docs/configuration/helm-chart-parameters.md"
)

func SyncChartParams() {
	printer.Title("Synchronizing Helm chart doc ...")

	botkubeReleaseBranch := os.Getenv("BOTKUBE_RELEASE_BRANCH")

	url := fmt.Sprintf(urlReadmeBySHAFmt, botkubeReleaseBranch)
	rawREADME := getBody(url)

	url = fmt.Sprintf(urlValuesBySHAFmt, botkubeReleaseBranch)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# BotKube\n") // remove header

	out := fmt.Sprintf(fileTpl, readme)
	lo.Must0(os.WriteFile(dstFilePath, []byte(out), 0o644))

	printer.Infof("%q updated according to release branch %q from BotKube repo", dstFilePath, botkubeReleaseBranch)
}

func getBody(url string) string {
	resp := lo.Must(http.Get(url))
	defer resp.Body.Close()

	raw := lo.Must(io.ReadAll(resp.Body))

	return string(raw)
}
