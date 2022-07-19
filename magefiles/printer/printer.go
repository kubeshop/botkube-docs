package printer

import (
	"fmt"
	"strings"

	"github.com/fatih/color"
)

var (
	infoPrefix  = strings.Repeat(" ", 2)
	titlePrefix = color.MagentaString("> ")
)

func Title(title string) {
	msg := color.New(color.Bold).Sprint(title)
	fmt.Printf("%s%s\n", titlePrefix, msg)
}

func Infof(format string, a ...any) {
	msg := fmt.Sprintf(format, a...)
	fmt.Printf("%s%s\n", infoPrefix, msg)
}
