package target

import (
	"fmt"
	"os"
	"strings"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/samber/lo"
	"go.szostok.io/magex/printer"

	"botkube.io/tools/httpx"
	"botkube.io/tools/target/release"
)

var helmParamsFileTpl = heredoc.Doc(`
     ---
     id: helm-chart-parameters
     title: Helm chart parameters
     sidebar_position: 8
     ---

	 :::info
	 
	 This document is applicable only for self-hosted installations.
	 For Botkube Cloud installations, the Botkube Agent configuration is managed via the [Botkube Cloud dashboard](https://app.botkube.io).
	 
	 :::

     %s
     `)

const (
	urlReadmeBySHAFmt     = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlValuesBySHAFmt     = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	helmParamsDstFilePath = "docs/self-hosted-configuration/helm-chart-parameters.md"
)

func SyncChartParams() {
	printer.Title("Synchronizing Helm chart doc...")

	target, targetIdentifier := release.GetBotkubeRepoTargetCommit()

	url := fmt.Sprintf(urlReadmeBySHAFmt, target)
	rawREADME := httpx.MustGetBody(url)

	url = fmt.Sprintf(urlValuesBySHAFmt, target)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# Botkube\n") // remove header

	out := fmt.Sprintf(helmParamsFileTpl, readme)
	lo.Must0(os.WriteFile(helmParamsDstFilePath, []byte(out), 0o644))

	printer.Infof("%q updated according to %s %q from Botkube repo", helmParamsDstFilePath, targetIdentifier, target)
}
