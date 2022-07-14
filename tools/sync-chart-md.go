package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/tidwall/gjson"
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
	urlTplReadmeBySHA = "https://raw.githubusercontent.com/kubeshop/botkube/%s/helm/botkube/README.md"
	urlTplValuesBySHA = "https://github.com/kubeshop/botkube/blob/%s/helm/botkube/values.yaml"
	dstFilePath       = "../content/configuration/helm-chart-parameters.md"
)

func main() {
	lastCommitJSON := GetBody(urlLastCommit)
	sha := gjson.Get(lastCommitJSON, "0.sha").String()

	url := fmt.Sprintf(urlTplReadmeBySHA, sha)
	rawREADME := GetBody(url)

	url = fmt.Sprintf(urlTplValuesBySHA, sha)
	readme := strings.ReplaceAll(rawREADME, "./values.yaml", url)
	readme = strings.TrimPrefix(readme, "# BotKube\n") // remove header

	out := fmt.Sprintf(fileTpl, readme)
	must(os.WriteFile(dstFilePath, []byte(out), 0o644))
}

func GetBody(url string) string {
	resp := mustV(http.Get(url))
	raw := mustV(io.ReadAll(resp.Body))
	must(resp.Body.Close())

	return string(raw)
}

// Return the V (value) if there is no error.
func mustV[T any](v T, err error) T {
	must(err)
	return v
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
