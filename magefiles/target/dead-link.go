package target

import (
	"io/fs"
	"path/filepath"
	"strings"

	"github.com/carolynvs/magex/pkg"
	"github.com/samber/lo"

	"botkube.io/tools/printer"
	"botkube.io/tools/shellx"
)

func CheckDeadLinks() {
	printer.Title("Checking dead links in docs...")

	var files []string
	lo.Must0(filepath.WalkDir("./content", func(path string, d fs.DirEntry, err error) error {
		if !shouldSkipPath(d, path) {
			files = append(files, path)
		}
		return nil
	}))

	ensureMarkdownLinkCheck()

	hugoSvr := shellx.AsyncCmdf("hugo server -p 60123")
	hugoSvr.Start()
	defer hugoSvr.Stop()

	lo.Must0(shellx.Cmdf("markdown-link-check -q -c .mlc.config.json %s", strings.Join(files, " ")).RunV())
}

func ensureMarkdownLinkCheck() {
	ok := lo.Must(pkg.IsCommandAvailable("markdown-link-check", "latest"))
	if ok {
		printer.Infof("Using installed markdown-link-check")
		return
	}
	shellx.Cmdf(`npm install --location=global markdown-link-check`).RunV()
}

func shouldSkipPath(d fs.DirEntry, path string) bool {
	if d.IsDir() {
		return true
	}

	if filepath.Ext(path) != ".md" {
		return true
	}

	// too much GitHub links and we get 429...
	if strings.HasPrefix(path, "content/history/") {
		return true
	}
	return false
}
