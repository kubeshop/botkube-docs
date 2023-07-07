package target

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/MakeNowJust/heredoc/v2"
	"github.com/hashicorp/go-getter"
	"github.com/samber/lo"

	"botkube.io/tools/printer"
	"botkube.io/tools/shellx"
)

const (
	cliDocsDstPath = "docs/cli/commands"

	// TODO: revert before merge
	//cliDocsSrcURL  = "github.com/kubeshop/botkube//cmd/cli/docs?ref=main"
	cliDocsSrcURL = "github.com/mszostok/botkube//cmd/cli/docs?ref=add-gen-docs"
)

var (
	commandsCategory = heredoc.Doc(`
		{
			"label": "Commands"
		}`)
)

func SyncCLIDocs() {
	printer.Title("Synchronizing Botkube CLI docs...")

	target, targetIdentifier := GetBotkubeRepoTargetCommit()

	lo.Must0(Download(context.Background(), cliDocsSrcURL, cliDocsDstPath))

	lo.Must0(os.WriteFile(filepath.Join(cliDocsDstPath, "_category_.json"), []byte(commandsCategory), 0o644))

	lo.Must0(shellx.Cmdf("npm run prettier:cli-docs-fix").Run())

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
