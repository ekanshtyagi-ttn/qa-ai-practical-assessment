# Project Info

**Primary AI Tool(s) Used:** Cursor (AI-assisted IDE)

**Application Under Test:** Practice Software Testing – Toolshop (Checkout & Application Flow)

**SUT URLs:**
- UI: https://practicesoftwaretesting.com
- API: https://api.practicesoftwaretesting.com
- API Docs: https://api.practicesoftwaretesting.com/api/documentation

**Assessment Start Date:** 31-Jul-2026  
**Submission Date:** 06-Aug-2026

**Public Repository:** https://github.com/ekanshtyagi-ttn/qa-ai-practical-assessment

---

## Project Summary

This project validates the end-to-end e-commerce experience of the **Practice Software Testing Toolshop** using a combined **manual + automated** QA approach. Focus areas: **user registration and login**, **product browsing and search**, **shopping cart and checkout (Cash on Delivery)**, **invoice generation (double Confirm)**, and **API-backed operations** (auth, cart, products, invoices).

Automation uses **Playwright with JavaScript**, **Mocha** test runner, and **Mochawesome** reporting. UI follows **Page Object Model**; API uses a **client layer**. Manual cases are in `FunctionalTestcase.csv`; automated specs live under `Playwright Framework + Report/tests/`.

---

## Tools Used

| Category | Tools |
|----------|-------|
| **Automation** | Playwright, Mocha, JavaScript (Node.js) |
| **Browser** | Chromium (headed mode for UI debugging) |
| **API testing** | Playwright `request` context |
| **Reporting** | Mochawesome (HTML + JSON) |
| **AI** | Cursor (requirements, test design, automation, debugging) |
| **Manual TC tracking** | `FunctionalTestcase.csv` |
| **Config** | dotenv (`.env`), `.mocharc.cjs` |

---

## Test Coverage Overview

### UI Automation (6 test cases)

| ID | Tag | Focus |
|----|-----|-------|
| TC-UI-S01 | @Smoke | Register and login |
| TC-UI-S02 | @Smoke | Browse product detail |
| TC-UI-R01 | @Regression | Invalid login |
| TC-UI-R02 | @Regression | E2E COD checkout + invoice |
| TC-UI-R03 | @Regression | Product search |
| TC-UI-R04 | @Regression | Profile verification |

### API Automation (6 test cases)

| ID | Tag | Focus |
|----|-----|-------|
| TC-API-S01 | @Smoke | Register, login, create cart (AC1) |
| TC-API-S02 | @Smoke | Products + invoice (AC2) |
| TC-API-R01 | @Regression | Invalid login |
| TC-API-R02 | @Regression | Invalid cart invoice |
| TC-API-R03 | @Regression | Product search |
| TC-API-R04 | @Regression | GET /users/me |

---

## Setup Summary

### 1. Providing Project and SUT Context to AI

- Shared SUT URLs, OpenAPI docs, and acceptance criteria (AC1/AC2) in focused Cursor chats
- Used `ai-prompts/` as persistent context (requirements, test design, test data, automation)
- Documented business rules: double Confirm for invoice, TG/Hesselbury billing payload, unique passwords per run

### 2. AI for Requirement Analysis

- Decomposed Toolshop into auth, catalog, cart, checkout, invoice (UI) and register/login/cart/invoice (API)
- Identified risks: Cloudflare, password breach validation, billing sandbox rules, double-confirm UX
- Output captured in `ai-prompts/requirements-and-planning.md`

### 3. AI for Test Planning and Strategy

| Dimension | Strategy |
|-----------|----------|
| **UI vs API** | UI for end-user journeys; API for backend contracts and faster negative tests |
| **Smoke** | Auth + catalog (UI); auth+cart + product/invoice (API) |
| **Regression** | Negative login, E2E checkout, search, profile (UI); invalid cart, search, /users/me (API) |
| **Tagging** | `@Smoke`, `@Regression` in spec describe blocks |

### 4. AI for Manual Test Case Design

- 8 manual cases in `FunctionalTestcase.csv` covering AC1, AC2, and API flows
- Explicit **double Confirm** step for invoice (TC-MAN-R02)
- Reviewed AI output against live app — first draft missed second Confirm click

### 5. AI for Automation Design

| Decision | Choice |
|----------|--------|
| **Framework** | Playwright + Mocha + Mochawesome |
| **UI pattern** | Page Object Model under `pages/` |
| **API pattern** | Client classes under `api/` |
| **Harness** | `helpers/testHarness.js` for browser + API setup |
| **Utilities** | `dataGenerator.js`, `uiFlows.js`, `constants.js` |
| **Reports** | `execution-reports/mochawesome/` |

### 6. Validating and Refining AI-Generated Output

- Cross-checked locators against `data-test` attributes
- Probed API manually before codifying assertions (billing 422, password breach 422)
- Re-ran full suite until 12/12 passed
- Used `/review-bugbot` on framework changes

