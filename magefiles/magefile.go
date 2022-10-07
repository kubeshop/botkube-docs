// This is a magefile, and is a "makefile for go".
// See https://magefile.org/
package main

import (
	"github.com/magefile/mage/mg"

	"botkube.io/tools/target"
)

var (
	Default = Sync.Chart

	Aliases = map[string]interface{}{
		"gen": Sync.Chart,
	}
)

type Sync mg.Namespace

// Chart synchronize Botkube Helm chart parameters.
func (Sync) Chart() {
	target.SyncChartParams()
}

// CheckLinks detects dead links in documentation.
func CheckLinks() {
	target.CheckDeadLinks()
}
