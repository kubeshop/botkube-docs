#!/usr/bin/env bash
# standard bash error handling
set -o nounset # treat unset variables as an error and exit immediately.
set -o errexit # exit immediately when a command fails.
set -E         # needs to be set if we want the ERR trap

CURRENT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT_DIR=$(cd "${CURRENT_DIR}/.." && pwd)
readonly CURRENT_DIR
readonly REPO_ROOT_DIR

check::links() {
	find ./content  -type f -regex '.*\.md' -exec markdown-link-check {} -q -c "${REPO_ROOT_DIR}/.mlc.config.json" \;
}

main() {
  check::links
}

main
