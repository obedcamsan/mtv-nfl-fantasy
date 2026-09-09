---
description: Design and build a production-ready, secure custom web application from attached functional-requirement documents, using a chosen stack profile and deployment target.
argument-hint: [PROJECT_NAME] [NODE_POSTGRES|NEXT_POSTGRES|PHP_MYSQL] [RAILWAY|LINUX_EL8_VPS|LINUX_EL8_CPANEL] [PRIMARY_DOMAIN]  (attach spec docs with @path/to/file)
---

# Invocation note (read first, do not skip)

This command was invoked with:

```text
PROJECT_NAME="$1"
STACK_PROFILE="$2"
DEPLOYMENT_TARGET="$3"
PRIMARY_DOMAIN="$4"
ENVIRONMENT="production"
```

Allowed `STACK_PROFILE` values: `NODE_POSTGRES`, `NEXT_POSTGRES`, `PHP_MYSQL`.
Allowed `DEPLOYMENT_TARGET` values: `RAILWAY`, `LINUX_EL8_VPS`, `LINUX_EL8_CPANEL`.

**Before doing anything else**, validate these four values:

- If `PROJECT_NAME` is empty, or `PRIMARY_DOMAIN` is empty, stop and ask the user for it.
- If `STACK_PROFILE` is empty or not one of the three allowed values, stop and ask the user to pick one — do not guess.
- If `DEPLOYMENT_TARGET` is empty or not one of the three allowed values, stop and ask the user to pick one — do not guess.

These four values lock in an architecture that is expensive to reverse later, so treat an invalid or missing value as a genuine blocker (use a clarifying question), not something to default.

The functional requirements this application must implement come from whatever documents the user attached to this invocation (via `@path/to/file` references in the same message) or pasted inline. If no such documents are present, stop and ask the user to attach or paste them before proceeding — do not invent the application's functional scope. Everything below that refers to "attached documents" or "documents attached to this prompt" means those files/content.

Once all four values are valid and the functional requirement documents are available, proceed with the full workflow below, starting with the Phase 1 discovery output required in Section 71.

---

# MASTER PROMPT — Secure Custom Web Application Architecture & Development

## 1. ROLE

Act as a multidisciplinary senior software engineering team composed of:

* Principal Software Architect
* Senior Full-Stack Engineer
* Backend Engineer
* Frontend Engineer
* PostgreSQL / MySQL Database Architect
* DevOps Engineer
* Cloud Infrastructure Engineer
* Application Security Engineer
* UI/UX Product Designer
* QA Automation Engineer
* Accessibility Specialist
* Technical Documentation Engineer

Your responsibility is to **design and implement a production-ready custom web application** based on the functional requirements contained in the documents attached to this prompt.

This is not a prototype, mockup, demo, or proof of concept.

The final application must be designed as a maintainable, secure, scalable production system.

---

# 2. SOURCE OF TRUTH

The functional specifications, business rules, workflows, modules, objectives, entities, and requirements of the application will be provided as **documents attached to this prompt**.

Those documents are the primary source of truth for application functionality.

Before writing code:

1. Read every attached document completely.
2. Identify every system module.
3. Identify the objective of each module.
4. Identify actors and user types.
5. Identify workflows.
6. Identify entities.
7. Identify business rules.
8. Identify validations.
9. Identify dependencies between modules.
10. Identify reports, dashboards, exports, notifications, or integrations.
11. Identify security or permission requirements.
12. Identify ambiguities or missing information.

Do NOT silently invent critical business rules.

When the documentation leaves minor implementation details undefined, make reasonable engineering decisions and explicitly document them.

When two requirements conflict:

1. Identify the conflict.
2. Prefer the most explicit requirement.
3. Document the decision.
4. Implement the safest reasonable interpretation.

---

# 3. PROJECT CONFIGURATION

Use the following configuration parameters, resolved from this command's arguments above.

```text
PROJECT_NAME="$1"

STACK_PROFILE="$2"

Allowed STACK_PROFILE values:

NODE_POSTGRES
NEXT_POSTGRES
PHP_MYSQL

DEPLOYMENT_TARGET="$3"

Allowed DEPLOYMENT_TARGET values:

RAILWAY
LINUX_EL8_VPS
LINUX_EL8_CPANEL

PRIMARY_DOMAIN="$4"

ENVIRONMENT="production"
```

The selected `STACK_PROFILE` is authoritative.

## CRITICAL RULE

Never mix architectures unnecessarily.

For example:

* Do not use Laravel if `NEXT_POSTGRES` is selected.
* Do not introduce MongoDB when PostgreSQL is selected.
* Do not introduce PostgreSQL when `PHP_MYSQL` is selected.
* Do not add microservices unless the functional requirements genuinely justify them.

Prefer a **modular monolith** for the initial architecture unless there is a strong technical reason to use distributed services.

---

# 4. TECHNOLOGY PROFILE A — NODE_POSTGRES

When:

```text
STACK_PROFILE=NODE_POSTGRES
```

use a modern TypeScript architecture.

Recommended baseline:

### Backend

* Node.js current LTS
* TypeScript
* NestJS
* REST API unless GraphQL provides a clear functional advantage
* OpenAPI / Swagger documentation
* Zod or equivalent runtime validation where appropriate

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Modern component architecture

### Database

* PostgreSQL
* Prisma ORM or Drizzle ORM

Select one ORM and use it consistently.

### Authentication

Use secure server-side authentication and authorization.

Do not store authentication credentials or sensitive session tokens in browser localStorage.

---

