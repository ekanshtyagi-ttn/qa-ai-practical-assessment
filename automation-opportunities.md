# Automation Opportunities — Toolshop

**Author:** Ekansh Tyagi  
**Date:** 05-Aug-2026

Prioritized list from manual + exploratory testing. **Bold** items are already implemented in `Projectstructure/`.

---

## Implemented (assessment scope)

| Priority | Flow | Manual ref | Automation | Rationale |
|----------|------|------------|------------|-----------|
| P0 | **Register + login** | TC-MAN-S01 | TC-UI-S01, TC-API-S01 | Gateway to all flows; high regression value |
| P0 | **E2E COD checkout + invoice** | TC-MAN-R02 | TC-UI-R02, TC-API-S02 | Core AC2; revenue path |
| P1 | **Invalid login** | TC-MAN-R03 | TC-UI-R01, TC-API-R01 | Fast negative check |
| P1 | **Product search** | TC-MAN-R04 | TC-UI-R03, TC-API-R03 | Catalog health signal |
| P1 | **Profile verification** | — | TC-UI-R04, TC-API-R04 | Confirms registration data persisted |
| P1 | **Browse product detail** | — | TC-UI-S02 | Smoke catalog availability |

---

## Recommended next (out of assessment scope)

| Priority | Opportunity | Type | Effort | Notes |
|----------|-------------|------|--------|-------|
| P1 | Cart quantity update / remove item | UI | Medium | Explored manually (TC-MAN-R01); selectors exist on cart page |
| P2 | Out-of-stock product handling | UI | Low | Loop catalog until `addToCart` enabled — partial logic in `uiFlows` |
| P2 | Session expiry mid-checkout | UI | Medium | Clear `localStorage` during checkout; expect redirect to login |
| P2 | Payment method matrix (bank transfer, etc.) | UI + API | High | Only COD required for assessment |
| P3 | Visual regression on checkout steps | UI | High | Mochawesome + screenshots on failure already possible |
| P3 | API contract tests from OpenAPI | API | Medium | Validate response schema vs Swagger |
| P3 | Performance smoke (p95 login/cart) | API | Medium | Playwright request timing APIs |

---

## Simple automation flows (assessment minimum)

The assessment asks for **one simple UI/API flow**. This repo delivers two clear examples:

### UI flow — TC-UI-R02
```
Register (API seed) → Add product → Cart → Checkout → COD → Double Confirm → Verify invoice in My Invoices
```
**Why this one:** Exercises the longest real user journey; catches billing, payment, and invoice bugs.

### API flow — TC-API-S02
```
Register → Login → Create cart → List products → Add to cart → POST invoice (TG billing) → Assert INV- number
```
**Why this one:** Mirrors AC2 without browser; fast feedback in CI.

---

## ROI summary

| Category | Automate | Keep manual |
|----------|----------|-------------|
| Auth happy/negative paths | ✓ | — |
| Checkout + invoice | ✓ | Exploratory edge cases |
| Admin / PIM / user management | — | Out of SUT scope |
| Visual polish / accessibility | Partial | Full a11y audit |
| New payment providers | — | Until in requirements |

---

## Tooling recommendation

| Layer | Tool | Reason |
|-------|------|--------|
| UI | Playwright + Mocha | Stable selectors, headed debug, POM pattern |
| API | Playwright `request` | Same stack as UI; no extra HTTP library |
| Reports | Mochawesome | Shareable HTML for stakeholders |
| CI | `npm run test:smoke` on PR | Fast gate (~30s API + ~25s UI smoke) |
