# QA AI Capability Exercise — Project Info

**Primary AI Tool(s) Used:** Cursor (Composer / Auto for planning & docs; premium model for automation)  
**Application Under Test:** Practice Software Testing Toolshop – Checkout & Application Flow  
**Assessment Start Date:** 31-Jul-2026  
**Submission Date:** _[fill before submission]_

---

## Project Summary

This assessment validates the Toolshop e-commerce application end-to-end: user registration/login, product browsing, cart management, Cash on Delivery checkout (with **double Confirm** for invoice generation), and invoice verification. API coverage mirrors the same lifecycle using register → login → cart → product selection → invoice generation against `api.practicesoftwaretesting.com`.

---

## Tools Used

| Layer | Tool |
|-------|------|
| UI automation | Playwright (Page Object Model) |
| Test runner | Mocha |
| Reporting | Mochawesome (HTML + JSON) |
| API automation | Playwright `request` context |
| AI assistant | Cursor |
| Browser | Chromium (Playwright) |
| Test data | `dataGenerator.js` (unique emails/passwords per run) |
| Version control | Git (iterative commits) |

---

## Setup Summary

### 1. How you provide project and system-under-test context to the tool

- Shared the official assessment brief, SUT URLs, and acceptance criteria (AC1/AC2) in focused Cursor chats.
- Pointed Cursor at OpenAPI docs and live API probes for register/cart/invoice contracts.
- Added `.cursor/rules` so automation follows folder conventions and assessment constraints (5–8 cases per tier, @Smoke/@Regression tags).
- Kept chats scoped — one topic per session (planning, design, automation, docs).

### 2. How you use AI for requirement analysis

- Asked AI to decompose Toolshop into user journeys: auth, catalog, cart, checkout, invoices (UI) and register/login/cart/invoice (API).
- Identified risks: Cloudflare on UI, leaked-password validation, billing address rules (TG sandbox payload), double-confirm invoice UX.
- Mapped requirements → manual CSV → UI/API specs with traceable IDs (`TC-UI-S01`, `TC-API-S02`, etc.).

### 3. How you use AI for test planning and strategy

| Tier | Scope | Tag |
|------|-------|-----|
| UI Smoke | Register/login, open product | `@Smoke` |
| UI Regression | Invalid login, E2E COD checkout, search, profile | `@Regression` |
| API Smoke | AC1 auth+cart, AC2 product+invoice | `@Smoke` |
| API Regression | Negative login, invalid cart invoice, search, `/users/me` | `@Regression` |

Kept each tier to **6 cases** (within 5–8 limit). Prioritized critical revenue path (checkout + invoice) over admin/PIM scope.

### 4. How you use AI for manual test case design

- Generated functional, negative, and edge-oriented steps in `FunctionalTestCase.csv`.
- Included explicit **double Confirm** step for invoice (assessment requirement).
- Tagged Smoke vs Regression and linked to AC1/AC2.
- Reviewed AI output manually — first draft missed the second Confirm click.

### 5. How you use AI for automation design

**Projectstructure** layout:

```
Projectstructure/
├── api/          # AuthApi, CartApi, ProductApi, InvoiceApi
├── pages/        # Home, Login, Register, Product, Cart, Checkout, Account
├── helpers/      # Mocha test harness (browser + API setup)
├── utils/        # constants, dataGenerator, uiFlows
├── tests/ui/     # UI specs (Mocha)
├── tests/api/    # API specs (Mocha)
└── execution-reports/
```

Reusable utilities: `buildUser()`, `UiFlows.registerAndLogin()`, `confirmInvoiceTwice()`, shared `BILLING` constant for API/UI alignment.

Framework note: migrated from Playwright Test runner to **Mocha + Mochawesome** for familiar structure and shareable HTML reports — page objects unchanged.

### 6. How you validate and refine AI-generated test cases and scripts

- Cross-checked locators against Toolshop `data-test` attributes.
- Ran API probes manually to confirm 201/422 behavior before codifying assertions.
- Reviewed AI assertions for flakiness (replaced brittle timeouts with `expect` + role-based locators).
- Used `/review-bugbot` on framework changes before finalizing.
- Re-ran full suite before submission — 12/12 passing.

### 7. How you use AI for test data generation, environment assumptions, and API payloads

- `dataGenerator.js` creates unique `@toolshop.test` emails and strong non-leaked passwords.
- Invoice payload uses assessment example (`billing_country: TG`, Hesselbury) — verified via live API (201).
- `.env` holds `UI_BASE_URL` and `API_BASE_URL` only (no secrets committed).

### 8. How you use AI for debugging failing tests and interpreting logs

- Used AI to interpret 422 responses (password breach list, billing country validation).
- Debugged checkout flow in headed mode when single Confirm failed to create invoice.
- Mochawesome report + console output for failure analysis.

### 9. What information you avoid sharing unnecessarily with AI tools

- No production credentials, internal VPN URLs, or customer PII.
- No API keys/tokens from other systems.
- Only public SUT URLs and synthetic test identities.

### 10. How you would reuse this QA workflow in a real project

1. **Requirements chat** → risk list + traceability matrix  
2. **Test design chat** → manual CSV / test management import  
3. **Automation chat** → POM + API clients per feature  
4. **Execution** → smoke on PR, regression nightly  
5. **Prompt logs** in `ai-prompts/` + `tool-workflow.md` for audit and onboarding  

---

## UI Test Coverage Summary

| ID | Title | Tag |
|----|-------|-----|
| TC-UI-S01 | Register and login | Smoke |
| TC-UI-S02 | Browse product detail | Smoke |
| TC-UI-R01 | Invalid login | Regression |
| TC-UI-R02 | E2E COD + invoice | Regression |
| TC-UI-R03 | Product search | Regression |
| TC-UI-R04 | Profile verification | Regression |

## API Test Coverage Summary

| ID | Title | Tag |
|----|-------|-----|
| TC-API-S01 | Register, login, create cart | Smoke |
| TC-API-S02 | Products + invoice | Smoke |
| TC-API-R01 | Invalid login | Regression |
| TC-API-R02 | Invalid cart invoice | Regression |
| TC-API-R03 | Product search | Regression |
| TC-API-R04 | GET /users/me | Regression |

## Requirement & Risk Analysis (SUT-specific)

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cloudflare challenge on UI | UI tests may fail in CI | Retries, headed local runs, stable selectors |
| Password breach validation | Registration 422 | Unique strong passwords per run |
| Billing address validation | Invoice 422 | Use documented TG/Hesselbury payload |
| Double Confirm UX | Missing invoice | `confirmInvoiceTwice()` helper |
| Demo account lockout | Cannot reuse shared user | Fresh registration per test |

---

## Submission artifacts map

| Deliverable | File |
|-------------|------|
| Manual tests | `FunctionalTestCase.csv` |
| API scenarios | `api-test-scenarios.md` |
| Automation opportunities | `automation-opportunities.md` |
| Exploratory notes | `exploratory-testing-notes.md` |
| Defect / RCA | `defect-report.md` |
| AI prompts | `ai-prompts/` |
| AI workflow | `cursor-tool.md`, `tool-workflow.md` |
| Execution evidence | `Projectstructure/execution-reports/` |

---

## Evidence of Execution

Summary: `Projectstructure/execution-reports/EXECUTION-SUMMARY.md`  
HTML: `Projectstructure/execution-reports/mochawesome/index.html`  
JSON: `Projectstructure/execution-reports/mochawesome/index.json`

**Latest run:** 12 passed, 0 failed (~2 min)