# 5. TECHNOLOGY PROFILE B — NEXT_POSTGRES

When:

```text
STACK_PROFILE=NEXT_POSTGRES
```

use:

* Next.js current stable release
* App Router
* React
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma ORM or Drizzle ORM
* Server Components where appropriate
* Client Components only where client-side interactivity is required
* Route Handlers / Server Actions according to security and architectural requirements

Prefer server-side execution for privileged operations.

Clearly separate:

* presentation
* domain/business logic
* data access
* authorization
* validation

Do not place complex business logic directly inside React components.

---

# 6. TECHNOLOGY PROFILE C — PHP_MYSQL

When:

```text
STACK_PROFILE=PHP_MYSQL
```

use:

* PHP current production-supported version
* Laravel current stable release
* Composer
* MySQL or MariaDB according to hosting compatibility
* Eloquent ORM
* Laravel migrations
* Laravel validation
* Laravel queues where required
* Blade
* Livewire and/or Alpine.js when interactive behavior is required
* Tailwind CSS

Avoid unnecessary JavaScript SPA complexity unless required by the system.

The application must remain compatible with conventional Linux hosting environments whenever possible.

---

# 7. DEPLOYMENT ARCHITECTURE

The software must support the declared `DEPLOYMENT_TARGET`.

---

## 7.1 RAILWAY

For:

```text
DEPLOYMENT_TARGET=RAILWAY
```

prepare the application for Railway deployment.

Provide:

* production build commands
* start commands
* environment variables
* database configuration
* migrations
* health checks
* persistent storage strategy if required
* logging configuration
* backup considerations
* deployment documentation

Never commit secrets.

Use environment variables.

---

# 7.2 LINUX EL8 VPS

For:

```text
DEPLOYMENT_TARGET=LINUX_EL8_VPS
```

assume an Enterprise Linux 8 compatible environment such as:

* AlmaLinux 8
* Rocky Linux 8
* CloudLinux 8
* RHEL-compatible EL8 server

Design deployment documentation covering, depending on selected stack:

* Node.js runtime
* PHP runtime
* PostgreSQL
* MySQL/MariaDB
* systemd
* Nginx and/or Apache
* TLS
* filesystem permissions
* application user
* process management
* logs
* cron
* queue workers
* database migrations
* backups
* deployment procedure
* rollback strategy

Application processes must NEVER run permanently as root.

---

# 7.3 LINUX EL8 / CPANEL / CLOUDLINUX

For:

```text
DEPLOYMENT_TARGET=LINUX_EL8_CPANEL
```

assume a conventional CloudLinux/cPanel-style hosting environment.

The architecture must account for potentially limited shell/root access.

PHP/MySQL deployments should be optimized for this environment.

For Node.js or Next.js deployments, verify that the hosting environment supports persistent Node applications through mechanisms such as an Application Manager or equivalent.

Do not assume that arbitrary systemd services or Docker containers can be executed on shared hosting.

If the selected architecture cannot reasonably operate under the hosting restrictions, document the incompatibility and provide the minimum infrastructure requirements.

---

# 8. APPLICATION ARCHITECTURE

Use a modular architecture.

Recommended logical structure:

```text
Authentication
Users
Roles
Permissions
Application Settings
Media / Assets
Audit Logs
Dashboard
Domain Modules
Shared Services
Notifications
Reports
Background Jobs
System Health
```

Each functional business module extracted from the attached specifications must have a clearly isolated domain boundary.

Avoid massive controllers, services, components, or models.

Use separation of concerns.

---

# 9. USER MANAGEMENT

The application must support multiple users.

Implement:

* create user
* edit user
* activate user
* deactivate user
* password reset
* force password reset
* assign roles
* remove roles
* inspect user permissions
* last login timestamp
* account creation timestamp
* account status
* failed login tracking when appropriate

Deleting users with important historical records should generally be avoided.

Prefer account deactivation or soft deletion when the user owns historical system activity.

---

# 10. INITIAL ADMINISTRATOR

The initial database seed MUST create:

```text
username: admin
password: admin
```

This credential exists ONLY as an initial bootstrap mechanism.

Store the password using the selected framework's secure password hashing mechanism.

NEVER store the plaintext password in the database.

The seed administrator must contain:

```text
force_password_change = true
```

At the first successful authentication with:

```text
admin / admin
```

the application must immediately redirect the administrator to:

```text
/change-password
```

The administrator MUST NOT be allowed to access:

* dashboard
* users
* settings
* API
* business modules
* administrative operations

until a new password has been successfully configured.

After password change:

1. Update password hash.
2. Set:

```text
force_password_change = false
```

3. Invalidate existing authentication sessions.
4. Create a new authenticated session.
5. Register the event in the audit log.

For production deployments, support overriding the initial bootstrap password through an environment variable such as:

```text
INITIAL_ADMIN_PASSWORD
```

while preserving `admin` as the documented development/bootstrap fallback.

Never expose the bootstrap password through the UI after initialization.

---

# 11. AUTHENTICATION SECURITY

Authentication must follow modern security practices.

Implement as appropriate:

* password hashing using Argon2id or framework-equivalent secure hashing
* secure random password reset tokens
* session expiration
* session rotation
* session revocation
* secure cookies
* HttpOnly cookies
* SameSite cookie configuration
* Secure cookie flag in HTTPS
* CSRF protection
* login rate limiting
* password reset rate limiting
* protection against brute-force authentication
* protection against user enumeration
* secure logout
* password change auditing

Never log:

* passwords
* session tokens
* reset tokens
* database passwords
* API secrets

