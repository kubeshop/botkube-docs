package release

import (
	"encoding/json"
	"os"

	"github.com/samber/lo"
	"go.szostok.io/magex/printer"
	"go.szostok.io/magex/shx"
)

const (
	botkubeChatOpsVersionFile = "./chatPlatform_versions.json"
	fuseCLIVersionFile        = "./versions.json"
)

func UpdateBotkubeChatPlatformDocsVersion(latestRelVer string) {
	printer.Title("Updating Botkube Chat Platform docs version...")

	// Extract the previous version
	verFile := lo.Must(os.ReadFile(botkubeChatOpsVersionFile))

	var versions []string
	lo.Must0(json.Unmarshal(verFile, &versions))

	previousRelVer := getFirst(versions)
	lo.Must0(previousRelVer != "", "failed to load previous release version from %q", botkubeChatOpsVersionFile)
	previousRelVer += ".0" // add patch version

	// Replace the version in the files
	dirs := []string{"./chat-platform-docs/installation/", "./chat-platform-docs/features/", "./chat-platform-docs/plugins", "./chat-platform-docs/troubleshooting/", "./chat-platform-docs/cli/", "./chat-platform-docs/self-hosted-configuration"}
	for _, dir := range dirs {
		shx.MustCmdf(`find %s -type f \( -name "*.md" -o -name "*.mdx" \) -exec sed -i.bak "s/%s/%s/g" {} \;`, dir, previousRelVer, latestRelVer).MustRunV()
	}

	printer.Infof("Botkube Chat Platform docs updated from version %q to %q", previousRelVer, latestRelVer)
}

func UpdateFuseCLIDocsVersion(latestRelVer string) {
	printer.Title("Updating Fuse CLI docs version...")

	// Extract the previous version
	verFile := lo.Must(os.ReadFile(fuseCLIVersionFile))

	var versions []string
	lo.Must0(json.Unmarshal(verFile, &versions))

	previousRelVer := getFirst(versions)
	lo.Must0(previousRelVer != "", "failed to load previous release version from %q", fuseCLIVersionFile)
	previousRelVer += ".0" // add patch version

	// Replace the version in the files
	dirs := []string{"./"}
	for _, dir := range dirs {
		shx.MustCmdf(`find %s -type f \( -name "*.md" -o -name "*.mdx" \) -exec sed -i.bak "s/%s/%s/g" {} \;`, dir, previousRelVer, latestRelVer).MustRunV()
	}

	printer.Infof("Fuse CLI docs updated from version %q to %q", previousRelVer, latestRelVer)
}

func getFirst(in []string) string {
	if len(in) == 0 {
		return ""
	}
	return in[0]
}
