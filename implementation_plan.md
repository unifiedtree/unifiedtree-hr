# React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` when possible, or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current static Unified Tree HR Dashboard into a React app without compromising existing pages, dashboard tabs, mock data, routing, styling, responsiveness, or GitHub Pages compatibility.

**Architecture:** Use a React + Vite static build. Preserve the current information architecture by converting each existing `data-page` section into a React page component, each tab group into reusable tab components, and each chart initialiser into a reusable chart component. Keep all data mock/in-memory and keep CSS token-based.

**Tech Stack:** React, Vite, ApexCharts via `react-apexcharts`, plain CSS using the existing `design-tokens.css` and `components.css`, static hash routing, GitHub Pages-ready `dist`.

---

## Migration Rules

- Preserve every module currently reachable from the sidebar.
- Preserve the dashboard tabs: Overview, People, Operations, Finance, Recruiting.
- Preserve the recently fixed dashboard finance/recruiting/people/operations content.
- Preserve Indian HR context, Indian English, PF/ESI/POSH/Muster Roll terminology, and Indian rupee formatting.
- No backend, auth, API, database, or real user data.
- No Tailwind or framework migration beyond React.
- Keep colors through CSS variables; do not add hardcoded hex outside the token layer.
- Keep the app deployable as static GitHub Pages output.
- Verify in the built-in/local browser after every implementation phase.

## Current App Inventory

The current static app contains these sidebar/page routes and each must remain reachable:

- `dashboard`
- `companies`
- `workforce-dir`
- `org-setup`
- `rules-policies`
- `salary-comp`
- `att-analytics`
- `daily-track`
- `shifts-ot`
- `leave-mgmt`
- `hiring-pipeline`
- `onboarding-assets`
- `emp-vault`
- `dashboard-payroll`
- `salary-structure`
- `payroll-processing`
- `pli`
- `advances`
- `bank-disbursement`
- `expense-center`
- `ess-attendance`
- `ess-payslips`
- `ess-profile`
- `team-attendance`
- `emp-performance`
- `appraisals`
- `kpi-tracking`
- `skill-matrix`
- `training`
- `certifications`
- `statutory`
- `muster-roll`
- `posh`
- `inspector-view`
- `compliance-calendar`
- `report-attendance`
- `report-payroll`
- `workforce-analytics`
- `resignation`
- `fnf`
- `exp-letter`
- `settings`

## Proposed File Structure

- Create: `src/main.jsx` - React entry point.
- Create: `src/App.jsx` - app shell, topbar, sidebar, hash route state.
- Create: `src/data/navigation.js` - sidebar categories and route metadata.
- Create: `src/data/mockData.js` - shared mock metrics, employees, payroll, recruitment, compliance data.
- Create: `src/components/AppShell.jsx` - layout wrapper.
- Create: `src/components/Topbar.jsx` - top navigation, search, persona switcher trigger.
- Create: `src/components/Sidebar.jsx` - semantic sidebar navigation.
- Create: `src/components/Tabs.jsx` - reusable keyboard-accessible tab component.
- Create: `src/components/StatCard.jsx` - dashboard KPI card.
- Create: `src/components/ChartCard.jsx` - chart wrapper.
- Create: `src/components/Table.jsx` - reusable table shell.
- Create: `src/charts/*.jsx` - ApexCharts chart components.
- Create: `src/pages/dashboard/*.jsx` - dashboard overview and tab panels.
- Create: `src/pages/*.jsx` - route page components for all remaining modules.
- Create: `src/pages/settings/*.jsx` - settings tab content.
- Modify: `package.json` - add React/Vite scripts and dependencies.
- Modify: `index.html` - replace static body with React mount point.
- Preserve/modify: `design-tokens.css`, `components.css` - keep styling approach, add React-safe accessibility and responsive classes only.

## Phase 1: Scaffold React Without Removing Static Content

**Defect ID:** Phase 2.1 - React scaffold with static parity guard

- [ ] Add dependencies: `react`, `react-dom`, `@vitejs/plugin-react`, `vite`, `apexcharts`, `react-apexcharts`.
- [ ] Add scripts: `dev`, `build`, `preview`.
- [ ] Create `src/main.jsx` and `src/App.jsx`.
- [ ] Keep current `index.html` content available in git until the React shell renders a verified equivalent.
- [ ] Import `design-tokens.css` and `components.css` from React.
- [ ] Build a minimal React shell that renders topbar, sidebar, and Dashboard Overview.

