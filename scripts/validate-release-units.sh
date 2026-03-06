#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$ROOT_DIR/config/release-units.json"

python3 - "$CONFIG" <<'PY'
import json
import sys
from pathlib import Path

config = Path(sys.argv[1])
if not config.exists():
    raise SystemExit(f"missing release unit config: {config}")

data = json.loads(config.read_text())
units = data.get("releaseUnits")
if not isinstance(units, list) or len(units) != 2:
    raise SystemExit("expected exactly two release units")

required = {
    "terminal-ui": {"release-guardrails", "frontend", "docker-build-terminal"},
    "agentic-brain": {"release-guardrails", "backend", "docker-build-brain"},
}

for unit in units:
    name = unit.get("name")
    if name not in required:
        raise SystemExit(f"unexpected release unit {name}")
    if unit.get("type") != "container-image":
        raise SystemExit(f"{name}: type must be container-image")
    if unit.get("releaseStrategy") != "component-publish":
        raise SystemExit(f"{name}: releaseStrategy must be component-publish")
    gates = set(unit.get("requiredGates") or [])
    if not required[name].issubset(gates):
        raise SystemExit(f"{name}: missing required gates {sorted(required[name])}")
    if unit.get("promotionEnvironments") != ["staging", "production"]:
        raise SystemExit(f"{name}: promotionEnvironments must be ['staging', 'production']")

print("release unit validation passed")
PY
