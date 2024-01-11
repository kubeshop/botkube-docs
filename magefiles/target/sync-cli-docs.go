package target

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/hashicorp/go-getter"
	"github.com/samber/lo"
	"go.szostok.io/magex/printer"
	"go.szostok.io/magex/shx"

	"botkube.io/tools/target/release"
)

const (
	cliDocsDstPath = "docs/cli/commands"

	cliDocsSrcURLFmt = "github.com/kubeshop/botkube//cmd/cli/docs?ref=%s"
)

var (
	commandsCategory = heredoc.Doc(`
		{
			"label": "Commands"
		}`)
)

func SyncCLIDocs() {
	printer.Title("Synchronizing Botkube CLI docs...")

	target, targetIdentifier := release.GetBotkubeRepoTargetCommit()

	cliDocsSrcURL := fmt.Sprintf(cliDocsSrcURLFmt, target)
	lo.Must0(Download(context.Background(), cliDocsSrcURL, cliDocsDstPath))

	lo.Must0(os.WriteFile(filepath.Join(cliDocsDstPath, "_category_.json"), []byte(commandsCategory), 0o644))

	shx.MustCmdf("npm run prettier:cli-docs-fix").MustRunV()

	printer.Infof("%q updated according to %s %q from Botkube repo", cliDocsDstPath, targetIdentifier, target)
}

// Download downloads data from a given source to local file system under a given destination path.
func Download(ctx context.Context, src, dst string) error {
	printer.Cmd(fmt.Sprintf("go-getter %s", src))
	pwd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("while getting current dir: %w", err)
	}

	client := &getter.Client{
		Ctx:  ctx,
		Src:  src,
		Dst:  dst,
		Pwd:  pwd,
		Mode: getter.ClientModeDir,
	}

	return client.Get()
}