Verification:

- [ ] Run `npm install`.
- [ ] Run `npm run build`.
- [ ] Open the Vite app in browser.
- [ ] Confirm Dashboard Overview renders.

Stop after Phase 1 for human approval.

## Phase 2: Routing And Layout Parity

**Defect ID:** Phase 2.2 - Preserve all sidebar route reachability

- [ ] Create `src/data/navigation.js` from the current sidebar order.
- [ ] Implement hash routing so `#/dashboard`, `#/hiring-pipeline`, `#/settings/hr-config`, and all existing routes work.
- [ ] Implement active sidebar state and open parent groups.
- [ ] Convert the topbar search overlay and persona switcher into React state.
- [ ] Ensure admin-only and employee persona visibility stays equivalent to the static demo.

Verification:

- [ ] Browser-check every sidebar route exists and activates a page.
- [ ] Browser-check keyboard Tab focus through sidebar and topbar.
- [ ] Verify no route shows blank content.

Stop after Phase 2 for human approval.

## Phase 3: Dashboard React Conversion

**Defect ID:** Phase 2.3 - Dashboard feature parity in React

- [ ] Convert Dashboard Overview to React.
- [ ] Convert Dashboard People tab, including Department Distribution.
- [ ] Convert Dashboard Operations tab, including attendance and productivity charts.
- [ ] Convert Dashboard Finance tab, including Payroll vs Budget.
- [ ] Convert Dashboard Recruiting tab, including Hiring Funnel.
- [ ] Replace imperative ApexCharts initialisers with React chart components.
- [ ] Preserve hash subroutes:
  - `#/dashboard/overview`
  - `#/dashboard/people`
  - `#/dashboard/operations`
  - `#/dashboard/finance`
  - `#/dashboard/recruiting`

Verification:

- [ ] Run `npm run build`.
- [ ] Browser-check all dashboard tabs.
- [ ] Confirm each chart renders exactly once.
- [ ] Confirm no console errors.
- [ ] Check 375px mobile layout.

Stop after Phase 3 for human approval.

## Phase 4: Core HR Module Conversion

**Defect ID:** Phase 2.4 - Preserve master, attendance, leave, and recruitment modules

- [ ] Convert Company Profile and Companies & Branches pages.
- [ ] Convert Master pages:
  - Workforce Directory
  - Organization Setup
  - Rules & Policies
  - Payroll Configuration
- [ ] Convert Attendance & Time pages:
  - Attendance Analytics
  - Daily Tracking
  - Shifts & Overtime
- [ ] Convert Leave Operations Center.
- [ ] Convert Recruitment & Onboarding pages:
  - Hiring Pipeline
  - Onboarding & Assets
  - Employee Vault
- [ ] Preserve all nested tabs within these modules.

Verification:

- [ ] Browser-check each module route.
- [ ] Browser-check nested tabs by mouse and keyboard.
- [ ] Confirm all tables and mock records are visible.
- [ ] Confirm no current module disappears from navigation.

Stop after Phase 4 for human approval.

## Phase 5: Payroll, ESS, Performance, Compliance, Reports, Exit, Settings

**Defect ID:** Phase 2.5 - Preserve remaining HR dashboard modules

- [ ] Convert Payroll pages:
  - Payroll Dashboard
  - Salary Structure
  - Processing & Payslips
  - Production-Linked Incentive
  - Advances & Loans
  - Bank Disbursement
- [ ] Convert Expense Center.
- [ ] Convert Employee Self Service pages.
- [ ] Convert Performance & Learning pages.
- [ ] Convert Compliance pages.
- [ ] Convert Reports & Analytics pages.
- [ ] Convert Employee Exit pages.
- [ ] Convert Settings tabs:
  - General
  - Holidays
  - Roles & Permissions
  - Notifications
  - Integrations
  - Audit Logs

Verification:

- [ ] Browser-check every remaining route.
- [ ] Confirm nested settings tabs route and render correctly.
- [ ] Confirm Indian rupee formatting remains intact.
- [ ] Confirm compliance terminology remains intact.