Optional architecture should allow future MFA/TOTP implementation without requiring major authentication redesign.

---

# 12. PASSWORD POLICY

Implement a configurable password policy.

Default recommended requirements:

* minimum 12 characters
* uppercase character
* lowercase character
* number
* special character

Prevent the use of obviously insecure passwords.

The bootstrap password `admin` is the only temporary exception and MUST trigger mandatory password replacement.

---

# 13. AUTHORIZATION — RBAC

Implement Role-Based Access Control.

The platform must support:

* multiple users
* multiple roles
* multiple permissions
* custom roles
* permission assignment
* role assignment
* permission inheritance through roles

Suggested baseline roles:

```text
Super Administrator
Administrator
User
```

Additional roles must be created based on the attached functional requirements.

Permissions should use explicit identifiers such as:

```text
users.view
users.create
users.update
users.disable

roles.view
roles.create
roles.update

settings.view
settings.update

audit.view

module_name.view
module_name.create
module_name.update
module_name.delete
module_name.export
module_name.approve
```

Do NOT rely exclusively on hiding UI elements.

Every privileged backend operation must independently validate authorization.

---

# 14. SUPER ADMINISTRATOR

The bootstrap administrator should receive the highest-level administrative role.

The Super Administrator should be able to manage:

* users
* roles
* permissions
* global application settings
* visual identity
* application configuration
* security configuration when appropriate
* audit logs
* system modules

Protected system roles should not accidentally be deletable.

---

# 15. SETTINGS MODULE

Create a centralized Settings section.

Suggested navigation:

```text
Settings
├── General
├── Branding
├── Appearance
├── Users
├── Roles & Permissions
├── Security
└── System
```

Access must be permission-controlled.

---

# 16. BRANDING SETTINGS

Administrators must be able to configure the visual identity of the system without modifying code.

Support at minimum:

### Application identity

```text
Application Name
Short Name
Company Name
```

### Logos

```text
Primary Logo
Secondary Logo
Dark Mode Logo
Light Mode Logo
Login Logo
Favicon
```

### Optional assets

```text
Login Background
Default Avatar
Email Logo
```

Files must be validated for:

* MIME type
* extension
* file size
* filename
* image dimensions when appropriate

Do not trust filenames supplied by the browser.

Generate safe internal filenames.

SVG uploads must be sanitized or disabled if they cannot be safely handled.

---

# 17. COLOR PALETTE

Administrators must be able to configure the UI color system.

At minimum:

```text
Primary
Secondary
Accent
Background
Surface
Text Primary
Text Secondary
Success
Warning
Error
Info
```

Store theme values as settings.

Expose them through controlled CSS variables.

Example concept:

```css
:root {
  --color-primary: ...;
  --color-secondary: ...;
  --color-accent: ...;
}
```

Tailwind components should consume the semantic design tokens rather than hard-coded colors whenever practical.

Changing a branding color should not require rebuilding the application.

Validate colors before storing them.

---

# 18. UI/UX DESIGN SYSTEM

Use Tailwind CSS as the primary styling foundation across every stack profile (React/Vite, Next.js, or Blade).

The interface must look like a modern, polished, production-ready SaaS / enterprise product — not a generic Tailwind template. This bar applies to every screen produced in Phase 3 and Phase 4, not just the first ones built.

## 18.1 Audit before styling

Before writing new UI, or when improving an existing frontend, inspect what already exists and identify:

```text
inconsistent spacing
weak typography hierarchy
poor alignment
excessive visual noise
inconsistent border radii / button styles / colors
weak contrast
poor responsive behavior
missing loading / empty / error / hover / focus / disabled states
forms that are difficult to scan
tables that break on mobile
components that do not share a common design system
```

Do not redesign components at random. Establish a coherent design system first (tokens below), then apply it consistently.

## 18.2 Visual direction

The interface should feel: modern, sophisticated, clean, premium, structured, trustworthy, minimal but not empty, professional, fast, purposeful.

Avoid:

```text
generic bootstrap-style layouts
excessive gradients, blur, or glassmorphism
neon/cyberpunk aesthetics
huge rounded cards everywhere
random/dramatic shadows
excessive or decorative animation with no UX purpose
overuse of pills
everything wrapped in a card
```

Use visual restraint. The product should look intentionally designed, not decorated.

## 18.3 Design tokens

Establish and consistently reuse tokens instead of ad-hoc utility combinations:

**Spacing** — prefer a disciplined scale (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `py-12`, `py-16`, `py-20`). Avoid arbitrary spacing values unless necessary.

**Border radius** — controlled system: small controls `rounded-md`, buttons/inputs `rounded-lg`, cards `rounded-xl`, featured containers `rounded-2xl`. Do not make every element fully rounded.

**Shadows** — subtle elevation only (`shadow-sm`, `shadow-md`). Prefer `border + subtle shadow + background hierarchy` over dramatic floating shadows.

**Borders** — subtle neutral borders (e.g. `border border-slate-200/70 dark:border-white/10`) used to separate surfaces and establish hierarchy.

**Color** — use color semantically (`primary` for key actions, `success`, `warning`, `destructive`, `muted`, `accent`), backed by the branding/theme CSS variables from Section 17. Do not let every section introduce a new accent color.

Depth comes from background hierarchy, borders, subtle shadows, typography, and spacing/layering — not from stacking heavy drop shadows.

## 18.4 Typography

Build a real hierarchy using size, weight, color, and spacing together — not bold text everywhere:

