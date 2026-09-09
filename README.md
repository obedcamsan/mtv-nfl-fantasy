# base-custom-app

Reusable base repository for bootstrapping new **secure, production-ready custom web applications** with [Claude Code](https://claude.com/claude-code), using the `/build-app` command defined in [.claude/commands/build-app.md](.claude/commands/build-app.md).

This repository is **not an application**. It contains no product code and should stay that way — it is a starting point you instantiate once per new project.

## How it's meant to be used

1. **Turn this into a GitHub template repository** (one-time setup, already recommended):
   `Settings → General → Template repository` → check the box.
2. **For every new project**, click **"Use this template" → "Create a new repository"** on GitHub — not "Fork".
   A fork stays linked to this repo's history and network, which is meant for contributing changes back upstream. "Use this template" instead gives the new project a clean, independent repository with a single initial commit and no shared history — what you want since each generated app is an unrelated product.
3. Clone the new repository locally and open it in Claude Code (CLI, VSCode extension, or desktop app).
4. Write the new app's functional requirements as one or more Markdown files under [specs/](specs/), using [specs/TEMPLATE.md](specs/TEMPLATE.md) as the starting point per module. See [specs/README.md](specs/README.md) for details.
5. Run the bootstrap command, attaching your spec files with `@`:

   ```text
   /build-app <PROJECT_NAME> <STACK_PROFILE> <DEPLOYMENT_TARGET> <PRIMARY_DOMAIN> @specs/001-users.md @specs/002-billing.md
   ```

   - `STACK_PROFILE`: `NODE_POSTGRES` | `NEXT_POSTGRES` | `PHP_MYSQL`
   - `DEPLOYMENT_TARGET`: `RAILWAY` | `LINUX_EL8_VPS` | `LINUX_EL8_CPANEL`

   If any argument is missing/invalid, or no spec files are attached, Claude will stop and ask instead of guessing — these choices lock in an architecture that's expensive to reverse later.

6. Claude Code will first produce a short architecture assessment (selected stack, modules discovered, entities, roles, database model, auth/authorization strategy, deployment plan, assumptions, risks), then proceed to actually build the application: migrations, auth with forced first-password-change, RBAC, branding/settings, the business modules from your specs, tests, and the documentation set under `docs/` (`ARCHITECTURE.md`, `DATABASE.md`, `SECURITY.md`, `MODULES.md`, `PERMISSIONS.md`, `DEPLOYMENT.md`, `ENVIRONMENT.md`, `API.md`, `CHANGELOG.md`, `IMPLEMENTATION_STATUS.md`).
7. Keep the `specs/` files in the new repo — they remain the source of truth if you invoke `/build-app` again later to add a module.

## Repository layout

```text
.claude/commands/build-app.md   The bootstrap command (the master prompt + argument handling)
specs/README.md                 How to write functional-requirement docs for /build-app
specs/TEMPLATE.md               Per-module spec template to copy for each module
CLAUDE.md                       Guardrail: keeps this repo generic, points to /build-app
```

Everything else (`package.json`, `docs/`, database migrations, application code, `.env.example`, etc.) is generated **inside the new project repository** by `/build-app` — it does not exist here.

## Notes

- Never commit real product code, `.env` files, or generated `docs/*.md` back into this base repo — they belong in the project repo created from the template.
- If you improve the bootstrap process itself (e.g. tightening a security requirement in the master prompt), edit `.claude/commands/build-app.md` here so every future project benefits.
