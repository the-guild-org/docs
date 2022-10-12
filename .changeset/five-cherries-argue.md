---
'@theguild/components': patch
---

fix `next export`, check for `process.env.npm_lifecycle_script` instead `process.env.npm_package_scripts_build` (for pnpm compatibility)