Stop after Phase 5 for human approval.

## Phase 6: Accessibility, Responsive, And Static Build Hardening

**Defect ID:** Phase 2.6 - Production-ready React static dashboard

- [ ] Ensure all clickable controls are `<button>` or proper links.
- [ ] Ensure tabs support keyboard operation and visible focus.
- [ ] Ensure Escape closes overlays/dropdowns.
- [ ] Ensure no text overlaps at 375px width.
- [ ] Ensure horizontal tables scroll instead of breaking layout.
- [ ] Configure Vite `base` for GitHub Pages if required by deployment path.
- [ ] Remove obsolete helper scripts only after confirming they are not required by the React app.

Verification:

- [ ] Run `npm run build`.
- [ ] Run `npm run preview`.
- [ ] Browser-check desktop and 375px mobile.
- [ ] Confirm `dist` is static and GitHub Pages-compatible.
- [ ] Confirm no console errors.
- [ ] Confirm no broken chart rendering after route changes.

Stop after Phase 6 for human approval.

## Phase 7: Final Parity Audit

**Defect ID:** Phase 2.7 - Static-to-React feature parity audit

- [ ] Compare old route inventory against new React route registry.
- [ ] Compare dashboard tab inventory against React dashboard tabs.
- [ ] Compare chart inventory against React chart components.
- [ ] Compare settings tab inventory.
- [ ] Compare sidebar labels and order.
- [ ] Compare mobile screenshots.

Verification:

- [ ] Produce a route parity report.
- [ ] Produce a screenshot set for:
  - Dashboard Overview desktop
  - Dashboard People mobile
  - Dashboard Operations desktop
  - Dashboard Finance desktop
  - Dashboard Recruiting desktop
  - Workforce Directory desktop
  - Payroll Processing desktop
  - Settings desktop
- [ ] Run final `npm run build`.

Stop after Phase 7 for human approval before commit/PR packaging.

## Risks And Mitigations

- Risk: Losing content during conversion.
  - Mitigation: route inventory, phase-by-phase parity checks, no deletion of static reference until parity passes.
- Risk: Chart rendering differences.
  - Mitigation: use React chart wrappers and verify each chart after route activation.
- Risk: Large `index.html` is hard to translate safely.
  - Mitigation: convert by route groups and keep each React page focused.
- Risk: GitHub Pages path issues.
  - Mitigation: verify `dist` locally and set Vite `base` only when deployment path is known.
- Risk: Existing uncommitted helper files and generated scripts.
  - Mitigation: ignore unrelated files unless they block build or verification.

## Stop Point

This is a full-app migration. Stop here until explicit approval is given to execute Phase 1.

---

# Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this cleanup task-by-task. This plan intentionally avoids deleting migration reference files needed for parity.

**Goal:** Remove temporary/generated files that are no longer part of the React migration source while preserving everything needed to build, verify, and continue the migration safely.

**Architecture:** Keep source files, CSS tokens, package manifests, React scaffold, and the static parity reference. Remove old one-off transformation/test scripts and ignore generated dependency/build output.

**Tech Stack:** React + Vite source, plain CSS, npm package manifests.

---

## Keep

- `index.html` - React mount.
- `legacy-static.html` - required static parity reference until all React phases are complete.
- `src/` - React source.
- `components.css` - active styling layer.
- `design-tokens.css` - active token layer.
- `package.json` and `package-lock.json` - dependency manifests.
- `vite.config.js` - Vite build config.
- `implementation_plan.md` - migration and cleanup plan.
- `AGENTS.md` and `README.md`.

## Remove

These are old one-off scripts/output from earlier static HTML manipulation and are not imported by the React scaffold:

- `debug.js`
- `fix.js`
- `fixSidebar.js`
- `fix-tabs.js`
- `fix-tabs-real.js`
- `fix-tabs-boundary.js`
- `phase2.js`
- `phase3.js`
- `phase4.js`
- `responsive.js`
- `test.js`
- `test2.js`
- `test3.js`
- `test3_out.txt`
- `test4.js`
- `test5.js`
- `test6.js`
- `test7.js`

Generated folders should not be committed:

