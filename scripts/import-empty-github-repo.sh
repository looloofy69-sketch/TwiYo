#!/usr/bin/env bash
set -Eeuo pipefail

REMOTE_URL="${1:-https://github.com/looloofy69-sketch/TwiYo.git}"

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

command -v git >/dev/null 2>&1 || fail 'Git is required.'
[[ -f package.json && -f pnpm-lock.yaml && -f .gitignore ]] || fail 'Run this script from the root of the extracted TwiYo source package.'
[[ ! -e .git ]] || fail 'This directory already has a .git folder. Use a fresh extraction so this script cannot alter an existing local history.'

printf 'Checking remote repository refs: %s\n' "$REMOTE_URL"
if ! remote_refs="$(git ls-remote "$REMOTE_URL" 2>&1)"; then
  fail "Could not read the remote repository. Check network access, remote URL, and authentication. Git said: ${remote_refs}"
fi
[[ -z "$remote_refs" ]] || fail 'The remote already has refs. No changes were pushed. Import manually through a reviewed branch/PR instead.'

if [[ -z "$(git config --global user.name || true)" && -z "$(git config --local user.name || true)" ]]; then
  fail 'Set your Git commit identity first: git config --global user.name "Your Name"'
fi
if [[ -z "$(git config --global user.email || true)" && -z "$(git config --local user.email || true)" ]]; then
  fail 'Set your Git commit email first: git config --global user.email "you@example.com"'
fi

git init --initial-branch=main
git remote add origin "$REMOTE_URL"
git add -A
if ! git diff --cached --check; then
  printf 'WARNING: Existing source files contain whitespace warnings. They were preserved; review these warnings after import.\n' >&2
fi

if git diff --cached --quiet; then
  fail 'No source files were staged; refusing to create an empty commit.'
fi

printf '\nFiles staged for initial import: '
git diff --cached --name-only | wc -l
printf 'First 20 staged paths:\n'
git diff --cached --name-only | sed -n '1,20p'
printf 'The remote was confirmed empty; no existing branch or history will be overwritten.\n'
git commit -m "chore: import TwiYo demo and quality gate"
printf '\nPushing initial main branch. GitHub Actions should start after the push.\n'
git push --set-upstream origin main
printf '\nImport push completed. Open the repository Actions tab and verify the TwiYo demo quality workflow.\n'
