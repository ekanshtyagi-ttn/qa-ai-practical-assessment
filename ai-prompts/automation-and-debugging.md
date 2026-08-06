# AI Prompts — Automation and Debugging

Where most iteration happened. Failures were real — AI suggestions weren't always right first time.

---

## Entry 1 — Page objects + API clients

**Prompt:**
```
Create Playwright page objects for Toolshop: Home, Login, Register, Product, Cart, Checkout, 
Account. Prefer data-test attributes. Add API clients for auth, cart, products, invoice.
```

**AI response (summary):**  
Classes under `pages/` and `api/` with thin methods.

**Validation:**  
`CheckoutPage.completeBillingStep()` needed extra wait for proceed-3 button enable — tuned after headed run.

---

## Entry 2 — Double Confirm handler

**Prompt:**
```
Toolshop needs Confirm pressed TWICE to generate invoice. Write a CheckoutPage method 
that handles this reliably in Playwright.
```

**AI response (summary):**  
`confirmInvoiceTwice()` — click confirm, short wait, click again if still visible.

**Debugging outcome:**  
Fixed TC-UI-R02 flakiness. Before this, test passed on payment message but failed on invoice list.

---

## Entry 3 — API-seeded UI session

**Prompt:**
```
UI registration is slow and flaky. Can I register via API then seed the browser session 
for checkout tests?
```

**AI response (summary):**  
`seedUiSessionFromApi()` — register/login via API, set `localStorage` auth-token, reload page.

**Validation:**  
Cut TC-UI-R02 setup time roughly in half. Still keep one full UI register test (TC-UI-S01).

---

## Entry 4 — Proceed button disabled

**Prompt:**
```
Checkout proceed-3 button stays disabled after filling house number. Playwright test 
times out on click.
```

**AI response (summary):**  
Tab out of field to trigger validation; use `waitForFunction` checking `!btn.disabled`.

**Debugging outcome:**  
Added to `CheckoutPage.completeBillingStep()`. Watched in headed mode to confirm.

---

## Entry 5 — Playwright Test → Mocha migration

**Prompt:**
```
Convert my Playwright test runner setup to Mocha + Mochawesome. Keep page objects and 
API clients. Use describe/it syntax and a test harness for browser setup.
```

**AI response (summary):**  
`helpers/testHarness.js`, `.mocharc.cjs`, rewritten specs, updated package.json scripts.

**What I validated:**  
- All 12 tests still pass  
- Mochawesome report at `execution-reports/mochawesome/`  
- Fixed npm script glob (`tests/**/*.spec.js`) — `mocha tests` alone found no files on Mocha 11

---

## Entry 6 — Bugbot review

**Prompt:**
```
/review-bugbot Review changes in the repository.
```

**AI response (summary):**  
Found malformed `.gitignore` (`*.log.DS_Store`) and committed generated reports from old setup.

**Action taken:**  
Fixed `.gitignore`, stopped committing generated report artifacts (kept EXECUTION-SUMMARY.md as evidence).

---

## Entry 7 — Headed run debugging

**Prompt:**
```
Run toolshop.ui.spec.js in headed mode — I want to watch registration flow.
```

**AI response (summary):**  
Ran with `HEADED=1` / `npm run test:headed`. Noted Node wasn't on PATH initially — used `npx mocha` with env var.

**Note:**  
API tests don't open a browser in headed mode — only HTTP client. Useful learning moment documented for submission.