- `dist/`
- `node_modules/`

## Add

- `.gitignore` with:
  - `node_modules/`
  - `dist/`
  - `.vite/`
  - `*.log`

## Verification

- [ ] Confirm none of the remove-list files are imported by `src/`, `index.html`, `package.json`, `vite.config.js`, or `legacy-static.html`.
- [ ] Delete only the remove-list files.
- [ ] Delete `dist/` so future builds regenerate it.
- [ ] Keep `node_modules/` locally for now unless the human explicitly wants the folder removed; ignore it via `.gitignore` either way.
- [ ] Run `npm.cmd run build`.
- [ ] Confirm `dist/` regenerates successfully.
- [ ] Run a quick browser check against the regenerated `dist/index.html#/dashboard/overview`.

## Stop Point

Stop here until explicit approval is given to execute the cleanup.

---

# Module Experience Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. This phase improves the React module experience without adding backend, auth, APIs, or real data.

**Goal:** Make the HR dashboard cleaner, richer, and easier to demo by adding structured mock data, improving module layouts, and replacing generic placeholder/legacy-feeling screens with consistent React module summaries.

**Architecture:** Keep the existing React shell. Add central mock datasets and reusable module components, then progressively upgrade key modules from raw legacy HTML to cleaner React views. Preserve all routes and existing content reachability.

**Tech Stack:** React, Vite, plain CSS tokens, ApexCharts/react-apexcharts, static mock data.

---

## Recommended Improvements

### 1. Module Landing Pattern

Every major module should start with:

- 3-4 KPI cards
- one primary chart or summary panel
- a compact “Needs Attention” list
- a recent activity table

This will make each module feel intentional instead of like a copied static page.

Priority modules:

- Workforce Directory
- Attendance Analytics
- Leave Operations Center
- Hiring Pipeline
- Payroll Dashboard
- Expense Center
- Performance
- Compliance

### 2. Richer Dummy Data

Add central mock datasets in `src/data/mockData.js`:

- `employees`: 24-40 employees with Indian names, departments, branch, status, salary band, attendance status.
- `departments`: Engineering, Operations, Sales, Finance, HR & Admin, Manufacturing, Marketing.
- `attendanceRecords`: daily attendance with present, late, WFH, leave, not marked.
- `leaveRequests`: earned leave, sick leave, casual leave, comp off with approval status.
- `recruitmentPipeline`: roles, candidates, interview stages, offered CTC.
- `payrollRuns`: monthly payroll totals, PF/ESI/TDS, pending approvals.
- `expenseClaims`: travel, medical, food, relocation, policy exceptions.
- `complianceItems`: PF, ESI, Shops & Establishments, POSH, Muster Roll, Labour Dept Audit.
- `activities`: recent cross-module HR events.

All money should use Indian rupee formatting and Indian number grouping.

### 3. Cleaner Visual Hierarchy

Use a quieter operational dashboard style:

- consistent page headers and breadcrumbs
- consistent KPI cards
- tables with fewer columns by default
- “status first” badges
- short contextual empty/placeholder copy
- dense but readable layout for repeat HR tasks

Avoid adding new decorative gradients or marketing-style hero sections.

### 4. Better Navigation Experience

Improve current React routing:

- command palette should show all modules, not only recent items
- search should filter mock employees and modules
- sidebar active state should work for add pages under Organization Setup
- settings subroutes should deep-link reliably
- persona switch should show a small notice when admin-only routes are hidden

### 5. Replace Legacy Bridge Gradually

The current `LegacyPage` bridge preserves content, but it embeds a large HTML payload. Improve maintainability by replacing high-value modules with native React first:

1. Workforce Directory
2. Attendance Analytics
3. Leave Operations Center
4. Hiring Pipeline
5. Payroll Dashboard
6. Compliance Calendar
7. Settings

Keep the bridge for lower-priority pages until they are converted.

## Phase UX-1: Data Foundation

**Defect ID:** UX 1.1 - richer static mock data

- [ ] Expand `src/data/mockData.js` with employees, departments, attendance, leave, recruitment, payroll, expense, compliance, and activity datasets.
- [ ] Add formatter helpers:
  - `formatINR(amount)`
  - `formatLakhCrore(amount)`
  - `formatPercent(value)`
