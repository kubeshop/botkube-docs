package printer

import (
	"fmt"

	"github.com/fatih/color"
)

var (
	infoPrefix = color.WhiteString("• ")
	cmdPrefix  = color.MagentaString("> ")
)

func Title(title string) {
	color.New(color.Bold).Println(title)
}

func Infof(format string, a ...any) {
	msg := fmt.Sprintf(format, a...)
	fmt.Printf("%s%s\n", infoPrefix, msg)
}

func Cmd(msg string) {
	fmt.Printf("%s%s\n", cmdPrefix, msg)
}
