// This is a magefile, and is a "makefile for go".
// See https://magefile.org/
package main

import (
	"github.com/magefile/mage/mg"

	"botkube.io/tools/helm"
)

var (
	Default = Sync.Chart

	Aliases = map[string]interface{}{
		"gen": Sync.Chart,
	}
)

type Sync mg.Namespace

// Chart synchronize BotKube Helm chart parameters.
func (Sync) Chart() error {
	return helm.SyncChartParams()
}
