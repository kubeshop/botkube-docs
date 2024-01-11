package target

import (
	"io/fs"
	"path/filepath"
	"strings"

	"github.com/carolynvs/magex/pkg"
	"github.com/samber/lo"
	"go.szostok.io/magex/printer"
	"go.szostok.io/magex/shx"
)

const markdownLinkCheckVersion = "3.11.2"

var ignoredFiles = []string{
	"docs/configuration/helm-chart-parameters.md", // too much GitHub links and we get 429 anyway
}

var dirsWithMarkdowns = []string{
	"./docs", "./community",
}

func CheckDeadLinks() {
	printer.Title("Checking dead links in docs...")

	var files []string

	for _, dir := range dirsWithMarkdowns {
		lo.Must0(filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
			if !shouldSkipPath(d, path) {
				files = append(files, path)
			}
			return nil
		}))
	}

	ensureMarkdownLinkCheck()

	shx.MustCmdf("markdown-link-check -q -c .mlc.config.json %s", strings.Join(files, " ")).MustRunV()
}

func ensureMarkdownLinkCheck() {
	ok := lo.Must(pkg.IsCommandAvailable("markdown-link-check", "--version", markdownLinkCheckVersion))
	if ok {
		printer.Infof("Using installed markdown-link-check")
		return
	}
	shx.MustCmdf(`npm install --location=global markdown-link-check@%s`, markdownLinkCheckVersion).MustRunV()
}

func shouldSkipPath(d fs.DirEntry, path string) bool {
	if d.IsDir() {
		return true
	}

	if filepath.Ext(path) != ".md" {
		return true
	}

	for _, name := range ignoredFiles {
		if strings.HasPrefix(path, name) {
			return true
		}
	}

	return false
}
