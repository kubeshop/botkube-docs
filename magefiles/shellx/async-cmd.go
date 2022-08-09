package shellx

import (
	"fmt"
	"os/exec"

	"github.com/mattn/go-shellwords"
	"github.com/samber/lo"

	"botkube.io/tools/printer"
)

type AsyncCommand struct {
	cmd *exec.Cmd
}

func AsyncCmdf(format string, a ...interface{}) AsyncCommand {
	rawCMD := fmt.Sprintf(format, a...)
	envs, args := lo.Must2(shellwords.ParseWithEnvs(rawCMD))

	cmd := exec.Command(args[0], args[1:]...)
	cmd.Env = append(cmd.Env, envs...)
	return AsyncCommand{
		cmd: cmd,
	}
}

func (c AsyncCommand) Start() {
	printer.Cmd(c.cmd.String())
	lo.Must0(c.cmd.Start())
}

func (c AsyncCommand) Stop() {
	lo.Must0(c.cmd.Process.Kill())
}
