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
		"gen":             Sync.Chart,
		"validateRelease": Sync.ValidateRelease,
	}
)

type Sync mg.Namespace

// Chart synchronize Botkube Helm chart parameters.
func (Sync) Chart() {
	target.SyncChartParams()
}

// ValidateRelease checks if given release exists in Botkube repository.
func (Sync) ValidateRelease() {
	target.ValidateRelease()
}

// CheckLinks detects dead links in documentation.
func CheckLinks() {
	target.CheckDeadLinks()
}
