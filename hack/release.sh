#!/bin/bash

set -e

find_release() {
    wget https://raw.githubusercontent.com/infracloudio/botkube/develop/.release
    version=$(cut -d'=' -f2- .release)
    rm .release
}

update_changelogs() {
    echo "Updating History page"
    wget https://raw.githubusercontent.com/infracloudio/botkube/develop/CHANGELOG.md
    sed -i '1d' CHANGELOG.md 
    echo "---" > content/history/_index.md
    echo "title: History" >> content/history/_index.md
    echo "---" >> content/history/_index.md
    cat CHANGELOG.md >> content/history/_index.md
    rm CHANGELOG.md
}

git_tag() {
    echo "Checking git status"
    if [ -n "$(git tag | grep ${version})" ] ; then echo 'ERROR: Tag already exists' && exit 1 ; fi
    if [ -z "$(git remote -v)" ] ; then echo 'ERROR: No remote to push tags to' && exit 1 ; fi
    if [ -z "$(git config user.email)" ] ; then echo 'ERROR: Unable to detect git credentials' && exit 1 ; fi
    
    echo "Creating a git tag"
    git add content/history/_index.md
    git commit -m "Release ${version}"
    git tag ${version}
    git push --tags origin develop
    echo 'Git tag pushed successfully'
}

find_release
echo "Tagging release ${version}"
update_changelogs
git_tag

echo "=========================== Done ============================="
echo "Congratulations!! Release ${version} tagged."
echo "Now go and merge develop to master."
echo "=============================================================="
