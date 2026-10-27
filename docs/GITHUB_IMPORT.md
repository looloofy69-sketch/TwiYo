# Import this TwiYo source snapshot into GitHub

The `looloofy69-sketch/TwiYo` repository was empty when this package was prepared. This package includes the frontend demo plus the demo quality gate, regression tests, documentation, and GitHub Actions workflow.

## Safe initial import (empty remote only)

1. Download and extract `TwiYo_GitHub_Import_Package.zip` into a clean directory.
2. Open a terminal at the extracted project root.
3. Ensure Git is configured with your intended commit identity. For example:

   ```sh
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

4. Run:

   ```sh
   bash scripts/import-empty-github-repo.sh
   ```

   The script checks that the expected source files are present, refuses to run inside an existing local Git repository, and refuses to push if the remote already has any refs. It does not force-push or overwrite existing history. GitHub authentication must already work in your terminal.

5. After the first push, open the repository's **Actions** tab and inspect **TwiYo demo quality**. The workflow runs a locked dependency install, demo quality gate, TypeScript check, unit tests, and static build.

## Verification status at packaging time

- `node scripts/quality-gate.mjs`: **14 passed, 0 failed**.
- Cart-domain rule smoke checks: passed.
- `bash -n scripts/import-empty-github-repo.sh`: passed.
- Full `pnpm check`, `pnpm test`, and `pnpm build:static`: not run here; dependencies are not installed and the environment cannot reach the npm registry.
- GitHub repository import: not performed from this environment because outbound GitHub DNS/network access is unavailable. The import helper is provided for a network-enabled terminal and only runs against an empty remote.

This is a demo import, not a production launch. Sample catalogue, fictional checkout, local-only enquiries, draft policies, and disabled integrations remain non-production.
