# base-custom-app — repository guardrail

This repository is a **base/template**, not a product. Its only intended committed content is:

- `.claude/commands/build-app.md` — the bootstrap command
- `README.md`, `CLAUDE.md`
- `specs/README.md`, `specs/TEMPLATE.md`
- baseline dotfiles (`.gitignore`, `.gitattributes`)

If a session is opened here and asked to "build the app," "add a module," or similar without the repository first having been created from **Use this template** on GitHub, stop and confirm with the user whether they meant to:

- run `/build-app ...` to bootstrap a **new project repository** from this template, or
- actually modify this base repo (e.g. improve the bootstrap command in `.claude/commands/build-app.md`, or add to `specs/TEMPLATE.md`).

Do not scaffold application code (package.json, migrations, framework files, `docs/ARCHITECTURE.md`, etc.) directly into this repo — that output belongs in a project repo instantiated from this template, per [README.md](README.md).

The `/build-app` command is the single entry point for bootstrapping a new application; its full behavior (architecture rules, security requirements, phased workflow) lives in [.claude/commands/build-app.md](.claude/commands/build-app.md) — read it before changing how bootstrapping works.
