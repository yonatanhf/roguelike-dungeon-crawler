# Roguelike Dungeon Crawler Release and Deployment Flow

## Architecture intent

This project currently runs as a two-component stack: a terminal UI and an agentic brain service. The solid release boundary is immutable image publication for both components. Runtime deployment remains downstream and should consume pinned image tags instead of local `docker compose build` output.

## Release units

- `terminal-ui`: Vite/React terminal image
- `agentic-brain`: FastAPI brain image

## CI responsibilities

- Validate release-unit structure
- Lint and test frontend/backend independently
- Build both container images in CI

## Promotion flow

1. Merge validated changes to `main`.
2. Confirm frontend, backend, and both Docker build jobs passed.
3. Trigger the release workflow with a semantic version.
4. Publish immutable image tags for both components.
5. Update the downstream runtime manifest or compose override to those tags.
6. Roll back by repointing to the previous immutable tags.

## Guardrails

- No runtime promotion from mutable local compose builds.
- No `latest` release tag.
- UI and brain can be promoted together under the same semantic version while remaining separate artifacts.
