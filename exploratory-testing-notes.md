# Exploratory Testing Notes — Toolshop

**Tester:** Ekansh Tyagi  
**Sessions:** 31-Jul-2026, 05-Aug-2026  
**SUT:** https://practicesoftwaretesting.com/  
**Charter:** Checkout flow, registration, invoice generation, and API parity

These are informal session notes — not scripted cases. I used them to understand the app before writing automation.

---

## Session 1 — First walkthrough (UI)

**Time:** ~45 min  
**Focus:** Can a new user register, buy something, and get an invoice?

### Observations

1. **Registration form** — Country dropdown uses full names (`Netherlands (the)`), not ISO codes. API uses `NL`. Easy to mismatch if you copy-paste API payloads into UI.

2. **Sign-in flow** — After register, sometimes lands on login again. App recovers if you log in manually. Decided to add `waitForURL` guard in automation.

3. **Product catalog** — Some products show out-of-stock; Add to Cart disabled. Explored 3–4 products before finding in-stock item. Worth automating via API product list + stock check.

4. **Checkout steps** — Multi-step wizard: Cart → Sign in → Billing → Payment → Confirm. Proceed buttons disable until required fields filled.

5. **Invoice surprise** — Payment success screen appears after first Confirm, but invoice only shows under My Invoices after **second** Confirm. Easy to miss if you're rushing. Documented in manual TC-MAN-R02.

### Ideas logged
- Automate register via API + seed `localStorage` token for faster UI checkout tests
- Search box works with partial match ("Pliers" returns multiple results)

---

## Session 2 — API probing (Swagger + curl)

**Time:** ~30 min  
**Focus:** What does the API actually accept for invoice creation?

### Observations

1. **Register** — Works with unique email. Got 422 when reusing example passwords from tutorials (`SuperSecure@123` style) — breach list check.

2. **Login** — Returns `access_token` JWT. Used in `Authorization: Bearer` header for `/users/me` and `/invoices`.

3. **Cart** — `POST /carts` returns cart id. Add product via `POST /carts/{id}` with product_id + quantity.

4. **Invoice billing** — This took the most time:
   - Tried Amsterdam / NL → 422 "city does not belong to country"
   - Tried US cities → same
   - Assessment guide example `TG` + `Hesselbury` → **201** with `INV-` number
   - Conclusion: sandbox uses a fixed validator, not real geography

5. **Negative tests** — Fake cart_id returns 404 or 422 depending on payload shape.

### Ideas logged
- Centralize `BILLING` constant shared by API and UI tests
- Keep invalid payloads in `testdata/billing.json`

---

## Session 3 — Edge cases spotted (not all automated)

| Area | What I tried | Result |
|------|-------------|--------|
| Empty cart checkout | Proceed with empty cart | Blocked at cart step — expected |
| Invalid login | Wrong password 3× | Error shown, stays on login — automated |
| Search empty string | Submit blank search | Shows all products — not automated (low value) |
| Quantity 0 | Set qty to 0 on product page | UI prevents or ignores — manual only |
| Expired session | Clear localStorage mid-checkout | Redirects to login — candidate for future test |

---

## Risks worth mentioning to a real team

1. **Cloudflare** — Occasional challenge on fresh IP; could flake CI runs.
2. **Demo data** — Shared accounts get locked; always use fresh registration.
3. **Double Confirm** — UX is confusing; could be reported as usability finding (see `defect-report.md`).
4. **Billing sandbox** — TG/Hesselbury is not intuitive; docs dependency for testers.

---

## Traceability

Exploratory findings fed into:
- `FunctionalTestCase.csv` (manual cases)
- `automation-opportunities.md` (what to automate next)
- `defect-report.md` (observations with RCA)
- `Projectstructure/tests/` (automated smoke + regression)
