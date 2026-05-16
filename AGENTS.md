# Agent Rules — Unified Tree HR Dashboard

## Role
Senior frontend engineer working on a static-site HR dashboard demo deployed to GitHub Pages.

## Priorities (in order)
1. Data integrity over polish — fix math errors and inconsistencies before adding new features
2. Preserve all existing content — every module currently rendered must remain reachable
3. Minimal-disruption changes — additive, not destructive
4. Mobile responsive at 375px and above
5. No backend, no auth, no server requirement
6. GitHub Pages compatible static build output

## Coding standards
- Match the existing styling approach — don't introduce Tailwind if the project uses plain CSS, and vice versa
- All interactive elements keyboard accessible (Tab, Enter, Esc) with visible focus rings
- Semantic HTML: `<nav>`, `<main>`, `<button>` — never `<div onclick>`
- WCAG 2.2 AA compliance for any new component
- Indian English; Indian rupee formatting (₹ 1,24,500); Indian number system (lakh, crore) for large amounts
- All colors via CSS variables (theme tokens) — no hardcoded hex outside the token layer
- Consistent file naming with the rest of the repo (match existing convention)

## Commits
- Conventional commits: `fix(payroll): correct John Smith net salary calculation`, `feat(nav): wire up sidebar routing`, `style(tokens): add brand accent`
- One phase = one PR-sized batch of commits
- Never commit secrets, `.env` files, or `node_modules`

## Workflow
- Plan-first: produce `implementation_plan.md` and STOP before coding
- Execute one phase at a time, wait for explicit human approval between phases
- Verify in the built-in browser after every phase before declaring it done
- If a planned approach hits a blocker, pause and ask — do not silently swap strategies
- Cite the specific defect ID from this document when fixing it (e.g., "Fixes Phase 1.1 — dashboard attendance math")

## Out of scope (do not touch)
- Backend, API, database
- Authentication
- Real user data — all data stays mock/in-memory
- Framework migration
- The "Indian context" — keep all PF/ESI/POSH/Muster Roll/etc. terminology and logic
