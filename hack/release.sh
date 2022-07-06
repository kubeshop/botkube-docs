#!/bin/bash

GITHUB_ORG=${GITHUB_ORG:-"kubeshop"}
GITHUB_REPO=${GITHUB_REPO:-"botkube"}
REPO_BRANCH=${REPO_BRANCH:-"main"}

set -e

find_prev_release() {
    prev_version=$(git describe --tags --abbrev=0)
}

find_release() {
    wget "https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/${REPO_BRANCH}/.release"
    version=$(cut -d'=' -f2- .release)
    rm .release
}

update_image_tags() {
    find ./content/installation/ -type f -name "*.md" -exec sed -i.bak "s/$prev_version/$version/g" {} \;
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

update_helm_options() {
    echo "Updating Helm options page"
    wget -O helm-options.md "https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/${REPO_BRANCH}/helm/botkube/README.md"
    sed -i.bak '1d' helm-options.md
    echo "---" > content/configuration/helm-options.md
    echo "title: Advanced Helm Options" >> content/configuration/helm-options.md
    echo "weight: 40" >> content/configuration/helm-options.md
    echo "---" >> content/configuration/helm-options.md
    cat helm-options.md >> content/configuration/helm-options.md
    rm helm-options.md
}

git_tag() {
    echo "Checking git status"
    if [ -n "$(git tag | grep ${version})" ] ; then echo 'ERROR: Tag already exists' && exit 1 ; fi
    if [ -z "$(git remote -v)" ] ; then echo 'ERROR: No remote to push tags to' && exit 1 ; fi
    if [ -z "$(git config user.email)" ] ; then echo 'ERROR: Unable to detect git credentials' && exit 1 ; fi

    echo "Creating a git tag"
    git add content/history/_index.md
    git add content/installation
    git add content/configuration/helm-options.md
    git commit -m "Release ${version}"
    git tag ${version}
    git push --tags origin main
    echo 'Git tag pushed successfully'
}

find_release
find_prev_release
update_image_tags
update_changelogs
update_helm_options
echo "Tagging release ${version}"
git_tag

echo "=========================== Done ============================="
echo "Congratulations!! Release ${version} tagged."
echo "=============================================================="
