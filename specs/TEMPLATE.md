<!--
Copy this file to specs/00N-module-name.md (one per module) and fill it in.
Delete any section that truly does not apply to this module — don't leave
placeholder text in the final file, since /build-app treats this content as
the authoritative source of truth.
-->

# MODULE: <name>

## Purpose
What business problem does this module solve? Why does it exist?

## Users / Actors
Who interacts with this module? (e.g. Customer, Support Agent, Billing Admin, external system)

## Permissions
List the actions that must be independently authorizable, e.g.:

```text
<module>.view
<module>.create
<module>.update
<module>.delete
<module>.export
<module>.approve
```

Note which roles/actors should have which of these by default.

## Entities
The data objects this module owns (not shared/global entities like `users` — mention those under Dependencies instead).

## Fields
For each entity, list fields with type, required/optional, constraints (e.g. `email: string, required, unique`).

## Relationships
How entities in this module relate to each other and to entities in other modules (one-to-many, many-to-many, foreign keys).

## Business Rules
Rules that govern behavior beyond simple field validation — e.g. "An invoice cannot be voided once payment has been recorded," "A support ticket auto-closes after 14 days of inactivity."

## Validation Rules
Field- and form-level validation not already implied by the Fields table (formats, ranges, cross-field checks, uniqueness beyond the DB constraint).

## Main Workflows
Step-by-step description of the key processes (e.g. "Create invoice → send to customer → record payment → close"). Note branching/error paths.

## Screens
The UI views this module needs (list, detail, create/edit form, settings, etc.) and what each must show or allow.

## API Requirements
Any endpoints this module must expose or consume, including for other internal modules or external integrations.

## Notifications
Events that should trigger a notification (email, in-app, webhook) and who receives it.

## Reports
Any reporting/aggregation views required (not raw exports — see below).

## Exports
Which records can be exported, in what format (CSV/XLSX/PDF), and under what authorization.

## Dependencies
Other modules, shared entities (e.g. `users`, `roles`), or external services/integrations this module relies on.

## Audit Events
Sensitive or important actions in this module that must be recorded in the audit log (e.g. `INVOICE_VOIDED`, `TICKET_REASSIGNED`).

## Edge Cases
Known tricky scenarios: concurrent edits, partial failures, empty states, boundary values, permission edge cases.

## Acceptance Criteria
A checklist that defines "this module works":

- [ ] ...
- [ ] ...