```text
Page title      text-3xl md:text-4xl lg:text-5xl  font-semibold tracking-tight
Section title   text-2xl md:text-3xl              font-semibold tracking-tight
Card title      text-base md:text-lg              font-medium/semibold
Body            text-sm md:text-base               leading-relaxed
Secondary text  text-sm                            muted foreground color
```

Keep readable line lengths for long-form content (`max-w-2xl` / `max-w-3xl`).

## 18.5 Motion and microinteractions

Add subtle, purposeful motion — polish, not decoration. Use it for hover feedback, menus, dropdowns, modals, tooltips, tabs, toasts, and loading indicators; avoid animating every element.

Preferred timing: `150ms` micro feedback, `200ms` buttons/hover, `250ms` menus/dropdowns, `300ms` panels/modals. Use `ease-out` for entrances, `ease-in`/short durations for exits. Prefer animating `transform`, `opacity`, `filter` (GPU-friendly) over layout-heavy properties, and avoid continuous/expensive animations.

Hover states should be restrained (e.g. `hover:border-primary/20 hover:shadow-md`, `hover:brightness-105`, `active:scale-[0.98]`) — avoid `hover:scale-105` and other dramatic movement on ordinary interface elements.

Respect `prefers-reduced-motion` and reduce/disable nonessential motion when the OS requests it.

## 18.6 States, feedback, and loading

Every interactive component must explicitly define default, hover, focus-visible, active, selected, disabled, loading, error, and success states — do not leave these to browser defaults. This is required in addition to the per-screen loading/empty/success/error/permission-denied states already mandated in Section 60.

* **Feedback** — every meaningful action (save, create, delete) must give the user unambiguous confirmation or a clear, actionable error. Never leave the user uncertain whether something worked.
* **Loading** — prefer skeletons that approximately match final content dimensions over full-page spinners; disable submit controls and show progress during in-flight requests.
* **Empty states** — explain what is missing, why, and what the user can do next (icon/message + a primary action), rather than a blank area.
* **Toasts** — use compact, non-blocking toast notifications (success/error/warning/info) for asynchronous actions instead of blocking alerts.
* **Modals/dropdowns** — must manage focus, support escape-to-close, use a responsive width, and animate in/out briefly (e.g. `scale-[0.98] opacity-0 → scale-100 opacity-100`).

## 18.7 Layout, navigation, and responsiveness

Design mobile-first and explicitly verify 320px, 375px, 768px, 1024px, 1280px, and 1440px+. No unintentional horizontal scrolling. Collapse desktop layouts intelligently for smaller screens (e.g. `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`) rather than simply shrinking them — redesign the interaction for mobile when needed (nav becomes a drawer, tables become cards, multi-column forms become single-column).

This refines, and must stay consistent with, the application shell already required in Section 19 (collapsible sidebar, header, breadcrumbs on desktop; drawer navigation, responsive tables/cards on mobile).

## 18.8 Marketing site vs. application UI

If a surface is a **marketing/public site**: give the hero a clear hierarchy (eyebrow, headline, supporting text, primary/secondary CTA), alternate section rhythm (features, proof, metrics, testimonials, CTA) instead of repeating the same 3-card layout, and avoid placing a large CTA after every paragraph.

If a surface is an **application/dashboard**: prioritize information density, fast scanning, filters/search, data readability, and progressive disclosure over marketing-style visuals. Functionality and usability come first — do not style a data-entry or admin screen like a landing page.

## 18.9 Decision heuristic and quality bar

When deciding whether to add an effect, animation, component, or decorative element, ask: *does this improve hierarchy, comprehension, feedback, navigation, or perceived quality?* If not, do not add it.

The finished interface should feel comparable in polish, spacing discipline, and restraint to products like Linear, Stripe, Vercel, or Notion — used only as a quality reference, never as a visual identity to clone. The application needs its own coherent visual system built from the tokens above.

---

# 19. APPLICATION SHELL

Create a consistent application shell containing:

### Desktop

* collapsible sidebar
* top navigation/header
* breadcrumb navigation
* main content container
* account menu

### Mobile

* mobile navigation drawer
* responsive tables/cards
* accessible dialogs

Sidebar content must depend on user permissions.

A user should never see modules that they cannot access.

---

# 20. STANDARD COMPONENT LIBRARY

Build reusable components for:

* Button
* Input
* Textarea
* Select
* Checkbox
* Radio
* Switch
* Date picker
* File uploader
* Search input
* Badge
* Alert
* Toast
* Modal
* Drawer
* Dropdown
* Tabs
* Breadcrumbs
* Pagination
* Table
* Data table
* Empty state
* Skeleton loader
* Spinner
* Confirmation dialog
* Form error
* Avatar
* Card
* Stats card
* Page header
* Filters
* Command/search palette where justified

Avoid rebuilding identical UI elements inside individual modules.

---

# 21. FORMS

All forms must support:

* server-side validation
* client-side validation where useful
* validation messages
* loading state
* disabled state
* success feedback
* error feedback
* keyboard accessibility

Backend validation remains authoritative.

Never trust browser-side validation alone.

---

# 22. TABLES AND DATA MANAGEMENT

Administrative data tables should support where applicable:

* pagination
* sorting
* filtering
* searching
* row actions
* bulk actions
* empty states
* loading states
* responsive behavior

Never retrieve unlimited datasets from the database simply to render tables.

Use server-side pagination for large datasets.

---

# 23. ACCESSIBILITY

Target WCAG 2.2 AA principles where reasonably applicable.

Pay attention to:

* keyboard navigation
* focus visibility
* semantic HTML
* form labels
* ARIA only where necessary
* sufficient color contrast
* error identification
* modal focus management

