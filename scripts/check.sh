#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
./scripts/validate-release-units.sh
npm run lint
npm run build
