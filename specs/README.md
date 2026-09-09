# Writing functional specs for `/build-app`

`/build-app` treats whatever files you attach at invocation time (via `@specs/your-file.md`) as the **primary source of truth** for what the application must do. It does not invent business rules, entities, or workflows — it reads these files first.

## How to structure your specs

- One file per module is usually easiest to write and review: `specs/001-users.md`, `specs/002-billing.md`, `specs/003-inventory.md`, etc. Number them if module order/dependency matters.
- Copy [TEMPLATE.md](TEMPLATE.md) for each module and fill it in. Leave a section blank rather than guessing — `/build-app` is instructed to flag missing/ambiguous requirements as assumptions instead of silently inventing them, but the fewer gaps you leave, the fewer assumptions get made on your behalf.
- If you already have requirements written elsewhere (a PRD, a client email thread, ticket exports), drop them in as-is under `specs/` too — they don't need to match the template exactly, but filling in the template for anything the source material is vague about (permissions, edge cases, validation rules) will materially improve the result.
- Cross-module concerns (global actors/roles, shared entities, integrations that span modules) can go in a `specs/000-overview.md` so `/build-app` sees them before the per-module detail.

## Invoking the command

Attach every relevant file in the same message as the command:

```text
/build-app AcmeCRM NEXT_POSTGRES RAILWAY acmecrm.com @specs/000-overview.md @specs/001-users.md @specs/002-billing.md
```

## Keep specs in the repo

Once the app is built, keep these files under version control in the project repo. They stay the reference for:

- resolving future ambiguity about intended behavior,
- onboarding another engineer,
- re-invoking `/build-app` (or asking Claude directly) to add a new module later — add a new `specs/00N-module.md` and reference it.