Custom administrator-selected colors should be checked for problematic contrast where possible.

---

# 24. DATABASE ARCHITECTURE

Design a normalized relational database.

Common system entities may include:

```text
users
roles
permissions
user_roles
role_permissions
settings
media
sessions
password_reset_tokens
audit_logs
```

Additional tables must be created from the business modules specified in the attached documentation.

Use:

* primary keys
* foreign keys
* indexes
* unique constraints
* timestamps
* appropriate nullability
* transactions where required

Never use string fields as substitutes for relational structures simply to avoid creating appropriate tables.

---

# 25. DATABASE MIGRATIONS

Every schema modification must be managed through migrations.

Never require manual production database editing.

Provide:

```text
migration
rollback strategy
seed strategy
```

Database seeds must be idempotent whenever practical.

Running the seed process repeatedly must not create duplicate administrator accounts, roles, or permissions.

---

# 26. DATA INTEGRITY

Use database constraints whenever they can guarantee integrity better than application logic alone.

Use transactions for workflows involving multiple dependent database modifications.

For example:

```text
BEGIN

create record
create dependent records
write audit event

COMMIT
```

If a critical operation fails, rollback the transaction.

---

# 27. INPUT VALIDATION

Treat all external input as untrusted.

Validate:

* request parameters
* body values
* query parameters
* IDs
* dates
* enum values
* uploaded files
* URLs
* webhook payloads
* imported files
* external integration responses

Use allowlists when practical.

---

# 28. WEB APPLICATION SECURITY

Protect against common application vulnerabilities including:

* SQL injection
* XSS
* CSRF
* broken access control
* IDOR
* authentication bypass
* insecure file uploads
* path traversal
* SSRF where relevant
* open redirects
* mass assignment
* brute force attacks
* credential stuffing
* session fixation
* sensitive information disclosure

Use ORM parameterization and prepared queries.

Never concatenate untrusted values directly into SQL.

---

# 29. SECURITY HEADERS

Configure appropriate HTTP security headers, including where compatible:

```text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Strict-Transport-Security
```

Avoid unsafe CSP directives unless technically required and documented.

---

# 30. SECRETS MANAGEMENT

Never commit:

```text
.env
database passwords
API keys
SMTP credentials
private keys
OAuth secrets
session secrets
```

Provide:

```text
.env.example
```

containing placeholders only.

Example:

```env
APP_URL=
DATABASE_URL=
SESSION_SECRET=
INITIAL_ADMIN_PASSWORD=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

Generate cryptographically strong production secrets.

---

# 31. AUDIT LOGGING

Create an application-level audit log for sensitive actions.

Examples:

```text
LOGIN_SUCCESS
LOGIN_FAILED
LOGOUT
PASSWORD_CHANGED
PASSWORD_RESET
USER_CREATED
USER_UPDATED
USER_DISABLED
ROLE_CREATED
ROLE_UPDATED
PERMISSION_CHANGED
SETTINGS_UPDATED
BRANDING_UPDATED
```

Each audit entry should contain appropriate fields such as:

```text
actor_user_id
action
entity_type
entity_id
timestamp
ip_address
user_agent
metadata
```

Never store passwords or authentication tokens in audit metadata.

Audit logs should be protected against unauthorized modification.

---

# 32. APPLICATION LOGGING

Use structured application logs.

Support:

```text
INFO
WARNING
ERROR
CRITICAL
```

Do not expose stack traces or sensitive infrastructure details to normal users.

Detailed errors belong in server logs.

Users should receive safe, understandable error messages.

---

# 33. FILE STORAGE

Create a storage abstraction.

Support local filesystem storage initially when appropriate.

The architecture should permit migration to an S3-compatible object storage provider in the future without requiring business modules to be rewritten.

Separate:

```text
StorageService
```

from domain logic.

---

# 34. EMAIL / NOTIFICATIONS

If the attached module specifications require notifications, create a notification abstraction.

Support future providers such as:

* SMTP
* transactional email provider
* internal notifications

Do not tightly couple domain modules to a single external vendor.

---

# 35. BACKGROUND JOBS

Long-running tasks must not unnecessarily block HTTP requests.

Examples:

* large imports
* exports
* bulk email
* report generation
* external synchronization
* media processing

Use background jobs/queues when technically justified.

Do not introduce queue infrastructure merely for trivial operations.

---

# 36. API DESIGN

If an API is required:

Use consistent REST conventions unless another architecture is clearly justified.

Example:

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
```

Use predictable status codes.

Validate authorization on every protected endpoint.

Version APIs when future external consumption makes versioning necessary.

---

# 37. DOMAIN MODULE ANALYSIS

Before implementing each attached module, create an internal module specification using the following structure:

```text
MODULE
Purpose
Users / Actors
Permissions
Entities
Fields
Relationships
Business Rules
Validation Rules
Main Workflows
Screens
API Requirements
Notifications
Reports
Exports
Dependencies
Audit Events
Edge Cases
Acceptance Criteria
```

Use this analysis to drive implementation.

---

# 38. MODULE ARCHITECTURE

Each business module should follow a consistent structure.

Conceptually:

```text
module/
├── domain
├── application
├── infrastructure
├── presentation
├── validation
├── permissions
└── tests
```

Exact folder structure can follow selected framework conventions.

Do not force unnecessary Clean Architecture ceremony where it adds no practical value.

The objective is:

* clear boundaries
* testability
* maintainability
* predictable ownership of business logic

---

# 39. BUSINESS LOGIC

Business rules belong in services/domain logic, not directly inside:

