package shellx

import (
	"fmt"

	"github.com/carolynvs/magex/shx"
	"github.com/mattn/go-shellwords"
	"github.com/samber/lo"

	"botkube.io/tools/printer"
)

type Command struct {
	shx.PreparedCommand
}

func Cmdf(format string, a ...interface{}) Command {
	rawCmd := fmt.Sprintf(format, a...)
	envs, args := lo.Must2(shellwords.ParseWithEnvs(rawCmd))

	return Command{
		PreparedCommand: shx.Command(args[0], args[1:]...).Env(envs...),
	}
}

func (c Command) Run() error {
	printer.Cmd(c.String())
	return c.PreparedCommand.Run()
}

func (c Command) RunV() error {
	printer.Cmd(c.String())
	return c.PreparedCommand.RunV()
}

func (c Command) RunE() error {
	printer.Cmd(c.String())
	return c.PreparedCommand.RunE()
}

func (c Command) RunS() error {
	printer.Cmd(c.String())
	return c.PreparedCommand.RunS()
}