- [ ] Keep all data mock/in-memory.

Verification:

- [ ] Run `npm.cmd run build`.
- [ ] Confirm no imports break.

Stop after UX-1 for review if implementation risk grows.

## Phase UX-2: Shared Module Components

**Defect ID:** UX 2.1 - consistent module UI components

- [ ] Create `src/components/PageHeader.jsx`.
- [ ] Create `src/components/ModuleStatGrid.jsx`.
- [ ] Create `src/components/DataTable.jsx`.
- [ ] Create `src/components/StatusBadge.jsx`.
- [ ] Create `src/components/AttentionList.jsx`.
- [ ] Create `src/components/ActivityFeed.jsx`.

Verification:

- [ ] Run `npm.cmd run build`.
- [ ] Check Dashboard still renders.
- [ ] Confirm focus styles remain visible.

## Phase UX-3: Dashboard Polish

**Defect ID:** UX 3.1 - cleaner dashboard experience

- [ ] Move dashboard data into named mock datasets instead of inline arrays.
- [ ] Add a “Today’s Attention” panel.
- [ ] Add recent activity using shared `ActivityFeed`.
- [ ] Keep People, Operations, Finance, and Recruiting charts.
- [ ] Improve mobile stacking at 375px if any card feels cramped.

Verification:

- [ ] Browser-check dashboard Overview, People, Operations, Finance, Recruiting.
- [ ] Confirm all chart tabs render.
- [ ] Confirm no horizontal overflow at 375px.

## Phase UX-4: Native Workforce Directory

**Defect ID:** UX 4.1 - cleaner employee module

- [ ] Replace `workforce-dir` legacy page with native React.
- [ ] Show headcount KPIs, department distribution, employee table, and employee status filters.
- [ ] Add at least 24 mock employees.
- [ ] Include department, branch, role, attendance status, payroll status, and joining date.

Verification:

- [ ] Browser-check `#/workforce-dir`.
- [ ] Confirm employee table renders with mock data.
- [ ] Confirm filters/tabs do not break keyboard access.

## Phase UX-5: Native Attendance And Leave

**Defect ID:** UX 5.1 - better operations modules

- [ ] Replace `att-analytics` with native React summary cards, weekly chart, exception list, and attendance table.
- [ ] Replace `leave-mgmt` with leave balance cards, pending approvals, leave calendar summary, and recent requests.
- [ ] Use attendance/leave mock datasets.

Verification:

- [ ] Browser-check `#/att-analytics` and `#/leave-mgmt`.
- [ ] Confirm attendance/leave mock numbers are internally consistent.

## Phase UX-6: Native Recruiting And Payroll

**Defect ID:** UX 6.1 - stronger business demo modules

- [ ] Replace `hiring-pipeline` with open roles, candidates, hiring funnel, and interview queue.
- [ ] Replace `dashboard-payroll` with payroll run health, cost trend, statutory deductions, and approval queue.
- [ ] Use recruitment/payroll mock datasets.

Verification:

- [ ] Browser-check `#/hiring-pipeline` and `#/dashboard-payroll`.
- [ ] Confirm rupee values use Indian formatting.

## Phase UX-7: Native Compliance And Settings

**Defect ID:** UX 7.1 - cleaner admin modules

- [ ] Replace `compliance-calendar` with upcoming compliance tasks and risk status.
- [ ] Replace `settings` with native settings tabs.
- [ ] Keep roles, notifications, integrations, and audit logs visible.

Verification:

- [ ] Browser-check `#/compliance-calendar`.
- [ ] Browser-check all settings tabs.
- [ ] Confirm no admin-only route appears in employee persona.

## Final Verification

- [ ] Run `npm.cmd run build`.
- [ ] Browser route sweep for all routes.
- [ ] Check key screens at desktop and 375px mobile:
  - Dashboard Overview
  - Workforce Directory
  - Attendance Analytics
  - Leave Operations Center
  - Hiring Pipeline
  - Payroll Dashboard
  - Compliance Calendar
  - Settings
- [ ] Confirm runtime exceptions are `0`.
- [ ] Confirm all routes still render non-empty content.

## Stop Point

Stop here until explicit approval is given to implement the module experience improvements.
