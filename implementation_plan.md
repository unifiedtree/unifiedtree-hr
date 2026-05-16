# Implementation Plan: Dashboard Tab Content Recovery

## Context

The dashboard top-level tabs are present in `index.html`:

- Overview
- People
- Operations
- Finance
- Recruiting

Current defect: the People, Operations, Finance, and Recruiting dashboard tab panes exist but are empty. Chart initialisers still reference dashboard chart IDs such as `emp-dept-bar`, `productivity-gauge`, `payroll-area`, and `hiring-funnel`, but those chart containers are no longer rendered inside the dashboard tab panes.

This plan keeps the app static, preserves existing HR/payroll/recruitment content, and limits changes to the dashboard tab recovery path.

## Defect IDs

- Phase 1.1 - Dashboard Finance tab content missing
- Phase 1.2 - Dashboard Recruiting tab content missing
- Phase 1.3 - Dashboard People tab Department Distribution missing
- Phase 1.4 - Dashboard Operations tab content missing
- Phase 1.5 - Dashboard tab chart rendering after hidden-tab activation

## Root Cause Hypothesis

The dashboard was split into tab panes, but content migration was incomplete or destructive:

- `data-tab-pane="people"` is empty.
- `data-tab-pane="operations"` is empty.
- `data-tab-pane="finance"` is empty.
- `data-tab-pane="recruiting"` is empty.
- The ApexCharts setup still checks for chart IDs that are not present in the dashboard DOM.

Because hidden tabs use `display: none`, chart rendering also needs a resize/update trigger after tab activation.

## Phase 1: Restore Dashboard Tab Content

### Phase 1.1 - Finance

Add Finance dashboard content inside `data-tab-pane="finance"`:

- Payroll vs Budget chart using existing `#payroll-area`.
- Finance KPI cards for monthly payroll, variance, reimbursements, and pending advances.
- A compact list/table for pending finance items using Indian rupee formatting.

Acceptance criteria:

- Clicking Finance displays visible content.
- `#payroll-area` exists once in the DOM and renders.
- Amounts use Indian rupee formatting.

### Phase 1.2 - Recruiting

Add Recruiting dashboard content inside `data-tab-pane="recruiting"`:

- Hiring funnel chart using existing `#hiring-funnel`.
- Recruitment KPI cards for open roles, candidates, interviews, and offers.
- A compact pipeline table/list connected to the existing recruitment mock data style.

Acceptance criteria:

- Clicking Recruiting displays visible content.
- `#hiring-funnel` exists once in the DOM and renders.
- Recruitment content remains mock/in-memory and static.

### Phase 1.3 - People

Add People dashboard content inside `data-tab-pane="people"`:

- Department Distribution card using existing `#emp-dept-bar`.
- People KPI cards for headcount, joiners, exits, and attrition.
- A small department summary table/list.

Acceptance criteria:

- Clicking People displays visible content.
- Department Distribution is visible and represented as charted data.
- `#emp-dept-bar` exists once in the DOM and renders.

### Phase 1.4 - Operations

Add Operations dashboard content inside `data-tab-pane="operations"`:

- Attendance trend chart using existing `#att-weekly-chart`.
- Attendance distribution chart using existing `#att-donut-chart`.
- Productivity gauge using existing `#productivity-gauge`.
- Operations KPI cards for present, late arrivals, WFH, and pending regularisation.

Acceptance criteria:

- Clicking Operations displays visible content.
- Required chart containers exist once each and render.
- Existing attendance terminology and Indian HR context remain unchanged.

### Phase 1.5 - Tab Rendering and Accessibility

Tighten dashboard tab behaviour:

- Use semantic `<button>` elements for dashboard tabs if changing markup is practical without broad churn.
- Preserve keyboard operation via Tab and Enter/Space.
- Ensure visible focus rings use existing CSS variables.
- Dispatch chart resize/update after tab activation so ApexCharts renders correctly in formerly hidden panes.
- Keep dashboard hash routes working: `#/dashboard/people`, `#/dashboard/operations`, `#/dashboard/finance`, `#/dashboard/recruiting`.

Acceptance criteria:

- Mouse and keyboard activation work.
- Active tab and pane stay in sync.
- Refreshing a dashboard subroute shows the correct tab.

## Verification Plan

1. Static DOM checks:
   - Confirm dashboard panes are not empty.
   - Confirm each chart ID exists exactly once:
     - `emp-dept-bar`
     - `att-weekly-chart`
     - `att-donut-chart`
     - `productivity-gauge`
     - `payroll-area`
     - `hiring-funnel`

2. Browser verification:
   - Open the static dashboard in the built-in browser.
   - Click People, Operations, Finance, and Recruiting.
   - Confirm content is visible in each tab.
   - Confirm charts render after tab switching.
   - Confirm no console errors related to missing chart containers.

3. Responsive verification:
   - Test at 375px width.
   - Confirm tab bar remains horizontally usable.
   - Confirm cards/charts stack without text overlap.

## Files Expected To Change

- `index.html`
- `components.css` only if focus/accessibility or responsive tweaks are required

## Out Of Scope

- Backend, APIs, database, or authentication
- Framework migration
- Real HR data
- Removing existing rendered modules
- Broad cleanup of generated helper scripts unless they directly block verification

## Stop Point

Stop after this plan until explicit approval is given to execute Phase 1.
