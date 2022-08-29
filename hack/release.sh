#!/bin/bash

GITHUB_ORG=${GITHUB_ORG:-"kubeshop"}
GITHUB_REPO=${GITHUB_REPO:-"botkube"}
REPO_BRANCH=${REPO_BRANCH:-"main"}
PREV_VERSION=$1
set -e

find_release() {
    wget "https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/${REPO_BRANCH}/.release"
    version=$(cut -d'=' -f2- .release)
    rm .release
}

update_image_tags() {
    find ./content/installation/ -type f -name "*.md" -exec sed -i.bak "s/$PREV_VERSION/$version/g" {} \;
}

update_changelogs() {
    echo "Updating History page"
    wget "https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/${REPO_BRANCH}/CHANGELOG.md"
    sed -i.bak '1d' CHANGELOG.md
    echo "---" > content/history/_index.md
    echo "title: History" >> content/history/_index.md
    echo "---" >> content/history/_index.md
    cat CHANGELOG.md >> content/history/_index.md
    rm CHANGELOG.md
}

find_release
update_image_tags
update_changelogs
mage

echo "=========================== Done ============================="
echo "Congratulations!! Docs updated for the release ${version}."
echo "=============================================================="
