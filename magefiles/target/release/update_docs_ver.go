package release

import (
	"encoding/json"
	"os"

	"github.com/samber/lo"
	"go.szostok.io/magex/printer"
	"go.szostok.io/magex/shx"
)

const docusaurusVersionFile = "./versions.json"

func UpdateDocsVersion(latestRelVer string) {
	printer.Title("Updating docs version...")

	// Extract the previous version
	verFile := lo.Must(os.ReadFile(docusaurusVersionFile))

	var versions []string
	lo.Must0(json.Unmarshal(verFile, &versions))

	previousRelVer := getFirst(versions)
	lo.Must0(previousRelVer != "", "failed to load previous release version from %q", docusaurusVersionFile)
	previousRelVer += ".0" // add patch version

	// Replace the version in the files
	dirs := []string{"./docs/installation/", "./docs/features/", "./docs/plugins", "./docs/troubleshooting/", "./docs/cli/", "./docs/self-hosted-configuration"}
	for _, dir := range dirs {
		shx.MustCmdf(`find %s -type f \( -name "*.md" -o -name "*.mdx" \) -exec sed -i.bak "s/%s/%s/g" {} \;`, dir, previousRelVer, latestRelVer).MustRunV()
	}

	printer.Infof("Docs updated from version %q to %q", previousRelVer, latestRelVer)
}

func getFirst(in []string) string {
	if len(in) == 0 {
		return ""
	}
	return in[0]
}
