# AI Prompts — Test Design

Prompts for manual CSV, UI specs, and API specs. I always reviewed steps against the live app before committing.

---

## Entry 1 — Manual CSV (8 cases)

**Prompt:**
```
Generate 8 manual test cases for Toolshop as CSV columns: ID, Requirement, Title, Type, 
Category, Steps, Expected Result. Cover AC1 login and AC2 checkout. Include double Confirm 
for invoice generation.
```

**AI response (summary):**  
TC-MAN-S01/S02 smoke + regression for cart, COD invoice, invalid login, search, API register/login, API invoice.

**What I changed:**  
First draft said "click Confirm" once on checkout. I manually ran checkout and noticed invoice missing until second Confirm — updated TC-MAN-R02 steps myself before saving CSV.

---

## Entry 2 — UI automation scenarios

**Prompt:**
```
Write 6 Playwright UI test cases: register/login, product browse, invalid login, E2E COD 
checkout with invoice check, search, profile. Use data-test locators where possible. 
Tag @Smoke/@Regression.
```

**AI response (summary):**  
Six tests in `toolshop.ui.spec.js` with `UiFlows` helper for register and checkout.

**Validation:**  
Ran headed once — registration country dropdown needed full label `Netherlands (the)` not `NL`. Fixed in `uiFlows.js` without re-prompting AI.

---

## Entry 3 — API automation scenarios

**Prompt:**
```
Design 6 API tests: AC1 register+login+cart, AC2 products+invoice. Add negative login 
and invalid cart invoice. Assert status codes and invoice_number pattern INV-.
```

**AI response (summary):**  
AuthApi/CartApi/ProductApi/InvoiceApi classes; six tests with bearer token flow.

**Validation:**  
TC-API-S02 failed first run — AI used Amsterdam billing. I debugged separately (test-data.md Entry 2) then updated `BILLING` constant.

---

## Entry 4 — Traceability

**Prompt:**
```
Create a table mapping AC1/AC2 to manual TC-MAN-*, UI TC-UI-*, and API TC-API-* IDs 
for project-info.md.
```

**AI response (summary):**  
Coverage tables for project-info.md.

**Validation:**  
Every AC has at least one manual + one automated test. Gaps filled manually for profile test (TC-UI-R04).

---

## Entry 5 — Exploratory charter (docs)

**Prompt:**
```
I spent 45 minutes exploring Toolshop checkout. Help me turn messy bullet notes into 
structured exploratory testing notes with sessions, observations, and risks.
```

**AI response (summary):**  
Structured `exploratory-testing-notes.md` with three sessions (UI walkthrough, API probing, edge cases).

**Edits I made:**  
Added specific timings and removed overly formal language so it reads like my actual notes.
