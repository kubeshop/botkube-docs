package target

import (
	"fmt"
	"os"
	"strings"

	"github.com/MakeNowJust/heredoc/v2"

	"github.com/samber/lo"

	"botkube.io/tools/printer"
)

var helmParamsFileTpl = heredoc.Doc(`
     ---
     id: helm-chart-parameters
     title: Helm chart parameters
     sidebar_position: 8
     ---
     %s
     `)

const (
	urlReadmeBySHAFmt     = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt     = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	helmParamsDstFilePath = "docs/configuration/helm-chart-parameters.md"
)

func SyncChartParams() {
	printer.Title("Synchronizing Helm chart doc...")

	target, targetIdentifier := GetBotkubeRepoTargetCommit()

	url := fmt.Sprintf(urlReadmeBySHAFmt, target)
	rawREADME := lo.Must1(get(url))

	url = fmt.Sprintf(urlValuesBySHAFmt, target)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# Botkube\n") // remove header

	out := fmt.Sprintf(helmParamsFileTpl, readme)
	lo.Must0(os.WriteFile(helmParamsDstFilePath, []byte(out), 0o644))

	printer.Infof("%q updated according to %s %q from Botkube repo", helmParamsDstFilePath, targetIdentifier, target)
}