### 7. AI for Test Data and API Payloads

- `buildUser()` — unique `@toolshop.test` emails and strong passwords per run
- `BILLING` constant — `billing_country: TG`, `billing_city: Hesselbury` (verified 201)
- `.env` for URLs only — no secrets committed

### 8. AI for Debugging

- Interpreted 422 responses (password breach, billing validation)
- Debugged checkout in headed mode — proceed button enable logic
- Mochawesome report for failure analysis

### 9. Information Avoided Sharing with AI

- No production credentials, internal URLs, or unrelated PII
- Only public SUT URLs and synthetic test identities

### 10. Reusing This Workflow in a Real Project

1. Requirements chat → risk list + traceability  
2. Test design chat → manual CSV / test management import  
3. Automation chat → POM + API clients per feature  
4. Execute smoke on PR, regression nightly  
5. Prompt logs in `ai-prompts/` for audit and onboarding  

---

## API Test Scenarios

**Automation:** `Playwright Framework + Report/tests/api/toolshop.api.spec.js`

| AC | Scenario | Endpoint | Expected |
|----|----------|----------|----------|
| AC1 | Register user | `POST /users/register` | 201 |
| AC1 | Login | `POST /users/login` | 200 + `access_token` |
| AC1 | Create cart | `POST /carts` | 201 + `cart.id` |
| AC2 | List products | `GET /products` | 200 |
| AC2 | Add to cart | `POST /carts/{id}` | 200 |
| AC2 | Generate invoice (COD) | `POST /invoices` | 201 + `INV-` number |
| — | Invalid login | `POST /users/login` | 401 |
| — | Invalid cart invoice | `POST /invoices` | 404/422 |

Invoice payload must use sandbox billing: `billing_country: TG`, `billing_city: Hesselbury`.

---

## Automation Opportunities

| Priority | Flow | Status |
|----------|------|--------|
| P0 | Register + login | Automated (TC-UI-S01, TC-API-S01) |
| P0 | E2E COD checkout + invoice | Automated (TC-UI-R02, TC-API-S02) |
| P1 | Invalid login, search, profile | Automated |
| P2 | Cart quantity update | Manual only (TC-MAN-R01) — future automation |
| P2 | Session expiry mid-checkout | Exploratory — future automation |

**Simple flows submitted:** UI E2E checkout (TC-UI-R02) and API invoice flow (TC-API-S02).

---

## Exploratory Testing Notes

**Sessions:** 31-Jul-2026, 05-Aug-2026 | **Charter:** Checkout, registration, invoice, API parity

**Key findings:**
- Country dropdown uses full names (`Netherlands (the)`), API uses ISO codes — mapped in `uiFlows.js`
- Some catalog products out-of-stock — automation loops or uses API to find in-stock item
- Checkout is multi-step; proceed buttons disable until fields valid
- **Invoice requires double Confirm** — documented in manual TC-MAN-R02 and `confirmInvoiceTwice()` helper
- API billing rejects real-world addresses; only TG/Hesselbury sandbox payload works

---

## Defect Report / Root Cause Analysis

> Practice app observations — not production vendor defects.

| ID | Observation | Root cause | Mitigation |
|----|-------------|------------|------------|
| OBS-001 | Invoice needs double Confirm | Two-step confirmation UX | `confirmInvoiceTwice()`; manual TC updated |
| OBS-002 | Register 422 password breach | API checks breached passwords | Unique passwords in `dataGenerator.js` |
| OBS-003 | Invoice 422 billing | Sandbox geography validator | `BILLING` constant (TG/Hesselbury) |
| OBS-004 | Register lands on login sometimes | Async auth race | `UiFlows` re-login + `waitForURL` guard |

---

## Requirement & Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cloudflare on UI | CI flakes | Headed local runs, stable selectors |
| Password breach check | Register 422 | Unique passwords per run |
| Billing validation | Invoice 422 | TG/Hesselbury payload |
| Double Confirm UX | Missing invoice | `confirmInvoiceTwice()` |
| Demo account lockout | Cannot reuse users | Fresh registration per test |

---

## Evidence of Execution

| Artifact | Path |
|----------|------|
| Summary | `Playwright Framework + Report/execution-reports/EXECUTION-SUMMARY.md` |
| HTML report | `Playwright Framework + Report/execution-reports/mochawesome/index.html` |
| JSON report | `Playwright Framework + Report/execution-reports/mochawesome/index.json` |

**Latest run:** 12 passed, 0 failed (~2 min)

---

## Manual Test Artifacts

| Artifact | Location |
|----------|----------|
| Functional test cases | `FunctionalTestcase.csv` |
| AI prompt library | `ai-prompts/` |
| Cursor / AI workflow | `cursor-tool.md` |