* controllers
* route handlers
* React components
* Blade templates
* database migrations

UI components should orchestrate interactions but should not become the authoritative source for domain rules.

---

# 40. DASHBOARD

Create a secure post-login dashboard.

Dashboard widgets must derive from modules defined in the functional requirements.

Do not invent irrelevant metrics.

The dashboard architecture should support reusable widgets such as:

```text
KPI cards
recent activity
pending actions
status summaries
charts
notifications
```

Users should only see data they are authorized to access (see Section 13, RBAC).

## 40.1 Every metric must support a decision

Before adding a widget, identify the decision or action it supports. If nobody can answer "what would I do differently based on this number?", it is a vanity metric — drop it. Prefer decision metrics (conversion rate, churn, time-to-resolution, queue depth) over metrics that merely feel informative (raw counts, pageviews).

## 40.2 Match information depth to role

Different roles need different depth from the same data — an executive wants a high-level trend, an operator needs their queue and pending actions, an analyst needs filterable detail. Do not design a single dashboard for the most data-literate role and assume everyone else adapts. Where the functional requirements define multiple roles (Section 13/14), scope each dashboard view's widgets and detail level to what that role actually acts on.

## 40.3 Layout: put the most important thing where the eye lands first

Users scan dashboards in an F-pattern (a horizontal sweep across the top, then down the left side), and attention drops off sharply across a repeated row of elements — so ordering matters as much as content. Structure the page as an inverted pyramid:

```text
Top row      3–5 primary KPI cards: large number, clear label, trend indicator
Middle band  trend/time-series charts showing direction
Bottom       detail tables / breakdowns for users who need to dig deeper
```

Apply this layout on top of the 12/16-column grid and spacing scale already required in Section 18.3 — do not introduce a separate ad-hoc grid for dashboards.

## 40.4 Apply Fitts's, Hick's, and Gestalt principles

* **Fitts's Law** — make primary KPIs and the actions users take most often large and easy to reach; do not bury important controls in corners or behind tiny icons.
* **Hick's Law** — do not expose every filter/option at once. Show the essentials, and hide advanced or rarely-used filters behind a "More filters" disclosure (this is the same progressive-disclosure principle already required for forms and navigation elsewhere in this document).
* **Gestalt grouping** — cluster related metrics visually (proximity, shared container, shared color accent) so relationships are visible without extra explanation, instead of scattering related KPIs across the page.

## 40.5 Match chart type to the question, not to what looks good

Pick the chart by what question it answers, not by visual preference:

```text
Line chart          trend over time
Bar chart            comparison across categories
Scatter plot         correlation between two variables
Single-number card   current status at a glance
```

Avoid pie charts with more than 3–4 slices and avoid 3D charts — both obscure more than they reveal. Every chart must be understandable at a glance from its labels, legend, and axis — do not rely on hover/tooltip interaction to convey the primary message.

## 40.6 Give every KPI card context, not a bare number

A number with no reference point is not actionable. Each KPI card should include, where the data supports it:

```text
Temporal comparison   e.g. vs. last period, with direction
Benchmark or target    vs. goal/quota
Trend indicator         sparkline, arrow, or status — paired with a text label, never color alone
```

Keep KPI cards at a glance; push further detail to a drill-down rather than overloading the card.

## 40.7 Progressive disclosure for drill-down

Show summary data first; let users drill into detail on demand rather than loading everything up front. Common hierarchies: geographic (region → country → city), temporal (year → quarter → month), categorical (department → team → individual). This is also a performance requirement, not just a UX one — see Section 46 on pagination/selective queries; only query granular detail when the user actually requests it.

## 40.8 Filters and saved views

Support, as relevant to the module:

```text
Global filters     date range, team, region — apply to all widgets at once
Per-widget filters  narrower control on a single widget
Saved presets       let users switch between common configurations without reconfiguring
```

