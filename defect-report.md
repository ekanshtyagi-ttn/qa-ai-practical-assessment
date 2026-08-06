# Defect Report & Root Cause Analysis

**Project:** Toolshop QA Assessment  
**Reporter:** Ekansh Tyagi  
**Date:** 05-Aug-2026

> **Scope note:** Toolshop is a practice application. Items below are **testability observations and environment behaviors** encountered during assessment — not production defects filed against a vendor backlog. Documented here to show investigation and RCA skills.

---

## OBS-001 — Invoice requires double Confirm (UX / testability)

| Field | Detail |
|-------|--------|
| **Severity** | Medium (testability) |
| **Area** | Checkout → Payment → Invoice |
| **Status** | Documented / mitigated in automation |

### Steps to reproduce
1. Add product to cart, proceed through checkout with Cash on Delivery.
2. Fill billing, reach payment confirmation.
3. Click **Confirm** once — success message may appear.
4. Open **My Invoices** — invoice may be **missing**.
5. Return to checkout confirm step; click **Confirm** again — invoice now listed.

### Expected (tester assumption)
Single Confirm should finalize order and create invoice.

### Actual
Invoice generation tied to second Confirm interaction (assessment guide also documents this).

### Root cause analysis
- **Likely cause:** Two-step confirmation pattern in frontend — first confirm validates payment method, second persists invoice record.
- **Contributing factor:** Success messaging after first click implies completion prematurely.
- **Impact on testing:** Automated tests failed until `confirmInvoiceTwice()` helper added.

### Mitigation
- Manual TC-MAN-R02 explicitly calls out double Confirm.
- `CheckoutPage.confirmInvoiceTwice()` in automation.
- Exploratory notes updated for future testers.

---

## OBS-002 — Registration 422 — password breach validation

| Field | Detail |
|-------|--------|
| **Severity** | Low (test data) |
| **Area** | API `POST /users/register` |
| **Status** | Resolved in test data |

### Steps to reproduce
1. Register with password `SuperSecure@123` or common tutorial passwords.
2. API returns **422** with message about password appearing in data breach.

### Root cause analysis
- **Cause:** API integrates Have I Been Pwned-style check (or internal blocklist).
- **Impact:** Hardcoded passwords in tests fail intermittently if reused.

### Mitigation
- `dataGenerator.js` builds unique password per run: `QaTool#${timestamp}!`
- Documented in `ai-prompts/test-data.md` Entry 1.

---

## OBS-003 — Invoice billing address validation (sandbox rules)

| Field | Detail |
|-------|--------|
| **Severity** | Medium (test data / env) |
| **Area** | API `POST /invoices` |
| **Status** | Resolved with documented payload |

### Steps to reproduce
1. Create valid cart with products.
2. POST invoice with realistic address (e.g. Amsterdam, NL).
3. Receive **422** — city/country combination rejected.

### Root cause analysis
- **Cause:** Sandbox validator accepts only specific test geography (assessment example: `billing_country: TG`, `billing_city: Hesselbury`).
- **Not a functional bug** — environment constraint for demo API.

### Mitigation
- `constants.js` → `BILLING` object aligned with assessment guide.
- `testdata/billing.json` for negative cases.
- Probed manually before codifying in TC-API-S02.

---

## OBS-004 — UI registration occasionally lands on login page

| Field | Detail |
|-------|--------|
| **Severity** | Low |
| **Area** | UI Register flow |
| **Status** | Handled in automation |

### Steps to reproduce
1. Complete registration form with valid data.
2. Sometimes redirected to `/auth/login` instead of account home.

### Root cause analysis
- **Possible cause:** Async auth state / race after register API call.
- **Impact:** Flaky "not logged in" state if test doesn't wait or re-login.

### Mitigation
- `UiFlows.registerAndLogin()` checks URL after register; logs in again if needed.
- `waitForURL` excludes `/auth/` paths before asserting account heading.

---

## Summary

| ID | Type | Automated? | Manual coverage |
|----|------|------------|-----------------|
| OBS-001 | UX / testability | Yes (double confirm helper) | TC-MAN-R02 |
| OBS-002 | Test data | Yes (unique passwords) | — |
| OBS-003 | Env constraint | Yes (BILLING constant) | TC-MAN-R06 |
| OBS-004 | Timing / flow | Yes (retry login) | TC-MAN-S01 |

No open **blocking** issues for assessment submission. All observations have documented workarounds and test coverage.