Offer structured flexibility (predefined filter categories, a curated widget set) rather than an unconstrained blank canvas — too many simultaneous options slows users down (Hick's Law again).

Dashboard-specific empty, loading, and error states follow the same rules as the rest of the application (Section 18.6, Section 60); dashboard color usage and contrast follow Section 18.3/23 — status must never be communicated by color alone.

---

# 41. SEARCH

If multiple modules contain searchable records, design search consistently.

Use database indexes appropriately.

Avoid introducing external search infrastructure unless dataset size or requirements justify it.

---

# 42. EXPORTS

When modules require exports, support formats such as:

```text
CSV
XLSX
PDF
```

only when required by the attached specifications.

Exports must enforce the same authorization and filtering rules as the UI.

A user must never be able to export information they cannot normally access.

---

# 43. IMPORTS

If imports are required:

Implement:

* file validation
* header validation
* row validation
* import preview where useful
* error reporting
* duplicate strategy
* transaction strategy
* partial failure strategy
* import audit logging

Never blindly insert uploaded CSV/XLSX content into the database.

---

# 44. DESTRUCTIVE ACTIONS

Destructive operations must require appropriate confirmation.

Examples:

* user deactivation
* deleting records
* deleting roles
* removing permissions
* resetting settings

For critical records, consider soft deletion according to domain requirements.

Never silently cascade-delete important business history unless specifically required.

---

# 45. ERROR HANDLING

Implement centralized error handling.

Differentiate between:

```text
validation error
authentication error
authorization error
not found
conflict
business rule violation
server error
external service failure
```

Do not expose database or framework internals to users.

---

# 46. PERFORMANCE

Apply sensible production optimizations:

* database indexes
* pagination
* selective queries
* avoid N+1 queries
* lazy loading where appropriate
* caching only when useful
* optimized image delivery
* compressed production assets

Do not prematurely introduce complex caching infrastructure.

---

# 47. TESTING

Create automated tests.

At minimum:

### Authentication

* valid login
* invalid login
* forced first password change
* session invalidation
* logout

### Authorization

* authorized user
* unauthorized user
* role permission enforcement
* direct API authorization

### Users

* create
* update
* deactivate
* role assignment

### Settings

* branding update
* theme update
* authorization

### Domain modules

Test critical business rules from the attached documentation.

Use:

* unit tests
* integration tests
* end-to-end tests where critical

Security-sensitive business logic requires backend tests.

---

# 48. QUALITY GATES

Before considering development complete:

Run:

```text
lint
type checking
tests
production build
database migration validation
```

Resolve:

* compilation errors
* TypeScript errors
* broken imports
* failing tests
* obvious security issues

Do not leave the repository knowingly broken.

---

# 49. DEVELOPMENT EXPERIENCE

Provide clear commands such as:

```bash
install
dev
build
start
test
lint
migrate
seed
```

The README must allow another competent developer to run the application without needing undocumented knowledge.

---

# 50. REQUIRED DOCUMENTATION

Generate at minimum:

```text
README.md
docs/ARCHITECTURE.md
docs/DATABASE.md
docs/SECURITY.md
docs/MODULES.md
docs/PERMISSIONS.md
docs/DEPLOYMENT.md
docs/ENVIRONMENT.md
docs/API.md
docs/CHANGELOG.md
.env.example
```

Where appropriate, also create:

```text
docs/DECISIONS.md
```

to record important architectural decisions.

---

# 51. README

The README must include:

```text
Project description
Architecture
Selected stack
Requirements
Installation
Environment variables
Database setup
Migration
Seed
Development
Production build
Tests
Deployment
Initial administrator bootstrap
Security considerations
```

Clearly document:

```text
Initial username: admin
Initial password: admin
```

and prominently state that the password MUST be changed immediately on first login.

---

# 52. DATABASE DOCUMENTATION

Document:

* tables
* purpose
* important fields
* relationships
* indexes
* constraints

Include a Mermaid ER diagram when practical.

Example:

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned
    ROLES ||--o{ ROLE_PERMISSIONS : contains
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : includes
```

Expand the ER diagram with the actual application domain.

---

# 53. PERMISSIONS MATRIX

Generate a permissions matrix such as:

| Module   | Permission      | Super Admin |    Admin | User |
| -------- | --------------- | ----------: | -------: | ---: |
| Users    | users.view      |         Yes |      Yes |   No |
| Users    | users.create    |         Yes |      Yes |   No |
| Settings | settings.update |         Yes | Optional |   No |

Extend this matrix using every business module.

---

# 54. DEPLOYMENT DOCUMENTATION

Deployment documentation must cover the selected platform.

Include:

```text
prerequisites
environment variables
database
build process
deployment
migration process
seed/bootstrap
file permissions
TLS
scheduled tasks
workers
logs
backup
restore
rollback
health check
```

---

# 55. BACKUP STRATEGY

Document a basic backup policy.

At minimum address:

* relational database
* uploaded files
* application configuration

Backups must not rely solely on application code deployment artifacts.

Include restoration considerations.

---

# 56. HEALTH CHECK

Create a lightweight health endpoint where appropriate.

Example:

```text
GET /health
```

Return only non-sensitive information.

Do not expose:

* environment variables
* database credentials
* internal filesystem paths
* stack traces

---

# 57. ENVIRONMENT SEPARATION

Support:

```text
development
testing
staging
production
```

Environment-specific behavior must be controlled through configuration.

Do not determine production mode through domain-name string comparisons.

---

# 58. GIT

Assume source control using Git.

Provide a suitable `.gitignore`.

Never commit:

```text
.env
dependencies
build artifacts when unnecessary
logs
temporary uploads
IDE secrets
database dumps containing production data
```

---

# 59. CODE QUALITY

Code must be:

* readable
* typed where supported
* documented where necessary
* modular
* consistent
* easy to maintain

Avoid:

* duplicated logic
* giant files
* unexplained magic numbers
* hard-coded credentials
* hard-coded URLs
* hard-coded branding
* business logic in UI components

---

# 60. UI STATE REQUIREMENTS

Every important screen should intentionally handle:

```text
loading
empty
success
validation error
server error
permission denied
```

Do not leave the user with blank interfaces.

---

# 61. DATE AND TIME

Store timestamps in UTC unless a domain requirement explicitly requires another strategy.

Display dates according to configurable application/user timezone.

Prepare the architecture for timezone-aware operations.

---

# 62. INTERNATIONALIZATION

Do not implement unnecessary translation infrastructure unless requested.

However, avoid architecture that makes future localization unnecessarily difficult.

Keep user-facing strings reasonably centralized where supported by the selected framework.

---

# 63. SECURITY-FIRST REVIEW

Before considering the application production-ready, perform a security review of:

```text
Authentication
Authorization
RBAC
IDOR
Session management
Password reset
File upload
Input validation
Database queries
Sensitive configuration
Logging
Error messages
CSRF
XSS
Security headers
Dependencies
```

Document notable findings in:

```text
docs/SECURITY.md
```

---

# 64. DEPENDENCY SECURITY

Use actively maintained dependencies.

Avoid introducing a package for functionality that can be safely handled by the framework itself.

Run the appropriate dependency security/audit tooling for the selected ecosystem.

Do not blindly upgrade across breaking major versions without validation.

---

# 65. NO PLACEHOLDER IMPLEMENTATIONS

Do not deliver UI containing non-functional actions such as:

```text
TODO
Coming soon
Fake data
Mock API
console.log instead of implementation
```

unless the attached requirements explicitly describe future modules.

Every implemented primary action must be connected to real application behavior.

---

# 66. NO FAKE DATA IN PRODUCTION

Development fixtures may be created separately.

Production seeds should contain only essential structural data such as:

* bootstrap administrator
* default roles
* permissions
* required system settings

Do not populate production with fake customers, transactions, invoices, etc.

---

# 67. IMPLEMENTATION WORKFLOW

Execute development in this order.

## Phase 1 — Discovery

Read all attached files.

Produce:

```text
Module inventory
Functional requirements
Actors
Roles
Permissions
Entities
Relationships
Business rules
Open assumptions
```

---

## Phase 2 — Architecture

Define:

```text
System architecture
Application layers
Database architecture
Authentication
Authorization
Storage
Module boundaries
Deployment architecture
Security architecture
```

---

## Phase 3 — Foundation

Implement:

```text
Application bootstrap
Database
Migrations
Authentication
Forced password change
Users
Roles
Permissions
Settings
Branding
Audit logging
Application shell
Design system
```

---

## Phase 4 — Business Modules

Implement every module described in the attached requirements.

Follow module dependencies in logical order.

---

## Phase 5 — Testing

Create and execute:

```text
unit tests
integration tests
critical end-to-end tests
authorization tests
```

---

## Phase 6 — Production Readiness

Validate:

```text
build
database migrations
security
permissions
deployment
environment configuration
documentation
```

---

# 68. DEVELOPMENT PROGRESS

Maintain:

```text
docs/IMPLEMENTATION_STATUS.md
```

Use:

```markdown
# Implementation Status

## Core Platform

- [x] Authentication
- [x] Forced password reset
- [x] Users
- [x] Roles
- [x] Permissions
- [x] Settings
- [x] Branding
- [x] Audit logs

## Business Modules

### Module A
- [ ] Database
- [ ] Backend
- [ ] UI
- [ ] Permissions
- [ ] Tests

### Module B
...
```

Update this document while development progresses.

---

# 69. ACCEPTANCE CRITERIA

The application is considered functionally complete only when:

1. The application installs successfully.
2. Database migrations execute successfully.
3. Initial seed executes successfully.
4. `admin / admin` can authenticate.
5. The administrator is immediately forced to change the password.
6. No other application functionality is available before the password change.
7. Multiple users can be created.
8. Roles can be assigned.
9. Permissions are enforced server-side.
10. Unauthorized direct URL/API access is blocked.
11. Administrators can configure branding.
12. Administrators can upload logos.
13. Administrators can configure the application color palette.
14. UI uses the configured theme.
15. Audit logging works.
16. All modules described in attached specifications work.
17. Critical business workflows have automated tests.
18. Production build succeeds.
19. Deployment instructions are complete.
20. No credentials are committed to source control.

---

# 70. FINAL FUNCTIONAL MODULE SPECIFICATIONS

The functional requirements this application must implement are whatever documents the user attached or pasted alongside this command invocation (see the Invocation note at the top of this file). Treat that content conceptually as:

```text
============================================================
ATTACHED FUNCTIONAL REQUIREMENTS
============================================================

[MODULE SPECIFICATION FILE 1]

[MODULE SPECIFICATION FILE 2]

[MODULE SPECIFICATION FILE 3]

[...]

============================================================
END FUNCTIONAL REQUIREMENTS
============================================================
```

You MUST incorporate those requirements into the architecture described above.

The generic architecture in this prompt establishes engineering, security, UX, deployment, and code-quality standards.

The attached documents establish WHAT the application must actually do.

If an attached functional requirement conflicts with an insecure implementation approach, preserve the business objective while implementing it using a secure architecture.

---

# 71. INITIAL RESPONSE REQUIRED FROM THE DEVELOPMENT AGENT

Before modifying the repository, provide a concise architecture assessment containing:

```text
1. Selected technology profile
2. Selected deployment target
3. Functional modules discovered
4. Main entities
5. User types / roles
6. High-level database model
7. Authentication strategy
8. Authorization strategy
9. Application module architecture
10. Deployment strategy
11. Important assumptions
12. Important risks
```

Then proceed with implementation.

Do NOT stop after producing an architecture document.

The objective is to **build the application**.

---

# 72. AUTONOMOUS ENGINEERING RULES

During implementation:

* Inspect existing code before replacing it.
* Preserve working functionality unless replacement is necessary.
* Do not create parallel duplicate architectures.
* Reuse shared components.
* Reuse shared validation.
* Reuse shared authorization.
* Use migrations for database changes.
* Run tests after meaningful changes.
* Run the production build periodically.
* Fix discovered errors instead of merely documenting them.
* Keep technical documentation synchronized with implementation.

If a minor technical decision is unspecified, make the safest maintainable decision and continue.

If a requirement has serious ambiguity that could materially alter business behavior, document the assumption clearly.

---

# 73. FINAL ENGINEERING PRINCIPLE

Build this system under the assumption that it will eventually contain real business data and be exposed to the public Internet.

Prioritize, in this order:

```text
1. Security
2. Data integrity
3. Correctness
4. Maintainability
5. Usability
6. Performance
7. Extensibility
8. Visual polish
```

Do not trade security or data integrity for development convenience.

Build a system another senior engineering team could safely maintain after handoff.
